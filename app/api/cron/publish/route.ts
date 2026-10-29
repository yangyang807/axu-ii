import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PublishRequestBody {
  runId?: string;
  sourceMaterial?: string;
}

async function handlePublish(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const expectedSecret = process.env.CRON_SECRET;

    if (process.env.NODE_ENV === 'production' && expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized: Invalid or missing credentials' }, { status: 401 });
    }

    let body: PublishRequestBody = {};
    if (req.method === 'POST') {
      try {
        const rawBody = await req.text();
        if (rawBody) {
          body = JSON.parse(rawBody);
        }
      } catch {
        return NextResponse.json({ error: 'Malformed JSON payload' }, { status: 400 });
      }
    }

    const runId = body.runId || new Date().toISOString().split('T')[0] + '-' + (new Date().getHours() < 15 ? '1300' : '2000');
    const sourceMaterial = body.sourceMaterial || 'Global AI developments, enterprise agentic automation, and cognitive efficiency frameworks.';

    // Idempotency Check
    const { data: existingRun, error: checkError } = await supabase
      .from('articles')
      .select('id, slug')
      .eq('slug', runId)
      .maybeSingle();

    if (checkError) {
      console.error('Database idempotency check error:', checkError.message);
    }

    if (existingRun) {
      return NextResponse.json({ 
        success: true, 
        skipped: true, 
        message: `Publication for run ID ${runId} already exists.` 
      }, { status: 200 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error: Gemini API key missing' }, { status: 500 });
    }

    // 💡 သေချာပြီး Stable ဖြစ်သော Model ကို သတ်မှတ်ခြင်း
    const modelName = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

    // Google AI Studio Native Endpoint with AQ... key
    const geminiNativeUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    // 5% Knowledge Extraction Engine Prompt System
    const prompt = `
You are my 5% Knowledge Extraction Engine.
Your job is NOT to give me a generic summary of this book or material.
Your job is to extract the smallest, highest-value portion that can meaningfully improve thinking, identity, decision-making, business, brand, learning system, and behavior.

Source Material to Process: "${sourceMaterial}"

Strictly output your response in valid JSON format with the following keys corresponding to the 5% framework:
{
  "title": "Professional Burmese title based on the core insight",
  "executive_summary": "1-3 sentences of core thesis in Burmese",
  "core_thesis": "The central thesis and problem solved",
  "key_insights": [
    "Insight 1 with core idea, mechanism, and application",
    "Insight 2",
    "Insight 3",
    "Insight 4",
    "Insight 5"
  ],
  "operating_rules": [
    "Rule 1",
    "Rule 2",
    "Rule 3",
    "Rule 4",
    "Rule 5"
  ],
  "practical_actions": [
    "Action 1",
    "Action 2",
    "Action 3",
    "Action 4",
    "Action 5"
  ],
  "things_to_question": [
    "Low-value or unproven claim 1",
    "Claim 2",
    "Claim 3"
  ],
  "one_principle_to_remember": "One powerful principle",
  "system_upgrade": "The single change this should create in the system"
}
`;

    const apiRes = await fetch(geminiNativeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
      signal: AbortSignal.timeout(120000)
    });

    const resData = await apiRes.json();

    if (!apiRes.ok) {
      console.error('Gemini API provider error:', resData);
      return NextResponse.json({ error: 'Content generation provider failed safely.', details: resData.error?.message || resData }, { status: 502 });
    }

    const rawCandidateText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawCandidateText) {
      return NextResponse.json({ error: 'AI returned empty response' }, { status: 502 });
    }

    let parsedEdition;
    try {
      const cleanedJSON = rawCandidateText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedEdition = JSON.parse(cleanedJSON);
    } catch (parseErr) {
      console.error('JSON parsing error from LLM output:', parseErr);
      return NextResponse.json({ error: 'Generated output failed schema validation.' }, { status: 422 });
    }

    const requiredFields = ['title', 'executive_summary', 'core_thesis', 'key_insights', 'operating_rules'];
    for (const field of requiredFields) {
      if (!parsedEdition[field]) {
        return NextResponse.json({ error: `Quality gate failed: Missing required field '${field}'.` }, { status: 422 });
      }
    }

    const articleRecord = {
      slug: runId,
      title: parsedEdition.title,
      excerpt: parsedEdition.executive_summary,
      content: JSON.stringify(parsedEdition),
      published: true
    };

    const { data: insertedData, error: dbError } = await supabase
      .from('articles')
      .insert([articleRecord])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase persistence error:', dbError.message);
      return NextResponse.json({ error: 'Database persistence failed safely.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'AXU II 5% Knowledge Card successfully generated, formatted, and published to database.',
      runId,
      data: insertedData
    }, { status: 201 });

  } catch (err: unknown) {
    console.error('Unexpected publishing error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal server error occurred.', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return handlePublish(req);
}

export async function POST(req: NextRequest) {
  return handlePublish(req);
}