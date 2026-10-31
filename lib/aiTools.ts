export interface AIToolItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  coverUrl: string;
  pricingType: string;
  recommendFor: { en: string; my: string };
  pros: { en: string; my: string }[];
  cons: { en: string; my: string }[];
  pricing: { en: string; my: string };
  toolUrl: string;
}

export const allAiTools: AIToolItem[] = [
  // --- LLMs & Chatbots (1 - 25) ---
  {
    id: '1',
    title: 'ChatGPT (OpenAI)',
    subtitle: 'Conversational AI & Advanced Reasoning',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $20/mo',
    recommendFor: { en: 'General Users, Content Creators & Developers.', my: 'အထွေထွေ အသုံးပြုသူများ၊ Content ရေးသူများ၊ Software / Code ရေးသူများ။' },
    pros: [
      { en: 'Multimodal (Text, Voice, Image Analysis)', my: 'အသံ၊ ရုပ်ပုံ၊ စာသား များကို သဘာဝကျကျ သုံးနိုင်ခြင်း' },
      { en: 'Ecosystem & Custom GPTs', my: 'DALL-E, Canvas နှင့် Custom GPTs Ecosystem စုံလင်ခြင်း' }
    ],
    cons: [
      { en: 'Message limits on Plus tier during peak hours', my: 'အသုံးပြုသူ များချိန်တွင် Message Limit မြန်မြန်ပြည့်တတ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Plus ($20/mo) | Team ($25/user/mo)', my: 'အခမဲ့ ($0) | Plus ($20/လ) | Team ($25/တစ်ဦး/လ)' },
    toolUrl: 'https://chat.openai.com'
  },
  {
    id: '2',
    title: 'Claude (Anthropic)',
    subtitle: 'Advanced AI Assistant for Writing & Code',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $20/mo',
    recommendFor: { en: 'Software Engineers, Long-form Writers & Researchers.', my: 'Code ရေးသားသူများ၊ စာတမ်းအရှည် ရေးသူများနှင့် Research စိစစ်သူများ။' },
    pros: [
      { en: 'Best-in-class coding & logical reasoning', my: 'Coding ရေးသားခြင်းနှင့် Logic အပိုင်းတွင် အကောင်းဆုံးဖြစ်ခြင်း' },
      { en: 'Human-like writing & Artifacts visualizer', my: 'လူရေးသကဲ့သို့ သဘာဝကျပြီး စာမျက်နှာများကို သန့်ရှင်းစွာ ပြသပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'No direct real-time web search integration', my: 'Live Internet Search တိုက်ရိုက်ပြုလုပ်နိုင်သည့် စွမ်းရည် နည်းပါးခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($20/mo) | Team ($25/user/mo)', my: 'အခမဲ့ ($0) | Pro ($20/လ) | Team ($25/တစ်ဦး/လ)' },
    toolUrl: 'https://claude.ai'
  },
  {
    id: '3',
    title: 'Gemini (Google)',
    subtitle: 'Multimodal AI with Massive Context Window',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $19.99/mo',
    recommendFor: { en: 'Google Workspace Users, Analysts & Video Researchers.', my: 'Google Ecosystem သုံးစွဲသူများ၊ စာအုပ်ကြီးများနှင့် Video အရှည်များ စိစစ်လိုသူများ။' },
    pros: [
      { en: 'Massive 1M+ token context window', my: 'Token သန်းပေါင်းများစွာ ပါဝင်သဖြင့် ဖိုင်အကြီးများကို မေးမြန်းနိုင်ခြင်း' },
      { en: 'Deep integration with Docs, Drive & Gmail', my: 'Google Docs, Drive, Gmail တို့နှင့် တိုက်ရိုက် ချိတ်ဆက်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Occasional hallucination in complex logic', my: 'ခက်ခဲသော Logic မေးခွန်းများတွင် မှားယွင်းတတ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Advanced ($19.99/mo)', my: 'အခမဲ့ ($0) | Advanced ($19.99/လ + 2TB Drive)' },
    toolUrl: 'https://gemini.google.com'
  },
  {
    id: '4',
    title: 'DeepSeek (R1 & V3)',
    subtitle: 'Advanced Open-Weights Reasoning Models',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Ultra-cheap API',
    recommendFor: { en: 'Math & Logic Specialists, Budget Developers.', my: 'သင်္ချာနှင့် Logic သမားများ၊ API စရိတ် သက်သာစွာ သုံးလိုသော Developer များ။' },
    pros: [
      { en: 'Exceptional math & complex reasoning skills', my: 'သင်္ချာနှင့် Reasoning ပိုင်းတွင် အလွန်ထက်မြက်ခြင်း' },
      { en: 'Extremely cheap API & Open-weights available', my: 'API စရိတ် အလွန်သက်သာပြီး ကိုယ်ပိုင် Server ပေါ် တင်သုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Slower responses due to reasoning chains', my: 'အဖြေစဉ်းစားချိန် ယူသဖြင့် တုံ့ပြန်မှု အနည်းငယ် နှေးခြင်း' }
    ],
    pricing: { en: 'Web Free ($0) | API (~$0.55/1M tokens)', my: 'Web အခမဲ့ ($0) | API (~$0.55/1M tokens သာကျသင့်)' },
    toolUrl: 'https://chat.deepseek.com'
  },
  {
    id: '5',
    title: 'Perplexity AI',
    subtitle: 'Conversational Answer Engine & Web Search',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $20/mo',
    recommendFor: { en: 'Researchers, Students & Journalists.', my: 'သတင်းအချက်အလက် အသစ်များကို Live ရှာဖွေသူများ၊ ကျောင်းသားများနှင့် သတင်းထောက်များ။' },
    pros: [
      { en: 'Real-time live citations from web sources', my: 'အင်တာနက်ပေါ်ရှိ Source Link အတိအကျဖြင့် ဖြေဆိုပေးခြင်း' },
      { en: 'Access to multiple models (Claude, GPT-4o)', my: 'Pro plan တွင် မော်ဒယ်အမျိုးမျိုး ပြောင်းလဲသုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Not ideal for long-form creative writing', my: 'စာအုပ်/စာတမ်း အရှည်ကြီးများ Creative ရေးသားရန် မသင့်တော်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($20/mo)', my: 'အခမဲ့ ($0) | Pro ($20/လ သို့မဟုတ် $200/နှစ်)' },
    toolUrl: 'https://www.perplexity.ai'
  },
  {
    id: '6',
    title: 'Microsoft Copilot',
    subtitle: 'Enterprise AI Assistant by Microsoft',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $20/mo',
    recommendFor: { en: 'Office 365 Users & Enterprise Executives.', my: 'Microsoft Office သုံးစွဲသူများနှင့် ကုမ္ပဏီဝန်ထမ်းများ။' },
    pros: [
      { en: 'Native Office 365 & Windows integration', my: 'Word, Excel, PowerPoint တို့တွင် အလိုအလျောက် သုံးနိုင်ခြင်း' },
      { en: 'Web grounding with GPT-4 power', my: 'အင်တာနက် သတင်းအချက်အလက်သစ်များကို ချက်ချင်းရှာပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'UI can feel cluttered across platforms', my: 'Platform မျိုးစုံတွင် UI ရှုပ်ထွေးသလို ခံစားရနိုင်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Copilot Pro ($20/mo)', my: 'အခမဲ့ ($0) | Pro ($20/လ)' },
    toolUrl: 'https://copilot.microsoft.com'
  },
  {
    id: '7',
    title: 'Grok (xAI)',
    subtitle: 'Real-time Conversational AI with X Integration',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Premium Plan',
    recommendFor: { en: 'X/Twitter Users & Trend Analysts.', my: 'X (Twitter) အသုံးပြုသူများနှင့် ခေတ်ရေစီးကြောင်း ဆန်းစစ်သူများ။' },
    pros: [
      { en: 'Real-time social data access from X platform', my: 'X ပေါ်ရှိ ချက်ချင်းဖြစ်ပေါ်နေသော သတင်းများကို သိရှိနိုင်ခြင်း' },
      { en: 'Unfiltered & humorous communication style', my: 'ပွင့်လင်းမြန်ဆန်ပြီး ဟာသဆန်သော ဖြေဆိုမှုစတိုင် ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Requires X Premium subscription', my: 'X Premium ဝယ်ယူထားမှသာ အဓိက သုံးနိုင်ခြင်း' }
    ],
    pricing: { en: 'X Premium ($8/mo) | Premium+ ($16/mo)', my: 'X Premium ($8/လ) | Premium+ ($16/လ)' },
    toolUrl: 'https://grok.x.ai'
  },
  {
    id: '8',
    title: 'Llama 3.3 (Meta)',
    subtitle: 'Open Source Foundation Model',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Open Source ($0)',
    recommendFor: { en: 'Local AI Enthusiasts & Private Enterprise Engineers.', my: 'ကိုယ်ပိုင် Server တွင် AI စက်တင်လိုသူများနှင့် Developer များ။' },
    pros: [
      { en: '100% free open weights for local deployment', my: 'မိမိကွန်ပျူတာပေါ်တွင် အခမဲ့ ဒေါင်းလုဒ်ဆွဲ၍ တင်သုံးနိုင်ခြင်း' },
      { en: 'Strong benchmark performance matching GPT-4', my: 'GPT-4 အဆင့်မီ စွမ်းဆောင်ရည် အခမဲ့ ရရှိနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires high GPU resources for local running', my: 'ကွန်ပျူတာ စက်စွမ်းရည် (GPU) မြင့်မားစွာ လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free / Open Source ($0)', my: 'အခမဲ့ Open Source ($0)' },
    toolUrl: 'https://llama.meta.com'
  },
  {
    id: '9',
    title: 'Mistral Large',
    subtitle: 'High-Efficiency European Open-Weight AI',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Freemium / API',
    recommendFor: { en: 'European Businesses & Developer Integrators.', my: 'ကုဒ်ရေးသူများ၊ ဒေတာလုံခြုံရေး အထူးဂရုစိုက်သော အဖွဲ့အစည်းများ။' },
    pros: [
      { en: 'Highly efficient open-weights architecture', my: 'စက်စွမ်းအား အကုန်အကျ သက်သာပြီး တိကျမှု မြင့်မားခြင်း' },
      { en: 'Excellent multilingual processing capabilities', my: 'ဘာသာစကားမျိုးစုံ ပြုပြင်နိုင်စွမ်း အလွန်ထက်မြက်ခြင်း' }
    ],
    cons: [
      { en: 'Smaller ecosystem compared to OpenAI', my: 'Ecosystem အဝန်းအဝိုင်း ပိုမို သေးငယ်ခြင်း' }
    ],
    pricing: { en: 'le Chat Free ($0) | API Pay-as-you-go', my: 'Web အခမဲ့ ($0) | API အသုံးပြုသလောက် ပေးရန်' },
    toolUrl: 'https://mistral.ai'
  },
  {
    id: '10',
    title: 'Cohere Command R+',
    subtitle: 'Enterprise RAG & Search Optimized LLM',
    category: 'LLMs & Chatbots',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    pricingType: 'API Pricing',
    recommendFor: { en: 'Enterprise Search System Integrators.', my: 'ကုမ္ပဏီတွင်း Data ရှာဖွေရေး စနစ် (RAG) တည်ဆောက်လိုသူများ။' },
    pros: [
      { en: 'Optimized specifically for Enterprise RAG workflows', my: 'ကုမ္ပဏီတွင်း ဖိုင်များထဲမှ ဒေတာ ရှာဖွေရာတွင် အကောင်းဆုံး ဖြစ်ခြင်း' },
      { en: 'State-of-the-art multi-step reasoning capabilities', my: 'အဆင့်ဆင့် စဉ်းစားတွေးခေါ်နိုင်စွမ်း ထက်မြက်ခြင်း' }
    ],
    cons: [
      { en: 'Not designed for casual end-user chat UI', my: 'သာမန် စကားပြော Chat အဖြစ် သုံးရန် မဟုတ်ဘဲ API ဦးတည်ထားခြင်း' }
    ],
    pricing: { en: 'API Input ~$3/1M, Output ~$15/1M', my: 'API သုံးစွဲမှုအလိုက် ပေးဆောင်ရန်' },
    toolUrl: 'https://cohere.com'
  },
  {
    id: '11',
    title: 'Phind',
    subtitle: 'AI Search Engine for Developers',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $20/mo',
    recommendFor: { en: 'Software Developers & Programmers.', my: 'ဆော့ဖ်ဝဲ ရေးသားသူများနှင့် ပရိုဂရမ်မာများ။' },
    pros: [
      { en: 'Instant technical answers with code snippets', my: 'နည်းပညာဆိုင်ရာ မေးခွန်းများကို Code များနှင့်တကွ ချက်ချင်းဖြေကြားပေးခြင်း' },
      { en: 'Powered by state-of-the-art coding LLMs', my: 'ခေတ်မီ Coding LLM များကို အသုံးပြုထားခြင်း' }
    ],
    cons: [
      { en: 'Primarily focused on programming queries', my: 'ပရိုဂရမ်အလုပ်များကိုသာ အဓိက ဦးတည်ထားခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($20/mo)', my: 'အခမဲ့ ($0) | Pro ($20/လ)' },
    toolUrl: 'https://www.phind.com'
  },
  {
    id: '12',
    title: 'Stable Diffusion (Stability AI)',
    subtitle: 'Open Source Image Generation Model',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Open Source / Free',
    recommendFor: { en: 'Digital Artists & Local AI Creators.', my: 'ဒီဂျစ်တယ် အနုပညာရှင်များနှင့် ကိုယ်ပိုင်ဖန်တီးလိုသူများ။' },
    pros: [
      { en: 'Fully open-source and customizable locally', my: 'လုံးဝ အခမဲ့ဖြစ်ပြီး ကိုယ်ပိုင်ကွန်ပျူတာပေါ်တွင် စိတ်ကြိုက်ပြင်ဆင်နိုင်ခြင်း' },
      { en: 'Extensive ecosystem of plugins and LoRAs', my: 'Plugin နှင့် LoRA အမျိုးမျိုးဖြင့် ပုံစံအမျိုးစုံ ဖန်တီးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires powerful GPU hardware to run locally', my: 'ကွန်ပျူတာ စက်စွမ်းရည် (GPU) မြင့်မားစွာ လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free / Open Source ($0)', my: 'အခမဲ့ Open Source ($0)' },
    toolUrl: 'https://stability.ai'
  },
  {
    id: '13',
    title: 'Jasper AI',
    subtitle: 'AI Marketing & Copywriting Assistant',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    pricingType: '$39 - $99/mo',
    recommendFor: { en: 'Marketers, Copywriters & Brands.', my: 'စျေးကွက်ဖော်ဆောင်ရေး ကျွမ်းကျင်သူများနှင့် Copywriter များ။' },
    pros: [
      { en: 'Built-in brand voice and marketing templates', my: 'ကုမ္ပဏီ Brand ပုံစံနှင့် Marketing Template များ ပါဝင်ခြင်း' },
      { en: 'Collaborative workspace for content teams', my: 'အဖွဲ့လိုက် Content ရေးသားရာတွင် အလွန်အဆင်ပြေခြင်း' }
    ],
    cons: [
      { en: 'Higher subscription cost compared to standard LLMs', my: 'သာမန် AI များထက် လစဉ်ကြေး ပိုမိုမြင့်မားခြင်း' }
    ],
    pricing: { en: 'Creator ($39/mo) | Teams ($99/mo)', my: 'Creator ($39/လ) | Teams ($99/လ)' },
    toolUrl: 'https://www.jasper.ai'
  },
  {
    id: '14',
    title: 'Copy.ai',
    subtitle: 'AI Content Generator for Sales & Marketing',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Sales Teams & Digital Marketers.', my: 'အရောင်းအဖွဲ့များနှင့် ဒစ်ဂျစ်တယ် စျေးကွက်ရှာဖွေသူများ။' },
    pros: [
      { en: 'Automated sales workflows and email sequences', my: 'အရောင်းမြှင့်တင်ရေး အီးမေးလ်များနှင့် လုပ်ငန်းစဉ်များကို အလိုအလျောက် ဖန်တီးပေးခြင်း' },
      { en: 'Generous free tier for starters', my: 'စတင်အသုံးပြုသူများအတွက် အခမဲ့ ပလန်ကောင်းများ ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Output may require editing for specific brand tone', my: 'Brand ပုံစံအတိုင်း ဖြစ်စေရန် အနည်းငယ် ပြန်လည်ပြင်ဆင်ရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($36/mo)', my: 'အခမဲ့ ($0) | Pro ($36/လ)' },
    toolUrl: 'https://www.copy.ai'
  },
  {
    id: '15',
    title: 'GrammarlyGO',
    subtitle: 'AI Writing Partner for Grammar & Tone',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Students, Professionals & Writers.', my: 'ကျောင်းသားများ၊ လုပ်ငန်းခွင် ဝင်နေသူများနှင့် စာရေးဆရာများ။' },
    pros: [
      { en: 'Seamless browser and app integration', my: ' Browser နှင့် App မျိုးစုံတွင် အလွယ်တကူ အလုပ်လုပ်ခြင်း' },
      { en: 'Real-time tone adjustment and rewriting', my: 'ရေးသားချက်များကို ချက်ချင်း တည်းဖြတ်ပြီး အသံနှင့် ပုံစံ ပြောင်းလဲပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Advanced AI prompts limited on free tier', my: 'အဆင့်မြင့် AI အင်္ဂါရပ်များအတွက် Paid Plan လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Premium ($12/mo)', my: 'အခမဲ့ ($0) | Premium ($12/လ)' },
    toolUrl: 'https://www.grammarly.com'
  },
  {
    id: '16',
    title: 'QuillBot',
    subtitle: 'AI Paraphrasing & Summarization Tool',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Researchers, Students & Editors.', my: 'သုတေသီများ၊ ကျောင်းသားများနှင့် Editor များ။' },
    pros: [
      { en: 'Advanced sentence rewriting and paraphrasing', my: 'ဝါကျများကို အဓိပ္ပာယ်မပျက်ဘဲ ပုံစံအမျိုးမျိုးဖြင့် ပြန်လည်ရေးသားပေးခြင်း' },
      { en: 'Built-in plagiarism checker and summarizer', my: 'စာသားတူညီမှု စစ်ဆေးခြင်းနှင့် အနှစ်ချုပ် ထုတ်ပေးခြင်းများ ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Word count limits on free paraphrasing', my: 'အခမဲ့ ဗားရှင်းတွင် စာလုံးရေ အကန့်အသတ် ရှိခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Premium ($9.95/mo)', my: 'အခမဲ့ ($0) | Premium ($9.95/လ)' },
    toolUrl: 'https://quillbot.com'
  },
  {
    id: '17',
    title: 'Fireflies.ai',
    subtitle: 'AI Meeting Assistant & Notes',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Meeting Hosts & Project Managers.', my: 'အစည်းအဝေး ထိုင်လေ့ရှိသူများနှင့် Project မန်နေဂျာများ။' },
    pros: [
      { en: 'Auto-joins Zoom, Google Meet & Teams', my: 'Zoom, Google Meet နှင့် Teams တို့ထဲသို့ အလိုအလျောက် ဝင်ရောက်မှတ်သားပေးခြင်း' },
      { en: 'Searchable transcripts and AI meeting summaries', my: 'အစည်းအဝေး မှတ်တမ်းများကို ရှာဖွေနိုင်ပြီး အနှစ်ချုပ်ထုတ်ပေးခြင်း' }
    ],
    cons: [
      { en: 'Bot presence can feel disruptive to participants', my: 'အစည်းအဝေးထဲ Bot ဝင်နေခြင်းက တစ်ခါတရံ အိုက်စပ်စေနိုင်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($10/mo)', my: 'အခမဲ့ ($0) | Pro ($10/လ)' },
    toolUrl: 'https://fireflies.ai'
  },
  {
    id: '18',
    title: 'Replit Agent',
    subtitle: 'Autonomous AI Software Developer',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Subscription',
    recommendFor: { en: 'Indie Hackers & Rapid Prototypers.', my: 'App အမြန်ဆောက်လိုသူများနှင့် တစ်ကိုယ်တော် တည်ဆောက်သူများ။' },
    pros: [
      { en: 'Builds complete working web apps from text prompts', my: 'စာသားဖြင့် ညွှန်ကြားရုံဖြင့် အလုပ်လုပ်သည့် Web App တစ်ခုလုံးကို တည်ဆောက်ပေးနိုင်ခြင်း' },
      { en: 'Handles deployment and debugging automatically', my: 'Hosting တင်ခြင်းနှင့် Error ရှာဖွေပြင်ဆင်ခြင်းများကို အလိုအလျောက်လုပ်ဆောင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires active Replit core subscription', my: 'Replit Core ပလန် ဝယ်ယူထားရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Replit Core ($25/mo)', my: 'Replit Core ($25/လ)' },
    toolUrl: 'https://replit.com'
  },
  {
    id: '19',
    title: 'Tabnine',
    subtitle: 'AI Code Assistant for Enterprise Security',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Enterprise Developers & Secure Teams.', my: 'ကုမ္ပဏီကြီးများနှင့် လုံခြုံရေးအထူးဂရုစိုက်သော Developer များ။' },
    pros: [
      { en: 'Runs locally or securely on private cloud', my: 'ကုမ္ပဏီတွင်း Server သို့မဟုတ် Private Cloud ပေါ်တွင် လုံခြုံစွာ အလုပ်လုပ်ခြင်း' },
      { en: 'Zero data retention policy for privacy', my: 'အသုံးပြုသူ၏ Code များကို သိမ်းဆည်းမထားသည့် မူဝါဒရှိခြင်း' }
    ],
    cons: [
      { en: 'Code completion sometimes less creative than Copilot', my: 'Code ဖြည့်စွက်မှုမှာ Copilot လောက် စိတ်ကူးမဆန်းလှခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($12/mo)', my: 'အခမဲ့ ($0) | Pro ($12/လ)' },
    toolUrl: 'https://www.tabnine.com'
  },
  {
    id: '20',
    title: 'Leonardo AI',
    subtitle: 'AI Game Asset & Creative Art Generator',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Game Developers, Concept Artists & Designers.', my: 'ဂိမ်းဆော့ဖ်ဝဲ ရေးသူများနှင့် ဒီဇိုင်နာများ။' },
    pros: [
      { en: 'Specialized models for game textures and assets', my: 'ဂိမ်းဒီဇိုင်းနှင့် ပစ္စည်းပုံစံများအတွက် သီးသန့် မော်ດယ်များပါရှိခြင်း' },
      { en: 'Generous daily free token allowance', my: 'နေ့စဉ် အခမဲ့ Token များ လုံလောက်စွာ ရရှိနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Advanced features require paid tier upgrade', my: 'အဆင့်မြင့် လုပ်ဆောင်ချက်များအတွက် ပလန်မြှင့်တင်ရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($12/mo)', my: 'အခမဲ့ ($0) | Pro ($12/လ)' },
    toolUrl: 'https://leonardo.ai'
  },
  {
    id: '26',
    title: 'Notion AI',
    subtitle: 'Connected AI Assistant for Workspace & Docs',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop',
    pricingType: '$8 - $10/mo',
    recommendFor: { en: 'Project Managers, Teams & Knowledge Workers.', my: 'Project မန်နေဂျာများ၊ စာရွက်စာတမ်းနှင့် မှတ်စုများ စနစ်တကျ ထိန်းသိမ်းလိုသူများ။' },
    pros: [
      { en: 'Workspace integration with all notes', my: 'မိမိ Workspace ထဲရှိ ဖိုင်များနှင့် မှတ်စုများအပေါ် အခြေခံခြင်း' },
      { en: 'Instant summarizing & action items', my: 'မှတ်စုများကို အနှစ်ချုပ်ပေးခြင်းနှင့် ချက်ချင်း ဘာသာပြန်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires active Notion account', my: 'Notion App နှင့် တွဲဖက်သုံးမှသာ အလုပ်လုပ်ခြင်း' }
    ],
    pricing: { en: '$8/member/mo (Billed annually)', my: '$8/တစ်ဦး/လ (နှစ်ချုပ်ပေးသွင်းရန်)' },
    toolUrl: 'https://notion.so'
  },
  {
    id: '27',
    title: 'Zapier Central',
    subtitle: 'No-Code AI Automation Bots & Agents',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Business Owners & Operations Teams.', my: 'လုပ်ငန်းရှင်များ၊ လုပ်ငန်းစဉ် အလိုအလျောက် ချိတ်ဆက်လိုသူများ။' },
    pros: [
      { en: 'Connects with 6,000+ apps easily', my: 'Apps ပေါင်း 6,000 ကျော်နှင့် အလွယ်တကူ ချိတ်ဆက်ပေးနိုင်ခြင်း' },
      { en: 'Autonomous multi-step task execution', my: 'အလုပ်များကို အဆင့်လိုက် အလိုအလျောက် လုပ်ဆောင်ပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Can get expensive on high task volume', my: 'အသုံးပြုမှု များလာပါက ကုန်ကျစရိတ် မြင့်မားနိုင်ခြင်း' },
    ],
    pricing: { en: 'Free tier | Pro from $29.99/mo', my: 'အခမဲ့ ရရှိနိုင် | Pro ပလန် $29.99/လ မှစတင်' },
    toolUrl: 'https://zapier.com'
  },
  {
    id: '28',
    title: 'Make.com',
    subtitle: 'Visual Workflow Automation with AI',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Workflow Engineers & System Integrators.', my: 'Workflow စနစ်တည်ဆောက်သူများနှင့် System ချိတ်ဆက်လိုသူများ။' },
    pros: [
      { en: 'Advanced visual scenario builder', my: 'ပုံစံအမျိုးမျိုးဖြင့် ရှုပ်ထွေးသော Workflow များကို ဆွဲသားနိုင်ခြင်း' },
      { en: 'Robust data transformation capabilities', my: 'ဒေတာများကို လိုသလို ပြောင်းလဲ စီမံပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Steeper learning curve for beginners', my: 'စတင်အသုံးပြုသူများအတွက် လေ့လာရ ခက်ခဲနိုင်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Core ($9/mo)', my: 'အခမဲ့ ($0) | Core ($9/လ)' },
    toolUrl: 'https://www.make.com'
  },
  {
    id: '29',
    title: 'Otter.ai',
    subtitle: 'AI Meeting Assistant & Transcription',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Meeting Hosts, Researchers & Interviewers.', my: 'အစည်းအဝေး ထိုင်လေ့ရှိသူများ၊ Interview ပြုလုပ်သူများနှင့် သုတေသီများ။' },
    pros: [
      { en: 'Real-time audio transcription & summaries', my: 'အသံဖိုင်များကို ချက်ချင်း စာသားပြောင်းပေးပြီး အနှစ်ချုပ်ပေးခြင်း' },
      { en: 'Joins Zoom, Google Meet & Teams automatically', my: 'Zoom, Google Meet စသည်တို့ထဲ အလိုအလျောက် ဝင်ရောက်မှတ်သားပေးခြင်း' }
    ],
    cons: [
      { en: 'Lower accuracy with heavy non-English accents', my: 'အင်္ဂလိပ်စကား ဝဲပါက သို့မဟုတ် အသံဝါးပါက အမှားပါတတ်ခြင်း' }
    ],
    pricing: { en: 'Free | Pro ($10/mo)', my: 'အခမဲ့ | Pro ($10/လ)' },
    toolUrl: 'https://otter.ai'
  },
  {
    id: '30',
    title: 'ClickUp AI',
    subtitle: 'Project Management with Built-in AI',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
    pricingType: '$5/mo add-on',
    recommendFor: { en: 'Project Teams & Agile Managers.', my: 'Project အဖွဲ့များနှင့် Task စီမံခန့်ခွဲသူများ။' },
    pros: [
      { en: 'Generates subtasks and project plans instantly', my: 'Task များကို အသေးစိတ်ခွဲထုတ်ပေးပြီး Plan ရေးဆွဲပေးခြင်း' },
      { en: 'Connected directly to project documents', my: 'Project ဖိုင်များနှင့် တိုက်ရိုက် ချိတ်ဆက်အလုပ်လုပ်ခြင်း' }
    ],
    cons: [
      { en: 'Requires ClickUp paid workspace plan', my: 'ClickUp ပလန် ဝယ်ယူထားရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: '$5 per member per month', my: 'တစ်ဦးလျှင် တစ်လလျှင် $5' },
    toolUrl: 'https://clickup.com'
  },
  {
    id: '31',
    title: 'Asana Intelligence',
    subtitle: 'AI-Powered Work Graph & Operations',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Included in Paid Plans',
    recommendFor: { en: 'Enterprise Operations & Team Leads.', my: 'ကုမ္ပဏီလုပ်ငန်းစဉ် စီမံခန့်ခွဲသူများနှင့် Team Lead များ။' },
    pros: [
      { en: 'Identifies project bottlenecks automatically', my: 'Project နှောင့်နှေးရသည့် အကြောင်းရင်းများကို ရှာဖွေပြသပေးခြင်း' },
      { en: 'Smart status updates and answers', my: 'လုပ်ငန်းအခြေအနေများကို စမတ်ကျကျ အစီရင်ခံပေးခြင်း' }
    ],
    cons: [
      { en: 'Only available in higher Asana tiers', my: 'Asana ၏ မြင့်မားသော ပလန်များတွင်သာ ပါဝင်ခြင်း' }
    ],
    pricing: { en: 'Included in Advanced & Enterprise plans', my: 'Advanced နှင့် Enterprise ပလန်များတွင် ပါဝင်ပြီး' },
    toolUrl: 'https://asana.com'
  },
  {
    id: '32',
    title: 'Todoist AI',
    subtitle: 'Smart Task Breakdown Assistant',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Personal Productivity & Task Trackers.', my: 'ကိုယ်ပိုင်အလုပ်များကို စနစ်တကျ စီစဉ်လိုသူများ။' },
    pros: [
      { en: 'Breaks complex goals into actionable sub-tasks', my: 'ကြီးမားသော ရည်မှန်းချက်များကို လုပ်ဆောင်ရမည့် Task ငယ်များအဖြစ် ခွဲထုတ်ပေးခြင်း' },
      { en: 'Natural language task scheduling', my: 'ရိုးရိုးစာသားဖြင့် ရေးထည့်ရုံဖြင့် အချိန်ဇယား အလိုအလျောက် သတ်မှတ်ပေးခြင်း' }
    ],
    cons: [
      { en: 'AI features have daily usage limits on free plan', my: 'အခမဲ့ဗားရှင်းတွင် AI သုံးစွဲမှု အကန့်အသတ်ရှိခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($4/mo)', my: 'အခမဲ့ ($0) | Pro ($4/လ)' },
    toolUrl: 'https://todoist.com'
  },
  {
    id: '33',
    title: 'Airtable AI',
    subtitle: 'AI-Enhanced Relational Databases',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Paid Add-on',
    recommendFor: { en: 'Data Analysts & Operations Managers.', my: 'ဒေတာ စီမံခန့်ခွဲသူများနှင့် လုပ်ငန်းစနစ် တည်ဆောက်သူများ။' },
    pros: [
      { en: 'Summarizes and categorizes database records instantly', my: 'Database ထဲရှိ အချက်အလက်များကို ချက်ချင်း အနှစ်ချုပ်ပေးခြင်း' },
      { en: 'Generates formula and workflow scripts via chat', my: 'Formula များနှင့် Script များကို Chat ဖြင့် တောင်းဆိုနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires Airtable enterprise or team tier', my: 'Team သို့မဟုတ် Enterprise ပလန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Paid add-on for team workspaces', my: 'Team Workspace များအတွက် ထပ်ဆောင်းပေးချေရန်' },
    toolUrl: 'https://airtable.com'
  },
  {
    id: '34',
    title: 'HubSpot Breeze AI',
    subtitle: 'Customer Platform with Embedded AI',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Freemium / Paid',
    recommendFor: { en: 'Sales, Marketing & Customer Support Teams.', my: 'အရောင်း၊ စျေးကွက်နှင့် ဖောက်သည်ဝန်ဆောင်မှု အဖွဲ့များ။' },
    pros: [
      { en: 'Deep CRM integration for customer insights', my: 'ဖောက်သည် ဒေတာအချက်အလက်များနှင့် တိုက်ရိုက် ချိတ်ဆက်ပေးခြင်း' },
      { en: 'Automated blog, email and social content creation', my: 'Blog, Email နှင့် Social Media အတွက် Content များ အလိုအလျောက်ဖန်တီးခြင်း' }
    ],
    cons: [
      { en: 'HubSpot ecosystem lock-in', my: 'HubSpot စနစ်အတွင်းတွင်သာ အဓိက အလုပ်လုပ်ခြင်း' }
    ],
    pricing: { en: 'Free CRM tools | Paid tiers vary', my: 'အခမဲ့ CRM ပါရှိ | Paid ပလန်များ ကွဲပြားမှုရှိ' },
    toolUrl: 'https://www.hubspot.com'
  },
  {
    id: '35',
    title: 'Salesforce Einstein',
    subtitle: 'Enterprise Predictive & Generative AI',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Enterprise Pricing',
    recommendFor: { en: 'Large Enterprises & Sales Operations.', my: 'ကုမ္ပဏီကြီးများနှင့် အရောင်းဌာန ကြီးကြပ်သူများ။' },
    pros: [
      { en: 'Predictive sales forecasting and lead scoring', my: 'အရောင်းအလားအလာများကို ကြိုတင်ခန့်မှန်းပေးနိုင်ခြင်း' },
      { en: 'Trusted enterprise-grade data security', my: 'ကုမ္ပဏီအဆင့် မြင့်မားသော ဒေတာလုံခြုံရေး စနစ်ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'High implementation complexity and cost', my: 'ချိတ်ဆက်အသုံးပြုရန် ရှုပ်ထွေးပြီး ကုန်ကျစရိတ် ကြီးမားခြင်း' }
    ],
    pricing: { en: 'Custom Enterprise Pricing', my: 'ကုမ္ပဏီအလိုက် ညှိနှိုင်းဈေးနှုန်း' },
    toolUrl: 'https://www.salesforce.com'
  },
  {
    id: '36',
    title: 'Intercom Fin',
    subtitle: 'AI Customer Service Agent',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Pay per resolution',
    recommendFor: { en: 'Customer Support Teams & E-commerce Brands.', my: 'ဖောက်သည်ဝန်ဆောင်မှု ပေးသော အွန်လိုင်းဆိုင်များနှင့် ကုမ္ပဏီများ။' },
    pros: [
      { en: 'Resolves up to 50%+ customer queries accurately', my: 'ဖောက်သည်မေးခွန်းများ၏ ၅၀ ရာခိုင်နှုန်းကျော်ကို အလိုအလျောက် ဖြေရှင်းပေးနိုင်ခြင်း' },
      { en: 'Zero hallucination based on your help center docs', my: 'ကုမ္ပဏီ၏ Help Center စာရွက်စာတမ်းများကိုသာ အခြေခံ၍ ဖြေဆိုခြင်း' }
    ],
    cons: [
      { en: 'Priced per successful customer resolution', my: 'ဖောက်သည်တစ်ဦးချင်းစီကို ဖြေရှင်းပေးမှုအပေါ်မူတည်၍ ကျသင့်ငွေကောက်ခံခြင်း' }
    ],
    pricing: { en: '$0.99 per resolved conversation', my: 'ဖြေရှင်းပေးမှု တစ်ခုလျှင် $0.99' },
    toolUrl: 'https://www.intercom.com'
  },
  {
    id: '37',
    title: 'Zendesk AI',
    subtitle: 'Intelligent Customer Support Workspace',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Paid Add-on',
    recommendFor: { en: 'Support Managers & Helpdesk Teams.', my: 'Helpdesk နှင့် ဖောက်သည်ဝန်ဆောင်မှု မန်နေဂျာများ။' },
    pros: [
      { en: 'Triage and sentiment analysis for support tickets', my: 'Support Ticket များကို အမျိုးအစားခွဲခြားပေးပြီး ဖောက်သည် စိတ်ခံစားချက်ကို စစ်ဆေးပေးခြင်း' },
      { en: 'Macro suggestions and auto-responses', my: 'အသင့်သုံး အဖြေများနှင့် အလိုအလျောက် တုံ့ပြန်မှုများ ပေးစွမ်းခြင်း' }
    ],
    cons: [
      { en: 'Requires core Zendesk support suite subscription', my: 'Zendesk Support Suite ပလန် ရှိရန် လိုအပ်ခြင်း' },
    ],
    pricing: { en: 'Add-on pricing per agent', my: 'ဝန်ထမ်းတစ်ဦးချင်းအတွက် ထပ်ဆောင်းပေးချေရခြင်း' },
    toolUrl: 'https://www.zendesk.com'
  },
  {
    id: '38',
    title: 'Typefully',
    subtitle: 'AI Writer & Analytics for X (Twitter)',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Content Creators, Founders & Marketers on X.', my: 'X (Twitter) ပေါ်တွင် Content တင်သော ဖန်တီးရှင်များနှင့် လုပ်ငန်းရှင်များ။' },
    pros: [
      { en: 'Distraction-free thread writing and scheduling', my: 'X Thread များကို သက်တောင့်သက်သာ ရေးသားပြီး အချိန်ကိုက် တင်နိုင်ခြင်း' },
      { en: 'AI prompts to rewrite, hook and expand tweets', my: 'Tweet များကို ဆွဲဆောင်မှုရှိစေရန် AI ဖြင့် ပြန်လည်ရေးသားနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Focused strictly on X/Twitter ecosystem', my: 'X (Twitter) ပလက်ဖောင်းကိုသာ အဓိက ဦးတည်ထားခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Creator ($12.5/mo)', my: 'အခမဲ့ ($0) | Creator ($12.5/လ)' },
    toolUrl: 'https://typefully.com'
  },
  {
    id: '39',
    title: 'Buffer AI',
    subtitle: 'Social Media Post Generator & Planner',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Small Business Owners & Social Media Managers.', my: 'အသေးစားလုပ်ငန်းရှင်များနှင့် ဆိုရှယ်မီဒီယာ စီမံခန့်ခွဲသူများ။' },
    pros: [
      { en: 'Repurpose one post across multiple social platforms', my: 'Post တစ်ခုတည်းကို ပလက်ဖောင်းမျိုးစုံအတွက် အလွယ်တကူ ပြောင်းလဲသုံးနိုင်ခြင်း' },
      { en: 'Simple and intuitive content calendar', my: 'ရိုးရှင်းပြီး အသုံးပြုရလွယ်ကူသော Content Calendar ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Limited advanced analytics on lower tiers', my: 'ပလန်နိမ့်များတွင် Data အသေးစားများကိုသာ ကြည့်ရှုနိုင်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Essentials ($6/mo per channel)', my: 'အခမဲ့ ($0) | Essentials ($6/လ တစ်ခုချင်းစီ)' },
    toolUrl: 'https://buffer.com'
  },
  {
    id: '40',
    title: 'Hootsuite OwlyWriter AI',
    subtitle: 'Social Media Caption & Idea Generator',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Included in Hootsuite',
    recommendFor: { en: 'Enterprise Social Media Teams.', my: 'ကုမ္ပဏီကြီးများ၏ ဆိုရှယ်မီဒီယာ အဖွဲ့များ။' },
    pros: [
      { en: 'Instantly generates captions based on article links', my: 'Link ထည့်ရုံဖြင့် ဆိုရှယ်မီဒီယာ Caption များကို ချက်ချင်းဖန်တီးပေးခြင်း' },
      { en: 'Creates post variations for different tones', my: 'ပုံစံအမျိုးမျိုးဖြင့် Caption များကို ထုတ်လုပ်ပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires expensive Hootsuite subscription', my: 'Hootsuite ၏ ဈေးကြီးသော ပလန်ကို ဝယ်ယူထားရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Included in Hootsuite paid plans', my: 'Hootsuite ပလန်များတွင် ပူးတွဲပါဝင်ပြီး' },
    toolUrl: 'https://www.hootsuite.com'
  },
  {
    id: '41',
    title: 'Canva Magic Design',
    subtitle: 'AI Graphic Design & Presentation Creator',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Pro ($15/mo)',
    recommendFor: { en: 'Non-designers, Marketers & Creators.', my: 'ဒီဇိုင်းပညာရှင် မဟုတ်သူများ၊ Marketer များနှင့် Content ဖန်တီးသူများ။' },
    pros: [
      { en: 'Generates complete presentations and designs from text', my: 'စာသားဖြင့် ညွှန်ကြားရုံဖြင့် ပုံစံအပြည့်အစုံ Presentation နှင့် Design များကို ဖန်တီးပေးခြင်း' },
      { en: 'Magical eraser, background remover and resize tools', my: 'နောက်ခံဖျက်ခြင်း၊ မလိုအပ်သည်များကို ဖြုတ်ထုတ်ခြင်းများ အလွယ်တကူလုပ်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Pro features require subscription', my: 'အဆင့်မြင့် လုပ်ဆောင်ချက်များအတွက် Pro ပလန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($15/mo)', my: 'အခမဲ့ ($0) | Pro ($15/လ)' },
    toolUrl: 'https://www.canva.com'
  },
  {
    id: '42',
    title: 'Adobe Firefly',
    subtitle: 'Commercial-Safe Generative AI by Adobe',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Professional Designers & Creative Agencies.', my: 'ကျွမ်းကျင် ဒီဇိုင်နာများနှင့် Creative Agency များ။' },
    pros: [
      { en: 'Trained on licensed stock data (Copyright safe)', my: 'မူပိုင်ခွင့် လုံခြုံစိတ်ချရသော Data ဖြင့် လေ့ကျင့်ထားခြင်း' },
      { en: 'Seamless Photoshop and Illustrator integration', my: 'Photoshop နှင့် Illustrator တို့တွင် တိုက်ရိုက်အလုပ်လုပ်ခြင်း' }
    ],
    cons: [
      { en: 'Generative credits deplete quickly on heavy use', my: 'အသုံးပြုမှု များပြားပါက Credit ကုန်ဆုံးမှု မြန်ဆန်ခြင်း' }
    ],
    pricing: { en: 'Free tier with credits | Pro from $4.99/mo', my: 'အခမဲ့ Credit ပါရှိ | Pro ပလန် $4.99/လ မှစတင်' },
    toolUrl: 'https://www.adobe.com/products/firefly.html'
  },
  {
    id: '43',
    title: 'CapCut AI Video Editor',
    subtitle: 'Smart Video Editing & Auto Captions',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Pro',
    recommendFor: { en: 'TikTokers, Reels Creators & Video Editors.', my: 'TikTok, Reels တင်သူများနှင့် ဗီဒီယို တည်းဖြတ်သူများ။' },
    pros: [
      { en: 'Automatic dynamic captions and speech-to-text', my: 'ဗီဒီယိုထဲတွင် စာတန်းထိုးများကို အလိုအလျောက် အလှပဆုံး ထည့်ပေးနိုင်ခြင်း' },
      { en: 'AI background removal and script-to-video tools', my: 'နောက်ခံဖျက်ခြင်းနှင့် စာသားမှ ဗီဒီယိုဖန်တီးခြင်းများ ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Watermark or export limits on some free templates', my: 'အခမဲ့ ပလန်တွင် Template အချို့ Watermark ပါတတ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($7.99/mo)', my: 'အခမဲ့ ($0) | Pro ($7.99/လ)' },
    toolUrl: 'https://www.capcut.com'
  },
  {
    id: '44',
    title: 'Descript',
    subtitle: 'Text-Based Video & Audio Editor',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Podcasters, YouTubers & Course Creators.', my: 'Podcast လုပ်ကိုင်သူများနှင့် YouTube ဖန်တီးရှင်များ။' },
    pros: [
      { en: 'Edit audio and video simply by editing text transcripts', my: 'စာသားများကို ဖျက်ခြင်း/ပြင်ခြင်းဖြင့် ဗီဒီယိုနှင့် အသံကိုပါ တည်းဖြတ်နိုင်ခြင်း' },
      { en: 'AI studio sound enhancement and filler word removal', my: 'အသံသန့်စင်ပေးခြင်းနှင့် မလိုအပ်သော စကားလုံးများကို အလိုအလျောက် ဖြတ်ထုတ်ပေးခြင်း' }
    ],
    cons: [
      { en: 'Rendering large video projects can take time', my: 'ဗီဒီယိုဖိုင်ကြီးများ Export ထုတ်ရာတွင် အချိန်အနည်းငယ်ယူခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Creator ($12/mo)', my: 'အခမဲ့ ($0) | Creator ($12/လ)' },
    toolUrl: 'https://www.descript.com'
  },
  {
    id: '45',
    title: 'Murf.ai',
    subtitle: 'AI Voiceover Studio & Speech Generator',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'E-learning Creators, Marketers & Animators.', my: 'ပညာရေးဆိုင်ရာ ဗီဒီယိုဖန်တီးသူများနှင့် Marketer များ။' },
    pros: [
      { en: 'Hundreds of natural-sounding professional voices', my: 'ကျွမ်းကျင်ပညာရှင်များ၏ အသံထွက်နှင့်တူသော အသံအမျိုးအစား ရွေးချယ်စရာ ရရှိနိုင်ခြင်း' },
      { en: 'Precise pitch, speed and emphasis controls', my: 'အသံအနိမ့်အမြင့်၊ အမြန်နှုန်းနှင့် အသံထွက်ကို စိတ်ကြိုက်ညှိနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Free plan does not allow commercial audio downloads', my: 'အခမဲ့ ပလန်တွင် Comercial အတွက် အသံဒေါင်းလုဒ်ဆွဲခွင့်မရှိခြင်း' }
    ],
    pricing: { en: 'Free trial | Creator ($19/mo)', my: 'အခမဲ့ စမ်းသပ်သုံးနိုင် | Creator ($19/လ)' },
    toolUrl: 'https://murf.ai'
  },
  {
    id: '46',
    title: 'Synthesia',
    subtitle: 'AI Video Generation with Human Avatars',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Paid Plan',
    recommendFor: { en: 'Corporate Trainers & L&D Professionals.', my: 'ကုမ္ပဏီတွင်း သင်တန်းပို့ချသူများနှင့် ပညာရေးဖန်တီးရှင်များ။' },
    pros: [
      { en: 'Creates realistic talking avatar videos from text', my: 'စာသားထည့်ရုံဖြင့် လူသားအစစ်အတိုင်း ပြောဆိုနေသော Avatar ဗီဒီယိုများကို ဖန်တီးပေးခြင်း' },
      { en: 'Supports 130+ languages and accents', my: 'ဘာသာစကား ၁၃၀ ကျော်ကို ထောက်ပံ့ပေးခြင်း' }
    ],
    cons: [
      { en: 'Higher pricing tiers for professional usage', my: 'ပရော်ဖက်ရှင်နယ် အသုံးအတွက် ကုန်ကျစရိတ် ကြီးမားခြင်း' }
    ],
    pricing: { en: 'Starter ($22/mo) | Creator ($67/mo)', my: 'Starter ($22/လ) | Creator ($67/လ)' },
    toolUrl: 'https://www.synthesia.io'
  },
  {
    id: '47',
    title: 'HeyGen',
    subtitle: 'AI Video Spokesperson & Translation Studio',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Global Marketers & Video Creators.', my: 'နိုင်ငံတကာ စျေးကွက်ရှာဖွေသူများနှင့် ဗီဒီယိုဖန်တီးရှင်များ။' },
    pros: [
      { en: 'Stunning video translation with lip-syncing', my: 'ဗီဒီယိုများကို နှုတ်ခမ်းလှုပ်ရှားမှု (Lip-sync) မပျက်ဘဲ ဘာသာစကားအမျိုးမျိုးသို့ ပြောင်းလဲနိုင်ခြင်း' },
      { en: 'High-definition digital human avatars', my: 'အရည်အသွေးမြင့်မားပြီး အပြင်လူနှင့်တူသော Avatar များကို သုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Video generation minutes are limited per month', my: 'လစဉ် ထုတ်လုပ်နိုင်သည့် ဗီဒီယို မိနစ် အကန့်အသတ်ရှိခြင်း' }
    ],
    pricing: { en: 'Free trial | Creator ($29/mo)', my: 'အခမဲ့ စမ်းသပ်သုံးနိုင် | Creator ($29/လ)' },
    toolUrl: 'https://www.heygen.com'
  },
  {
    id: '48',
    title: 'Gamma App',
    subtitle: 'AI-Powered Presentation & Web Page Generator',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Presenters, Educators & Founders.', my: 'Presentation တင်ပြရသူများ၊ ဆရာများနှင့် Startup တည်ထောင်သူများ။' },
    pros: [
      { en: 'Creates stunning slide decks and web pages from a prompt', my: 'စာသားတစ်ကြောင်းပေးရုံဖြင့် လှပသော Slide များနှင့် Web Page များကို တည်ဆောက်ပေးခြင်း' },
      { en: 'Interactive elements and modern layouts built-in', my: 'ခေတ်မီသော ဒီဇိုင်းပုံစံများနှင့် အပြန်အလှန်ချိတ်ဆက်မှုများ ပါဝင်ခြင်း' }
    ],
    cons: [
      { en: 'Custom branding requires paid tier', my: 'ကိုယ်ပိုင် Brand လိုဂို ထည့်သွင်းလိုပါက Paid Plan လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Plus ($8/mo)', my: 'အခမဲ့ ($0) | Plus ($8/လ)' },
    toolUrl: 'https://gamma.app'
  },
  {
    id: '49',
    title: 'Tome',
    subtitle: 'AI Storytelling & Pitch Deck Creator',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Startup Founders & Sales Pitchers.', my: 'Startup လုပ်ငန်းရှင်များနှင့် ရင်းနှီးမြှုပ်နှံမှုရှာဖွေနေသူများ။' },
    pros: [
      { en: 'Generates narrative-driven pitch decks and pages', my: 'ဇာတ်လမ်းဆန်ဆန် စွဲဆောင်မှုရှိသော Pitch Deck များကို ဖန်တီးပေးခြင်း' },
      { en: 'Integrated AI image generation and layout styling', my: 'AI ပုံထုတ်စက်နှင့် ဒီဇိုင်းစတိုင်များ ပူးတွဲပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Export to PowerPoint formatting needs adjustments', my: 'PowerPoint သို့ Export ထုတ်ရာတွင် ဒီဇိုင်းအနည်းငယ် ပြန်ပြင်ရန်လိုခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($16/mo)', my: 'အခမဲ့ ($0) | Pro ($16/လ)' },
    toolUrl: 'https://tome.app'
  },
  {
    id: '50',
    title: 'Beautiful.ai',
    subtitle: 'Smart Presentation Maker with Design AI',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Paid Plan',
    recommendFor: { en: 'Business Professionals & Executives.', my: 'လုပ်ငန်းရှင်များနှင့် ကော်ပိုရိတ် ဝန်ထမ်းများ။' },
    pros: [
      { en: 'Slides auto-format and adapt as you add content', my: 'အချက်အလက်များ ထည့်သွင်းလိုက်သည်နှင့် Slide ဒီဇိုင်းများ အလိုအလျောက် ချိန်ညှိပေးခြင်း' },
      { en: 'Clean, professional business templates', my: 'သန့်ရှင်းပြီး ပရော်ဖက်ရှင်နယ်ဆန်သော Business Template များ ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'No permanent free tier available', my: 'အခမဲ့ အမြဲတမ်း အသုံးပြုခွင့် မရှိခြင်း' }
    ],
    pricing: { en: 'Pro ($12/mo billed annually)', my: 'Pro ($12/လ - နှစ်ချုပ်ပေးသွင်းရန်)' },
    toolUrl: 'https://www.beautiful.ai'
  },
  {
    id: '51',
    title: 'Cursor',
    subtitle: 'The AI-first Code Editor',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $20/mo',
    recommendFor: { en: 'Software Engineers and Web Developers.', my: 'ဆော့ဖ်ဝဲ အင်ဂျင်နီယာများနှင့် ဝဘ် Developer များ။' },
    pros: [
      { en: 'Deep codebase indexing and chat context', my: 'ကုဒ်ဖိုင်တစ်ခုလုံးကို နားလည်ပြီး ချက်ချင်း မေးမြန်းနိုင်ခြင်း' },
      { en: 'Fork of VS Code with seamless extension support', my: 'VS Code ပုံစံတူဖြစ်၍ Extension များ အလွယ်တကူ သုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Paid plan required for unlimited fast requests', my: 'အမြန်နှုန်းအပြည့်ဖြင့် အကန့်အသတ်မရှိသုံးရန် Pro ပလန်လိုခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($20/mo)', my: 'အခမဲ့ ($0) | Pro ($20/လ)' },
    toolUrl: 'https://www.cursor.com'
  },
  {
    id: '52',
    title: 'GitHub Copilot',
    subtitle: 'AI Pair Programmer by GitHub & OpenAI',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=800&auto=format&fit=crop',
    pricingType: '$10/mo',
    recommendFor: { en: 'Professional Programmers & Enterprise Teams.', my: 'ပရော်ဖက်ရှင်နယ် ပရိုဂရမ်မာများနှင့် ကုမ္ပဏီ Developer များ။' },
    pros: [
      { en: 'Real-time multi-line code completions', my: 'ကုဒ်လိုင်းပေါင်းများစွာကို အချိန်နှင့်တပြေးညီ ဖြည့်စွက်ပေးခြင်း' },
      { en: 'Integrated directly into VS Code, JetBrains & Xcode', my: 'IDE မျိုးစုံတွင် တိုက်ရိုက် ချိတ်ဆက်အလုပ်လုပ်ခြင်း' }
    ],
    cons: [
      { en: 'No permanent free individual tier', my: 'တစ်ဦးချင်းအတွက် အခမဲ့ ပလန်အမြဲတမ်း မရှိခြင်း' }
    ],
    pricing: { en: 'Individual ($10/mo) | Business ($19/user/mo)', my: 'Individual ($10/လ) | Business ($19/တစ်ဦး/လ)' },
    toolUrl: 'https://github.com/features/copilot'
  },
  {
    id: '53',
    title: 'v0 by Vercel',
    subtitle: 'Generative UI Component System',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Frontend Developers & UI/UX Designers.', my: 'Frontend Developer များ၊ UI/UX ဒီဇိုင်နာများနှင့် Web တည်ဆောက်သူများ။' },
    pros: [
      { en: 'Generates production-ready React & Tailwind code', my: 'React နှင့် Tailwind UI ကုဒ်များကို ချက်ချင်းထုတ်လုပ်ပေးခြင်း' },
      { en: 'Interactive previews and rapid prompt modifications', my: 'ဒီဇိုင်းများကို ချက်ချင်းကြည့်ရှုပြီး စာသားဖြင့် ပြင်ဆင်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires credit refills for heavy generations', my: 'အသုံးပြုမှု များပြားပါက Credit ထပ်ဝယ်ရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free Tier | Premium from $20/mo', my: 'အခမဲ့ ရရှိနိုင် | Premium $20/လ မှစတင်' },
    toolUrl: 'https://v0.dev'
  },
  {
    id: '54',
    title: 'Bolt.new',
    subtitle: 'Full-Stack Web Development in Browser',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Freemium / Paid',
    recommendFor: { en: 'Indie Hackers & Rapid Prototypers.', my: 'App အမြန်ဆောက်လိုသူများနှင့် တစ်ကိုယ်တော် တည်ဆောက်သူများ။' },
    pros: [
      { en: 'Builds, runs and deploys full-stack apps in browser', my: 'ဘရောက်ဇာထဲတွင်ပင် Full-Stack App များကို တည်ဆောက်ပြီး တင်နိုင်ခြင်း' },
      { en: 'Powered by StackBlitz WebContainer technology', my: 'WebContainer နည်းပညာဖြင့် လျှင်မြန်စွာ အလုပ်လုပ်ခြင်း' }
    ],
    cons: [
      { en: 'Token limits apply during intensive coding sessions', my: 'ကုဒ်အများကြီး ရေးသည့်အခါ Token ကုန်ဆုံးမှု မြန်ဆန်ခြင်း' }
    ],
    pricing: { en: 'Free credits | Pro tiers available', my: 'အခမဲ့ Credit ပါရှိ | Pro ပလန်များ ရှိသည်' },
    toolUrl: 'https://bolt.new'
  },
  {
    id: '55',
    title: 'Lovable.dev',
    subtitle: 'AI Full-Stack App Generator',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Founders & Non-technical Builders.', my: 'Startup တည်ထောင်သူများနှင့် နည်းပညာပိုင်း မကျွမ်းကျင်သူများ။' },
    pros: [
      { en: 'Creates gorgeous, responsive web applications instantly', my: 'လှပပြီး ဖုန်း/ကွန်ပျူတာ အဆင်ပြေမည့် Web App များကို ဖန်တီးပေးခြင်း' },
      { en: 'Supabase and backend integration built-in', my: 'Database နှင့် Backend ချိတ်ဆက်မှုများ ပါဝင်ပြီးသားဖြစ်ခြင်း' }
    ],
    cons: [
      { en: 'Complex custom logic requires manual adjustments', my: 'အလွန်ခက်ခဲသော လုပ်ငန်းစဉ်များအတွက် ကိုယ်တိုင် အနည်းငယ် ပြင်ဆင်ရခြင်း' }
    ],
    pricing: { en: 'Free tier | Pro plans available', my: 'အခမဲ့ ပလန်ပါရှိ | Pro ပလန်များ ရှိသည်' },
    toolUrl: 'https://lovable.dev'
  },
  {
    id: '56',
    title: 'Windsurf',
    subtitle: 'Agentic IDE & Collaborative AI Code Editor',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Pro',
    recommendFor: { en: 'Advanced Software Engineers.', my: 'အဆင့်မြင့် ဆော့ဖ်ဝဲ အင်ဂျင်နီယာများ။' },
    pros: [
      { en: 'Advanced AI agent that can edit multiple files autonomously', my: 'ဖိုင်များစွာကို AI ကိုယ်တိုင် တပြိုင်နက် တည်းဖြတ်ပေးနိုင်ခြင်း' },
      { en: 'Deep situational awareness of project structure', my: 'Project တည်ဆောက်ပုံကို အပြည့်အစုံ နားလည်သဘောပေါက်ခြင်း' }
    ],
    cons: [
      { en: 'Resource intensive on older machines', my: 'စက်ဟောင်းများတွင် RAM စားသုံးမှု အနည်းငယ် များနိုင်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($15/mo)', my: 'အခမဲ့ ($0) | Pro ($15/လ)' },
    toolUrl: 'https://codeium.com/windsurf'
  },
  {
    id: '57',
    title: 'Continue',
    subtitle: 'Open-Source AI Code Assistant for IDEs',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Open Source ($0)',
    recommendFor: { en: 'Privacy-conscious & Open Source Developers.', my: 'ဒေတာလုံခြုံရေး အထူးဂရုစိုက်သော Developer များ။' },
    pros: [
      { en: '100% open-source and customizable with local LLMs', my: 'လုံးဝ အခမဲ့ဖြစ်ပြီး Local LLM များနှင့် ချိတ်သုံးနိုင်ခြင်း' },
      { en: 'Works inside VS Code and JetBrains', my: 'VS Code နှင့် JetBrains တို့တွင် ထည့်သွင်းသုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires manual setup for local models', my: 'Local Model များအတွက် ကိုယ်တိုင် စနစ်ထည့်သွင်းရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free / Open Source ($0)', my: 'အခမဲ့ Open Source ($0)' },
    toolUrl: 'https://continue.dev'
  },
  {
    id: '58',
    title: 'Codeium',
    subtitle: 'Free AI Code Completion & Chat',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $15/mo',
    recommendFor: { en: 'Individual Developers & Students.', my: 'တစ်ကိုယ်တော် Developerများနှင့် ကျောင်းသားများ။' },
    pros: [
      { en: 'Generous free tier for individual developers', my: 'တစ်ကိုယ်တော်သုံးရန် အခမဲ့ ပလန်ကောင်းများ ပေးထားခြင်း' },
      { en: 'Supports 70+ programming languages', my: 'ပရိုဂရမ်ဘာသာစကား ၇၀ ကျော်ကို ထောက်ပံ့ပေးခြင်း' }
    ],
    cons: [
      { en: 'Enterprise features require paid upgrade', my: 'ကုမ္ပဏီအဆင့် လုပ်ချက်များအတွက် Paid Plan လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Teams ($15/user/mo)', my: 'အခမဲ့ ($0) | Teams ($15/တစ်ဦး/လ)' },
    toolUrl: 'https://codeium.com'
  },
  {
    id: '59',
    title: 'Supermaven',
    subtitle: 'Ultra-fast AI Code Completion',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $10/mo',
    recommendFor: { en: 'Developers Seeking Maximum Speed.', my: 'အမြန်နှုန်းကို အဓိကထားလိုသော Developer များ။' },
    pros: [
      { en: 'Blazing fast autocomplete responses with large context', my: 'Context ကြီးကြီးဖြင့် Code များကို အလွန်မြန်ဆန်စွာ ဖြည့်ပေးခြင်း' },
      { en: 'Minimal latency during active typing', my: 'စာရိုက်နေစဉ် နှောင့်နှေးမှု လုံးဝမရှိသလောက် နည်းပါးခြင်း' }
    ],
    cons: [
      { en: 'Focused primarily on autocomplete rather than chat', my: 'Chat ထက် Code ဖြည့်စွက်မှုကို ပိုမိုဦးတည်ထားခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($10/mo)', my: 'အခမဲ့ ($0) | Pro ($10/လ)' },
    toolUrl: 'https://supermaven.com'
  },
  {
    id: '60',
    title: 'Warp Terminal',
    subtitle: 'Modern Terminal with Built-in AI',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'DevOps Engineers & Terminal Users.', my: 'DevOps အင်ဂျင်နီယာများနှင့် Terminal သုံးလေ့ရှိသူများ။' },
    pros: [
      { en: 'AI command generation and error explanation', my: 'Terminal Command များကို AI ဖြင့် မေးမြန်းဖန်တီးနိုင်ခြင်း' },
      { en: 'Modern UI, collaborative notebooks and workflows', my: 'ခေတ်မီသော UI နှင့် အဖွဲ့လိုက်ချိတ်ဆက်မှုများ ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Requires account sign-in to use', my: 'အသုံးပြုရန် Account ဝင်ရောက်ရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Team ($15/user/mo)', my: 'အခမဲ့ ($0) | Team ($15/တစ်ဦး/လ)' },
    toolUrl: 'https://www.warp.dev'
  },
  {
    id: '61',
    title: 'Aider',
    subtitle: 'AI Command Line Pair Programming',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Open Source / Free',
    recommendFor: { en: 'Terminal-based Coders & Git Users.', my: 'Terminal ကို အဓိကသုံးပြီး Git ဖြင့် အလုပ်လုပ်သော Developer များ။' },
    pros: [
      { en: 'Directly edits git repository files with smart commits', my: 'Git ရိုပိုဇทรီဖိုင်များကို AI ကိုယ်တိုင် တိုက်ရိုက်တည်းဖြတ်ပေးခြင်း' },
      { en: 'Works with top models like Claude 3.5 Sonnet & GPT-4o', my: 'Claude နှင့် GPT-4o ကဲ့သို့ ထိပ်တန်းမော်ဒယ်များဖြင့် ချိတ်သုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Command line interface requires terminal familiarity', my: 'Command Line ဖြင့် သုံးရသဖြင့် ကျွမ်းကျင်ရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Open Source ($0) + API costs', my: 'Open Source ($0) + API သုံးစွဲခသာကျသင့်' },
    toolUrl: 'https://aider.chat'
  },
  {
    id: '62',
    title: 'Devin (Cognition AI)',
    subtitle: 'The First Autonomous AI Software Engineer',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Waitlist / Enterprise',
    recommendFor: { en: 'Engineering Leaders & Enterprise R&D.', my: 'ကုမ္ပဏီနည်းပညာ ဌာနခေါင်းဆောင်များနှင့် သုတေသီများ။' },
    pros: [
      { en: 'Plans, codes, debugs and deploys end-to-end applications', my: 'အစအဆုံး စဉ်းစား၊ ကုဒ်ရေး၊ Error ဖြေရှင်းပြီး App တင်နိုင်စွမ်းရှိခြင်း' },
      { en: 'Uses its own browser, shell and development environment', my: 'ကိုယ်ပိုင် Browser နှင့် Development ပတ်ဝန်းကျင်ကို သုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Restricted access and high enterprise cost', my: 'အသုံးပြုခွင့် ကန့်သတ်ထားပြီး ကုန်ကျစရိတ် ကြီးမားခြင်း' },
    ],
    pricing: { en: 'Enterprise Pricing (Waitlist)', my: 'ကုမ္ပဏီအလိုက် သီးသန့်ချိတ်ဆက်ရန်' },
    toolUrl: 'https://www.cognition.ai'
  },
  {
    id: '63',
    title: 'Plandex',
    subtitle: 'Terminal-based AI Coding Engine for Large Projects',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Open Source / Paid',
    recommendFor: { en: 'Full-stack Engineers handling large codebases.', my: 'ကုဒ်ဖိုင်ကြီးများကို ကိုင်တွယ်ရသော Full-stack အင်ဂျင်နီယာများ။' },
    pros: [
      { en: 'Handles massive multi-file refactoring securely', my: 'ဖိုင်များစွာပါဝင်သော ရှုပ်ထွေးသည့် ပြင်ဆင်မှုများကို လုံခြုံစွာလုပ်ဆောင်ခြင်း' },
      { en: 'Full control over context and planning steps', my: 'Context နှင့် လုပ်ဆောင်မည့် အဆင့်များကို အပြည့်အစုံ ထိန်းချုပ်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Command-line tool requiring setup', my: 'Command-line ဖြင့် စနစ်ထည့်သွင်းရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Open Source Free | Cloud options', my: 'Open Source အခမဲ့ | Cloud ပလန်များရှိသည်' },
    toolUrl: 'https://plandex.ai'
  },
  {
    id: '64',
    title: 'Sourcegraph Cody',
    subtitle: 'AI Coding Assistant with Deep Codebase Context',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $9/mo',
    recommendFor: { en: 'Enterprise Developers & Large Teams.', my: 'ကုမ္ပဏီကြီးများနှင့် အဖွဲ့လိုက် Developer များ။' },
    pros: [
      { en: 'Understands entire enterprise repositories and dependencies', my: 'ကုမ္ပဏီတွင်း ကုဒ်ဖိုင်အားလုံးနှင့် မှီခိုမှုများကို နားလည်ခြင်း' },
      { en: 'Accurate codebase-wide answers and refactoring', my: 'ကုဒ်တစ်ခွင်လုံးအတွက် တိကျသော အဖြေများနှင့် ပြင်ဆင်ချက်များပေးခြင်း' }
    ],
    cons: [
      { en: 'Initial codebase indexing takes time for large repos', my: 'ဖိုင်ကြီးများအတွက် ပထမအကြိမ် Index လုပ်ရန် အချိန်အနည်းငယ်ယူခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($9/mo)', my: 'အခမဲ့ ($0) | Pro ($9/လ)' },
    toolUrl: 'https://sourcegraph.com/cody'
  },
  {
    id: '65',
    title: 'Qodo (formerly CodiumAI)',
    subtitle: 'AI Code Integrity & Test Generation',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'QA Engineers & Quality-focused Developers.', my: 'QA အင်ဂျင်နီယာများနှင့် ကုဒ်အရည်အသွေး အထူးစစ်ဆေးသူများ။' },
    pros: [
      { en: 'Automatically generates meaningful unit tests and checks', my: 'အဓိပ္ပာယ်ပြည့်ဝသော Unit Test များကို အလိုအလျောက် ရေးသားဖန်တီးပေးခြင်း' },
      { en: 'Analyzes code logic to prevent edge-case bugs', my: 'Code Logic ကို စစ်ဆေးပြီး ဖြစ်နိုင်ချေရှိသော Error များကို ကြိုတင်ကာကွယ်ခြင်း' }
    ],
    cons: [
      { en: 'Requires review of generated test cases', my: 'ထုတ်ပေးလာသော Test များကို သေချာ ပြန်လည်စစ်ဆေးရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free tier | Pro plans available', my: 'အခမဲ့ ပလန်ပါရှိ | Pro ပလန်များ ရှိသည်' },
    toolUrl: 'https://www.qodo.ai'
  },
  {
    id: '66',
    title: 'Amazon Q Developer',
    subtitle: 'AWS Cloud & Code Assistant',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free Tier / Paid',
    recommendFor: { en: 'AWS Cloud Engineers & Enterprise Devs.', my: 'AWS Cloud အင်ဂျင်နီယာများနှင့် ကော်ပိုရိတ် Developer များ။' },
    pros: [
      { en: 'Expert guidance on AWS architecture and deployments', my: 'AWS Cloud တည်ဆောက်ပုံနှင့် Server တင်ခြင်းအတွက် ကျွမ်းကျင်စွာ လမ်းညွှန်ပေးခြင်း' },
      { en: 'Security scans and automated code transformations', my: 'လုံခြုံရေး စစ်ဆေးမှုများနှင့် ကုဒ်အဟောင်းများကို အဆင့်မြှင့်တင်ပေးခြင်း' }
    ],
    cons: [
      { en: 'Optimized primarily for AWS ecosystem', my: 'AWS Cloud ပလက်ဖောင်းကို အဓိက ဦးတည်ထားခြင်း' }
    ],
    pricing: { en: 'Free tier | Pro ($19/user/mo)', my: 'အခမဲ့ ရရှိနိုင် | Pro ($19/တစ်ဦး/လ)' },
    toolUrl: 'https://aws.amazon.com/q/developer/'
  },
  {
    id: '67',
    title: 'Google Cloud Gemini Code Assist',
    subtitle: 'AI Coding Assistant for Google Cloud',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Paid Subscription',
    recommendFor: { en: 'Google Cloud Developers & Enterprise Teams.', my: 'Google Cloud သုံးစွဲသော Developer များ။' },
    pros: [
      { en: 'Deep integration with Google Cloud infrastructure', my: 'Google Cloud စနစ်များနှင့် အပြည့်အဝ ချိတ်ဆက်အလုပ်လုပ်ခြင်း' },
      { en: 'Large context window for complex enterprise codebases', my: 'ကုဒ်ဖိုင်ကြီးများကို Context အပြည့်အစုံဖြင့် ဖြေရှင်းပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires Google Cloud enterprise account setup', my: 'Google Cloud အကောင့် စနစ်ထည့်သွင်းရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Standard enterprise pricing', my: 'ကုမ္ပဏီအလိုက် သတ်မှတ်ထားသော ဈေးနှုန်း' },
    toolUrl: 'https://cloud.google.com/products/gemini/code-assist'
  },
  {
    id: '68',
    title: 'JetBrains AI Assistant',
    subtitle: 'Built-in AI for IntelliJ, PyCharm & WebStorm',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    pricingType: '$10/mo',
    recommendFor: { en: 'JetBrains IDE Users & Enterprise Developers.', my: 'JetBrains IDE သုံးစွဲသူများနှင့် Developer များ။' },
    pros: [
      { en: 'Native integration across all JetBrains IDEs', my: 'JetBrains IDE အားလုံးတွင် အလွယ်တကူ ထည့်သွင်းအသုံးပြုနိုင်ခြင်း' },
      { en: 'Smart refactoring, documentation generation and chat', my: 'ကုဒ်များကို စမတ်ကျကျ ပြင်ဆင်ခြင်း၊ စာရွက်စာတမ်းထုတ်ပေးခြင်းများ ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Requires active JetBrains IDE subscription', my: 'JetBrains IDE ပလန် ဝယ်ယူထားရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: '$10 per user per month', my: 'တစ်ဦးလျှင် တစ်လလျှင် $10' },
    toolUrl: 'https://www.jetbrains.com/ai/'
  },
  {
    id: '69',
    title: 'SonarQube AI Code Quality',
    subtitle: 'Automated Code Quality & Clean Code AI',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Freemium / Paid',
    recommendFor: { en: 'DevOps & Software Quality Leads.', my: 'DevOps နှင့် ကုဒ်အရည်အသွေး စစ်ဆေးသူများ။' },
    pros: [
      { en: 'Detects code smells, bugs and security hotspots', my: 'ကုဒ်အမှားများ၊ လုံခြုံရေး အားနည်းချက်များကို တိကျစွာ ရှာဖွေဖော်ထုတ်ပေးခြင်း' },
      { en: 'Enforces clean code standards across teams', my: 'အဖွဲ့လိုက် ကုဒ်စံနှုန်းများကို တသမတ်တည်း ထိန်းသိမ်းပေးခြင်း' }
    ],
    cons: [
      { en: 'Can generate strict warnings on legacy codebases', my: 'ကုဒ်အဟောင်းများတွင် သတိပေးချက် အများအပြား ထွက်လာနိုင်ခြင်း' }
    ],
    pricing: { en: 'Free for open source | Paid developer plans', my: 'Open Source အတွက် အခမဲ့ | Paid ပလန်များရှိသည်' },
    toolUrl: 'https://www.sonarsource.com'
  },
  {
    id: '70',
    title: 'Snyk Code',
    subtitle: 'AI-Powered Security Vulnerability Fixer',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Cybersecurity Engineers & Developers.', my: 'ဆိုက်ဘာလုံခြုံရေး အင်ဂျင်နီယာများနှင့် Developer များ။' },
    pros: [
      { en: 'Scans and fixes security vulnerabilities in real time', my: 'လုံခြုံရေး အားနည်းချက်များကို အချိန်နှင့်တပြေးညီ ရှာဖွေပြီး ပြင်ဆင်ပေးခြင်း' },
      { en: 'Integrates into IDEs, CI/CD pipelines and GitHub', my: 'IDE များနှင့် GitHub CI/CD ထဲတွင် တိုက်ရိုက်ချိတ်ဆက်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Advanced vulnerability reports require paid tiers', my: 'အဆင့်မြင့် လုံခြုံရေး အစီရင်ခံစာများအတွက် Paid Plan လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free tier | Team plans from $25/mo', my: 'အခမဲ့ ပလန်ပါရှိ | Team ပလန် $25/လ မှစတင်' },
    toolUrl: 'https://snyk.io'
  },
  {
    id: '71',
    title: 'Postman AI',
    subtitle: 'API Testing & Generation Assistant',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Backend Engineers & API Developers.', my: 'Backend အင်ဂျင်နီယာများနှင့် API တည်ဆောက်သူများ။' },
    pros: [
      { en: 'Generates API test scripts and documentation automatically', my: 'API Test Script များနှင့် Document များကို အလိုအလျောက် ဖန်တီးပေးခြင်း' },
      { en: 'Explains complex API requests and responses', my: 'ရှုပ်ထွေးသော API တောင်းဆိုချက်များကို ရှင်းလင်းပြသပေးခြင်း' }
    ],
    cons: [
      { en: 'AI features restricted by monthly limits on free plan', my: 'အခမဲ့ ပလန်တွင် AI သုံးစွဲမှု အကန့်အသတ်ရှိခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Basic ($14/mo)', my: 'အခမဲ့ ($0) | Basic ($14/လ)' },
    toolUrl: 'https://www.postman.com'
  },
  {
    id: '72',
    title: 'Bruno AI Assistant',
    subtitle: 'Open-Source API Client with AI Features',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Open Source',
    recommendFor: { en: 'API Developers & Open Source Advocates.', my: 'API Developer များနှင့် Open Source ကြိုက်နှစ်သက်သူများ။' },
    pros: [
      { en: 'Lightning-fast offline-first API testing client', my: 'အလွန်မြန်ဆန်ပြီး Offline ဖြင့် အဓိကအလုပ်လုပ်သော API Client ဖြစ်ခြင်း' },
      { en: 'Plain text collection format stored in git easily', my: 'Git တွင် လွယ်ကူစွာ သိမ်းဆည်းနိုင်သော ဖိုင်ပုံစံဖြစ်ခြင်း' }
    ],
    cons: [
      { en: 'Smaller ecosystem compared to Postman', my: 'Postman လောက် Ecosystem မကြီးမားသေးခြင်း' }
    ],
    pricing: { en: 'Free / Open Source ($0)', my: 'အခမဲ့ Open Source ($0)' },
    toolUrl: 'https://www.usebruno.com'
  },
  {
    id: '73',
    title: 'Insomnia AI',
    subtitle: 'Collaborative API Design & Testing Platform',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'API Designers & Full-stack Teams.', my: 'API ဒီဇိုင်နာများနှင့် Full-stack အဖွဲ့များ။' },
    pros: [
      { en: 'Clean interface for designing and mocking APIs', my: 'API ဒီဇိုင်းဆွဲရန်နှင့် Mock လုပ်ရန် သန့်ရှင်းလွယ်ကူသော UI ရှိခြင်း' },
      { en: 'AI-assisted query generation and debugging', my: 'AI ဖြင့် Query များဖန်တီးခြင်းနှင့် Error ရှာဖွေခြင်းများ ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Some advanced collaboration features need paid plan', my: 'အဆင့်မြင့် အဖွဲ့လိုက်သုံး လုပ်ချက်များအတွက် Paid Plan လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Plus ($15/mo)', my: 'အခမဲ့ ($0) | Plus ($15/လ)' },
    toolUrl: 'https://insomnia.rest'
  },
  {
    id: '74',
    title: 'Docker AI',
    subtitle: 'Containerization & Dockerfile Assistant',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Included in Docker Subscriptions',
    recommendFor: { en: 'DevOps & Container Engineers.', my: 'DevOps နှင့် Container စီမံခန့်ခွဲသူများ။' },
    pros: [
      { en: 'Generates optimized Dockerfiles and Compose files instantly', my: 'Dockerfiles နှင့် Compose ဖိုင်များကို အကောင်းဆုံးပုံစံဖြင့် ဖန်တီးပေးခြင်း' },
      { en: 'Diagnoses container errors and security warnings', my: 'Container Error များနှင့် လုံခြုံရေးသတိပေးချက်များကို ရှာဖွေဖော်ထုတ်ပေးခြင်း' }
    ],
    cons: [
      { en: 'Requires Docker Desktop subscription for full features', my: 'လုပ်ဆောင်ချက်အပြည့်အစုံသုံးရန် Docker Desktop ပလန်လိုခြင်း' }
    ],
    pricing: { en: 'Included in Pro / Team Docker plans', my: 'Docker Pro နှင့် Team ပလန်များတွင် ပါဝင်ပြီး' },
    toolUrl: 'https://www.docker.com'
  },
  {
    id: '75',
    title: 'Kubernetes AI Copilot',
    subtitle: 'Cluster Management & K8s Assistant',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Freemium / Paid',
    recommendFor: { en: 'Cloud Architects & K8s Operators.', my: 'Cloud Architect များ၊ Kubernetes စီမံခန့်ခွဲသူများ။' },
    pros: [
      { en: 'Natural language queries for Kubernetes cluster states', my: 'Kubernetes Cluster အခြေအနေများကို သာမန်စာသားဖြင့် မေးမြန်းစစ်ဆေးနိုင်ခြင်း' },
      { en: 'Automated pod troubleshooting and log analysis', my: 'Pod အမှားများကို အလိုအလျောက် ရှာဖွေပြီး Log များကို စစ်ဆေးပေးခြင်း' }
    ],
    cons: [
      { en: 'Requires cluster access permissions and setup', my: 'Cluster ဝင်ရောက်ခွင့် အာဏာနှင့် စနစ်ထည့်သွင်းရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free tier | Enterprise pricing', my: 'အခမဲ့ ပလန်ပါရှိ | ကုန်ကျစရိတ်မှာ အဖွဲ့အလိုက်ရှိသည်' },
    toolUrl: 'https://kubernetes.io'
  },
  {
    id: '76',
    title: 'Midjourney v6',
    subtitle: 'High-End Generative AI Art & Imagery',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    pricingType: '$10 - $120/mo',
    recommendFor: { en: 'Digital Artists, Concept Designers & Marketers.', my: 'ဒီဂျစ်တယ် အနုပညာရှင်များနှင့် ကွန်စက်ဒီဇိုင်နာများ။' },
    pros: [
      { en: 'Stunning, photorealistic image quality and lighting', my: 'ဓာတ်ပုံအစစ်နှင့် ခွဲမရအောင် ရုပ်ထွက်လှပပြီး အလင်းအမှောင် လက်ရာကောင်းမွန်ခြင်း' },
      { en: 'Advanced style reference and parameter controls', my: 'စတိုင်လ်ပုံစံတူယူခြင်းနှင့် အဆင့်မြင့် ကန့်သတ်ချက်များ ထိန်းချုပ်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires Discord account or web app subscription', my: 'Discord အကောင့် (သို့မဟုတ်) Web App ပလန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Basic ($10/mo) | Pro ($60/mo)', my: 'Basic ($10/လ) | Pro ($60/လ)' },
    toolUrl: 'https://www.midjourney.com'
  },
  {
    id: '77',
    title: 'DALL-E 3 (OpenAI)',
    subtitle: 'Prompt-Accurate Generative Image Model',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Included in ChatGPT Plus',
    recommendFor: { en: 'Content Creators, Writers & General Users.', my: 'Content ရေးသားသူများနှင့် အထွေထွေ အသုံးပြုသူများ။' },
    pros: [
      { en: 'Exceptional text rendering and complex prompt adherence', my: 'ပုံထဲတွင် စာသားများကို စာလုံးပေါင်းမှန်ကန်စွာ ရေးဆွဲပေးနိုင်ခြင်း' },
      { en: 'Seamless integration inside ChatGPT conversational UI', my: 'ChatGPT ချက်တင်စနစ်အတွင်း တိုက်ရိုက် အလွယ်တကူ သုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Less stylistic control compared to Midjourney', my: 'Midjourney လောက် စတိုင်လ်အမျိုးမျိုး စိတ်ကြိုက်ညှိရန် မလွယ်ကူခြင်း' }
    ],
    pricing: { en: 'Included in ChatGPT Plus ($20/mo)', my: 'ChatGPT Plus ($20/လ) တွင် ပူးတွဲပါဝင်ပြီး' },
    toolUrl: 'https://openai.com/dall-e-3'
  },
  {
    id: '78',
    title: 'Runway Gen-3 Alpha',
    subtitle: 'Cinematic AI Video Generation Studio',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $15 - $95/mo',
    recommendFor: { en: 'Filmmakers, Directors & Video Producers.', my: 'ရုပ်ရှင်ရိုက်ကူးသူများနှင့် ဗီဒီယို ထုတ်လုပ်သူများ။' },
    pros: [
      { en: 'Cinematic movement, camera controls and high realism', my: 'ရုပ်ရှင်ဆန်သော ကင်မရာလှုပ်ရှားမှုနှင့် အလွန်လက်တွေ့ကျသော ဗီဒီယိုထွက်ရှိခြင်း' },
      { en: 'Text-to-video and image-to-video transformations', my: 'စာသားနှင့် ပုံများကို အခြေခံ၍ ဗီဒီယိုဖန်တီးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'High generation cost for long video sequences', my: 'ဗီဒီယိုအရှည်အတွက် Credit ကုန်ကျစရိတ် ကြီးမားခြင်း' }
    ],
    pricing: { en: 'Free credits | Standard ($15/mo)', my: 'အခမဲ့ Credit ပါရှိ | Standard ($15/လ)' },
    toolUrl: 'https://runwayml.com'
  },
  {
    id: '79',
    title: 'Luma Dream Machine',
    subtitle: 'Fast 3D & Realistic AI Video Generator',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Video Creators & 3D Animators.', my: 'ဗီဒီယို ဖန်တီးရှင်များနှင့် 3D Animators များ။' },
    pros: [
      { en: 'Rapid video generation with high frame consistency', my: 'ဘောင်ဆက်စပ်မှု ကောင်းမွန်ပြီး မြန်ဆန်စွာ ဗီဒီယိုထုတ်ပေးခြင်း' },
      { en: 'Excellent physics simulation and camera motions', my: 'ရုပ်ပိုင်းဆိုင်ရာ ရွေ့လျားမှုများနှင့် ကင်မရာပုံစံများ အလွန်သဘာဝကျခြင်း' }
    ],
    cons: [
      { en: 'Free tier has generation queues during peak hours', my: 'အသုံးပြုသူ များချိန်တွင် အခမဲ့ဗားရှင်း စောင့်ဆိုင်းရတတ်ခြင်း' }
    ],
    pricing: { en: 'Free tier | Pro from $29.99/mo', my: 'အခမဲ့ ပလန်ပါရှိ | Pro ($29.99/လ မှစတင်)' },
    toolUrl: 'https://lumalabs.ai/dream-machine'
  },
  {
    id: '80',
    title: 'Kling AI',
    subtitle: 'Advanced AI Video Generation Model',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Creative Directors & Content Creators.', my: 'ဖန်တီးမှုဆိုင်ရာ ဒါရိုက်တာများနှင့် Content ဖန်တီးရှင်များ။' },
    pros: [
      { en: 'Generates up to 10-second high definition video clips', my: 'စက္ကန့် ၁၀ ထိရှည်လျားသော အရည်အသွေးမြင့် ဗီဒီယိုများကို ထုတ်လုပ်ပေးခြင်း' },
      { en: 'Complex human motion and interaction handling', my: 'ရှုပ်ထွေးသော လူသားလှုပ်ရှားမှုများကို ကောင်းမွန်စွာ ကိုင်တွယ်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Website traffic can cause slow generation times', my: 'ဆာဗာပွတ်အား များချိန်တွင် ထုတ်လုပ်မှု အနည်းငယ် နှေးခြင်း' }
    ],
    pricing: { en: 'Free daily credits | Paid plans available', my: 'နေ့စဉ် အခမဲ့ Credit ရရှိ | Paid ပလန်များရှိသည်' },
    toolUrl: 'https://klingai.com'
  },
  {
    id: '81',
    title: 'Pika Labs',
    subtitle: 'AI Video Creation & Animation Tool',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Paid',
    recommendFor: { en: 'Animators, Social Media Marketers & Artists.', my: 'Animation ဆွဲသူများနှင့် ဆိုရှယ်မီဒီယာ Marketer များ။' },
    pros: [
      { en: 'Specialized sound effects and video modification features', my: 'ဗီဒီယိုနှင့် လိုက်ဖက်သော အသံဖန်တီးမှုနှင့် ပြင်ဆင်ချက်များ ပါရှိခြင်း' },
      { en: 'Easy-to-use web interface for quick animations', my: 'အသုံးပြုရလွယ်ကူသော Web UI ဖြင့် Animation များ အမြန်လုပ်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Video resolution limits on free plans', my: 'အခမဲ့ ပလန်တွင် ဗီဒီယို ရုပ်ထွက် အကန့်အသတ်ရှိခြင်း' }
    ],
    pricing: { en: 'Free tier | Pro ($10/mo)', my: 'အခမဲ့ ပလန်ပါရှိ | Pro ($10/လ)' },
    toolUrl: 'https://pika.art'
  },
  {
    id: '82',
    title: 'ElevenLabs',
    subtitle: 'Ultra-Realistic AI Voice Generator & Cloner',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $5 - $99/mo',
    recommendFor: { en: 'Audiobook Narrators, Podcasters & Game Studios.', my: 'Audiobook ဖတ်သူများ၊ Podcast လုပ်သူများနှင့် ဂိမ်းစတူဒီယိုများ။' },
    pros: [
      { en: 'Indistinguishable from real human speech with emotional depth', my: 'ခံစားချက်အပြည့်အစုံပါရှိပြီး လူအစစ်အသံအတိုင်း ကွဲပြားမှုမရှိခြင်း' },
      { en: 'Voice cloning and multilingual dubbing capabilities', my: 'အသံကူးယူခြင်း (Voice Cloning) နှင့် ဘာသာစကားမျိုးစုံသို့ အသံသွင်းခြင်း' }
    ],
    cons: [
      { en: 'Character limits apply monthly on all tiers', my: 'လစဉ် အသုံးပြုနိုင်သော စာလုံးရေ အကန့်အသတ်ရှိခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Starter ($5/mo) | Creator ($22/mo)', my: 'အခမဲ့ ($0) | Starter ($5/လ) | Creator ($22/လ)' },
    toolUrl: 'https://elevenlabs.io'
  },
  {
    id: '83',
    title: 'Suno AI',
    subtitle: 'Generative AI Song & Music Creator',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $10 - $24/mo',
    recommendFor: { en: 'Songwriters, Musicians & Content Creators.', my: 'သီချင်းရေးဆရာများ၊ တေးစီးရီးဖန်တီးသူများနှင့် Content ဖန်တီးရှင်များ။' },
    pros: [
      { en: 'Creates full radio-quality songs with vocals and instruments from prompts', my: 'စာသားညွှန်ကြားချက်ဖြင့် အဆိုသံနှင့် တူရိယာများပါဝင်သော သီချင်းအပြည့်အစုံ ဖန်တီးပေးခြင်း' },
      { en: 'Supports multiple genres, custom lyrics and styles', my: 'ဂီတအမျိုးအစားစုံလင်စွာ၊ ကိုယ်ပိုင်စာသားများနှင့် စတိုင်လ်များ ရွေးချယ်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Commercial ownership requires paid subscription plans', my: 'စီးပွားဖြစ် မူပိုင်ခွင့်ရရန် Paid Plan ဝယ်ယူထားရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free (50 credits/day) | Pro ($10/mo)', my: 'အခမဲ့ (နေ့စဉ် 50 credits) | Pro ($10/လ)' },
    toolUrl: 'https://suno.ai'
  },
  {
    id: '84',
    title: 'Udio',
    subtitle: 'High-Fidelity AI Music Composition Platform',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $10 - $30/mo',
    recommendFor: { en: 'Musicians, Producers & Audio Artists.', my: 'တေးဂီတ ဖန်တီးသူများနှင့် အသံပိုင်းဆိုင်ရာ အနုပညာရှင်များ။' },
    pros: [
      { en: 'Stunning audio fidelity and intricate musical arrangement', my: 'အလွန်ကောင်းမွန်သော အသံအရည်အသွေးနှင့် ရှုပ်ထွေးဆန်းကြယ်သော တေးသွားစီစဉ်မှုများ' },
      { en: 'Advanced audio extension and remixing controls', my: 'သီချင်းအရှည်တိုးခြင်းနှင့် Remix ပြုလုပ်သည့် လုပ်ဆောင်ချက်များ ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Generation queue can take moments during high demand', my: 'အသုံးပြုသူများသည့်အခါ သီချင်းထုတ်လုပ်ရန် အနည်းငယ်စောင့်ရခြင်း' }
    ],
    pricing: { en: 'Free tier | Standard ($10/mo)', my: 'အခမဲ့ ပလန်ပါရှိ | Standard ($10/လ)' },
    toolUrl: 'https://www.udio.com'
  },
  {
    id: '85',
    title: 'Topaz Labs Video AI',
    subtitle: 'AI Video Upscaling & Enhancement Software',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    pricingType: '$299 (One-time purchase)',
    recommendFor: { en: 'Videographers, Archivists & Film Studios.', my: 'ဗီဒီယို ရိုက်ကူးသူများနှင့် ရုပ်ရှင်ထိန်းသိမ်းရေး အဖွဲ့အစည်းများ။' },
    pros: [
      { en: 'Upscales low-res footage to pristine 4K/8K with AI interpolation', my: 'အရည်အသွေးနိမ့် ဗီဒီယိုများကို 4K/8K အထိ ရှင်းလင်းစွာ မြှင့်တင်ပေးခြင်း' },
      { en: 'Removes motion blur, noise and stabilizes shaky videos', my: 'ဗီဒီယို တုန်ခါမှုများကို ပြင်ဆင်ပေးပြီး အသန့်ရှင်းဆုံး ရုပ်ထွက်ဖန်တီးပေးခြင်း' }
    ],
    cons: [
      { en: 'Requires a powerful dedicated GPU on computer', my: 'ကွန်ပျူတာတွင် စွမ်းရည်မြင့် GPU ကတ် မဖြစ်မနေ လိုအပ်ခြင်း' }
    ],
    pricing: { en: '$299 license fee (Lifetime updates)', my: '$299 (တစ်ကြိမ်ဝယ်ယူရုံဖြင့် အမြဲတမ်းသုံးနိုင်)' },
    toolUrl: 'https://www.topazlabs.com/topaz-video-ai'
  },
  {
    id: '86',
    title: 'Krea AI',
    subtitle: 'Real-time AI Image Generation & Enhancement',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $30/mo',
    recommendFor: { en: 'Digital Artists & Illustrators.', my: 'ဒီဂျစ်တယ် အနုပညာရှင်များနှင့် ပုံဆွဲဖန်တီးသူများ။' },
    pros: [
      { en: 'Generates and transforms images in real-time as you draw', my: 'သင်ပုံဆွဲနေစဉ်မှာပင် ဓာတ်ပုံ သို့မဟုတ် ပုံစံအဖြစ် အချိန်နှင့်တပြေးညီ ပြောင်းလဲပေးခြင်း' },
      { en: 'Powerful AI upscaler and enhancer with custom models', my: 'ပုံများကို အသေးစိတ်ရှင်းလင်းစေရန် AI ဖြင့် မြှင့်တင်ပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Real-time features require stable internet connection', my: 'အချိန်နှင့်တပြေးညီ လုပ်ဆောင်ချက်များအတွက် အင်တာနက်ကောင်းရန်လိုခြင်း' }
    ],
    pricing: { en: 'Free tier | Pro ($30/mo)', my: 'အခမဲ့ ပလန်ပါရှိ | Pro ($30/လ)' },
    toolUrl: 'https://www.krea.ai'
  },
  {
    id: '87',
    title: 'Recraft.ai',
    subtitle: 'AI Vector Art, Illustrations & Brand Designs',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $20/mo',
    recommendFor: { en: 'Graphic Designers & Brand Strategists.', my: 'ဂရပ်ဖစ် ဒီဇိုင်နာများနှင့် Brand တည်ဆောက်သူများ။' },
    pros: [
      { en: 'Creates clean vector art, SVGs and consistent brand palettes', my: 'သန့်ရှင်းသော Vector Art၊ SVG ဖိုင်များနှင့် Brand အရောင်စုံများကို ဖန်တီးပေးခြင်း' },
      { en: 'Infinite canvas and precise style controls', my: 'အကန့်အသတ်မရှိသော Canvas ပေါ်တွင် စတိုင်လ်များ စိတ်ကြိုက်ညှိနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Advanced vector export options need paid tier', my: 'အဆင့်မြင့် Vector Export များအတွက် Paid Plan လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($20/mo)', my: 'အခမဲ့ ($0) | Pro ($20/လ)' },
    toolUrl: 'https://recraft.ai'
  },
  {
    id: '88',
    title: 'Magnific AI',
    subtitle: 'AI Image Upscaler & Detail Enhancer',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    pricingType: '$39 - $299/mo',
    recommendFor: { en: 'Professional Photographers & Digital Artists.', my: 'ပရော်ဖက်ရှင်နယ် ဓာတ်ပုံဆရာများနှင့် အနုပညာရှင်များ။' },
    pros: [
      { en: 'Incredible AI upscaling that hallucinates realistic textures and details', my: 'ပုံများကို ကြီးမားထင်ရှားစေရုံသာမက အသေးစိတ်အမွှေးအမျှင်/အသွင်အပြင်များကိုပါ အထူးဖန်တီးပေးခြင်း' },
      { en: 'Control over creativity slider during upscaling', my: 'Upscale လုပ်နေစဉ် Creativity ပမာဏကို စိတ်ကြိုက်ညှိနှိုင်းနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Very expensive subscription pricing for casual users', my: 'သာမန်သုံးစွဲသူများအတွက် လစဉ်ကြေး ဈေးနှုန်းအလွန်မြင့်မားခြင်း' }
    ],
    pricing: { en: 'Pro ($39/mo) | Premium ($99/mo)', my: 'Pro ($39/လ) | Premium ($99/လ)' },
    toolUrl: 'https://magnific.ai'
  },
  {
    id: '89',
    title: 'Photoroom',
    subtitle: 'AI Background Remover & Product Photography',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $9.99/mo',
    recommendFor: { en: 'E-commerce Sellers & Online Shop Owners.', my: 'အွန်လိုင်းစျေးသည်များနှင့် E-commerce လုပ်ကိုင်သူများ။' },
    pros: [
      { en: 'Instant professional product background removal and replacement', my: 'ကုန်ပစ္စည်းပုံများ၏ နောက်ခံကို တစ်စက္ကန့်အတွင်း ဖယ်ရှားပြီး လှပစွာ အစားထိုးပေးခြင်း' },
      { en: 'AI lighting and shadow generation for realistic product shots', my: 'ပစ္စည်းပုံများနှင့် လိုက်ဖက်သော အလင်းနှင့် အရိပ်များကို AI ဖြင့် ဖန်တီးပေးခြင်း' }
    ],
    cons: [
      { en: 'Watermark on lower free exports', my: 'အခမဲ့ဗားရှင်းတွင် Watermark ပါရှိခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($9.99/mo)', my: 'အခမဲ့ ($0) | Pro ($9.99/လ)' },
    toolUrl: 'https://www.photoroom.com'
  },
  {
    id: '90',
    title: 'Clipdrop by Jasper',
    subtitle: 'AI Ecosystem for Photos & Image Editing',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $10/mo',
    recommendFor: { en: 'Photographers & E-commerce Content Creators.', my: 'ဓာတ်ပုံဆရာများနှင့် အွန်လိုင်း Content ဖန်တီးသူများ။' },
    pros: [
      { en: 'Uncrop, relight, remove objects and upscale in one suite', my: 'ပုံချဲ့ခြင်း၊ အလင်းပြင်ခြင်း၊ ပစ္စည်းဖယ်ရှားခြင်းများကို တစ်နေရာတည်းတွင် လုပ်နိုင်ခြင်း' },
      { en: 'Seamless mobile apps and web plugins', my: 'ဖုန်းအက်ပ်များနှင့် Web Plugin များဖြင့် အလွယ်တကူသုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Monthly credit limits on pro features', my: 'Pro လုပ်ဆောင်ချက်များအတွက် လစဉ် Credit အကန့်အသတ်ရှိခြင်း' }
    ],
    pricing: { en: 'Free tier | Pro ($10/mo)', my: 'အခမဲ့ ပလန်ပါရှိ | Pro ($10/လ)' },
    toolUrl: 'https://clipdrop.co'
  },
  {
    id: '91',
    title: 'Looka',
    subtitle: 'AI Logo Maker & Brand Identity Builder',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Pay per logo / Brand kit',
    recommendFor: { en: 'Startup Founders & Small Business Owners.', my: 'Startup လုပ်ငန်းရှင်များနှင့် အသေးစားလုပ်ငန်း တည်ထောင်သူများ။' },
    pros: [
      { en: 'Generates hundreds of custom logo concepts based on preferences', my: 'နှစ်သက်ရာ ပုံစံများကို အခြေခံ၍ လိုဂိုဒီဇိုင်း ရာပေါင်းများစွာ ထုတ်ပေးခြင်း' },
      { en: 'Complete brand kit with business cards, social media assets', my: 'Business Card နှင့် ဆိုရှယ်မီဒီယာပုံစံများပါဝင်သော Brand Kit ဖန်တီးပေးခြင်း' }
    ],
    cons: [
      { en: 'High-res vector files require purchase payment', my: 'အရည်အသွေးမြင့် Vector ဖိုင်များ ဒေါင်းလုဒ်ဆွဲရန် ငွေပေးချေရန်လိုခြင်း' }
    ],
    pricing: { en: 'Logo packages from $20', my: 'လိုဂို ပက်ကေ့ချ်များ $20 မှစတင်' },
    toolUrl: 'https://looka.com'
  },
  {
    id: '92',
    title: 'Wannabe AI / Wix ADI',
    subtitle: 'AI Website Builder & Designer',
    category: 'Productivity',
    coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Subscription Plans',
    recommendFor: { en: 'Small Business Owners & Freelancers.', my: 'အသေးစား လုပ်ငန်းရှင်များနှင့် Freelance လုပ်ကိုင်သူများ။' },
    pros: [
      { en: 'Builds full functional websites through simple chat prompts', my: 'ရိုးရှင်းသော Chat ဖြင့် မေးမြန်းညွှန်ကြားရုံဖြင့် ဝဘ်ဆိုဒ်အပြည့်အစုံ တည်ဆောက်ပေးခြင်း' },
      { en: 'Automated hosting, mobile responsiveness and SEO setup', my: 'Hosting တင်ခြင်း၊ ဖုန်းနှင့်ကိုက်ညီစေခြင်းနှင့် SEO ပြင်ဆင်မှုများ အလိုအလျောက်ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Custom code edits can be limited compared to traditional coding', my: 'သာမန် Code ရေးသည်လောက် စိတ်ကြိုက်ပြင်ဆင်မှု အကန့်အသတ်ရှိခြင်း' }
    ],
    pricing: { en: 'Plans from $16/mo', my: 'လစဉ်ကြေး $16 မှစတင်' },
    toolUrl: 'https://www.wix.com'
  },
  {
    id: '93',
    title: 'Framer AI',
    subtitle: 'AI Website Designer & Publisher',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $5 - $30/mo',
    recommendFor: { en: 'UI/UX Designers & Landing Page Creators.', my: 'UI/UX ဒီဇိုင်နာများနှင့် Landing Page ဖန်တီးသူများ။' },
    pros: [
      { en: 'Generates stunning, animated landing pages from text prompts', my: 'စာသားဖြင့် ညွှန်ကြားရုံဖြင့် လှပပြီး Animation ပါသော Landing Page များ ဖန်တီးပေးခြင်း' },
      { en: 'Publish directly with custom domains instantly', my: 'ကိုယ်ပိုင် Domain ဖြင့် ချက်ချင်း Live တင်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Complex web applications require React/Next.js instead', my: 'ရှုပ်ထွေးသော Web App များအတွက် Framer ထက် Next.js ပိုမိုသင့်တော်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Mini ($5/mo) | Pro ($30/mo)', my: 'အခမဲ့ ($0) | Mini ($5/လ) | Pro ($30/လ)' },
    toolUrl: 'https://www.framer.com'
  },
  {
    id: '94',
    title: 'Relume AI',
    subtitle: 'AI Sitemap & Wireframe Builder for Web Design',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $32/mo',
    recommendFor: { en: 'Web Designers, Agencies & Product Managers.', my: 'ဝဘ်ဒီဇိုင်နာများနှင့် Agency များ။' },
    pros: [
      { en: 'Generates complete website sitemaps and wireframes instantly', my: 'ဝဘ်ဆိုဒ် Sitemap နှင့် Wireframe များကို စက္ကန့်ပိုင်းအတွင်း တည်ဆောက်ပေးခြင်း' },
      { en: 'Exportable directly to Figma and Webflow', my: 'Figma နှင့် Webflow သို့ တိုက်ရိုက် Export ထုတ်နိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Focused primarily on layout planning rather than final graphics', my: 'ဒီဇိုင်းအလှထက် Layout နှင့် Structure ပိုင်းကို အဓိကဦးတည်ခြင်း' }
    ],
    pricing: { en: 'Free tier | Pro ($32/mo)', my: 'အခမဲ့ ပလန်ပါရှိ | Pro ($32/လ)' },
    toolUrl: 'https://www.relume.io'
  },
  {
    id: '95',
    title: 'Galileo AI',
    subtitle: 'AI UI/UX Design Generation for Figma',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Paid Subscription',
    recommendFor: { en: 'UI/UX Designers & Product Teams.', my: 'UI/UX ဒီဇိုင်နာများနှင့် Product အဖွဲ့များ။' },
    pros: [
      { en: 'Generates editable mobile and web UI screens from text prompts', my: 'စာသားဖြင့် ညွှန်ကြားရုံဖြင့် ဖုန်းနှင့် ဝဘ် UI Screen များကို တည်းဖြတ်နိုင်သည်အထိ ဖန်တီးပေးခြင်း' },
      { en: 'Exports directly into Figma design files', my: 'Figma ဒီဇိုင်းဖိုင်များထဲသို့ တိုက်ရိုက် ပို့ဆောင်ပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Requires invite or subscription access', my: 'အသုံးပြုရန် ဖိတ်ကြားချက် (သို့မဟုတ်) ပလန်ဝယ်ယူရန် လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Subscription based pricing', my: 'လစဉ်ကြေး ပလန်စနစ်ဖြင့် သုံးစွဲရန်' },
    toolUrl: 'https://www.usegalileo.ai'
  },
  {
    id: '96',
    title: 'Uizard',
    subtitle: 'AI Wireframing & UI Prototyping',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $12/mo',
    recommendFor: { en: 'Product Managers, Founders & Beginners.', my: 'Product မန်နေဂျာများနှင့် စတင်လေ့လာသူများ။' },
    pros: [
      { en: 'Converts hand-drawn sketches into digital UI designs instantly', my: 'လက်ဖြင့်ကြမ်းရေးထားသော ပုံကြမ်းများကို ဒစ်ဂျစ်တယ် UI ဒီဇိုင်းအဖြစ် ချက်ချင်းပြောင်းပေးခြင်း' },
      { en: 'Generates UI themes from screenshots and text prompts', my: 'ဖန်သားပြင်ဓာတ်ပုံများနှင့် စာသားများမှ UI Theme များ ဖန်တီးပေးခြင်း' }
    ],
    cons: [
      { en: 'Export options limited on free tier', my: 'အခမဲ့ ပလန်တွင် Export ထုတ်ခွင့် ကန့်သတ်ချက်ရှိခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro ($12/mo)', my: 'အခမဲ့ ($0) | Pro ($12/လ)' },
    toolUrl: 'https://uizard.io'
  },
  {
    id: '97',
    title: 'Khroma',
    subtitle: 'AI Color Palette Generator for Designers',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Open Source',
    recommendFor: { en: 'Graphic Designers & Web Creators.', my: 'ဂရပ်ဖစ်ဒီဇိုင်နာများနှင့် ဝဘ်ဖန်တီးရှင်များ။' },
    pros: [
      { en: 'Learns your color preferences to generate endless custom palettes', my: 'သင်နှစ်သက်သော အရောင်များကို လေ့လာပြီး လိုက်ဖက်မည့် အရောင်စုံများကို အဆုံးမရှိ ဖန်တီးပေးခြင်း' },
      { en: 'Displays palettes in typography, posters and gradients', my: 'ဒီဇိုင်းအမျိုးမျိုးပေါ်တွင် အရောင်များ မည်သို့ပေါ်မည်ကို ကြိုတင်ပြသပေးခြင်း' }
    ],
    cons: [
      { en: 'Purely focused on color theory rather than full UI', my: 'အရောင်ပိုင်းဆိုင်ရာကိုသာ အဓိက ဦးတည်ထားခြင်း' }
    ],
    pricing: { en: 'Free ($0)', my: 'အခမဲ့ ($0)' },
    toolUrl: 'https://www.khroma.co'
  },
  {
    id: '98',
    title: 'Let’s Enhance',
    subtitle: 'AI Image Upscaling & E-commerce Photo Fixer',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / $9/mo',
    recommendFor: { en: 'Photographers & E-commerce Merchants.', my: 'ဓာတ်ပုံဆရာများနှင့် အွန်လိုင်းကုန်သည်များ။' },
    pros: [
      { en: 'Automated color correction, denoising and upscaling', my: 'အရောင်များ ချိန်ညှိပေးခြင်း၊ ဆူညံသံ (Noise) ဖယ်ရှားခြင်းနှင့် ပုံချဲ့ပေးခြင်း' },
      { en: 'Batch processing for large photo libraries', my: 'ဓာတ်ပုံအများအပြားကို တစ်ပြိုင်နက်တည်း အစုလိုက် ပြုပြင်ပေးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Free credits expire after initial trial', my: 'စမ်းသပ်သုံးကာလပြီးနောက် အခမဲ့ Credit များ ကုန်ဆုံးခြင်း' }
    ],
    pricing: { en: 'Free trial | Subscription from $9/mo', my: 'အခမဲ့ စမ်းသပ်သုံးနိုင် | လစဉ်ကြေး $9 မှစတင်' },
    toolUrl: 'https://letsenhance.io'
  },
  {
    id: '99',
    title: 'Remove.bg',
    subtitle: 'AI Background Removal Utility',
    category: 'Design & Media',
    coverUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Pay-as-you-go',
    recommendFor: { en: 'General Users & Designers.', my: 'အထွေထွေ အသုံးပြုသူများနှင့် ဒီဇိုင်နာများ။' },
    pros: [
      { en: 'Instantly removes image background with 100% precision', my: 'ပုံတစ်ပုံ၏ နောက်ခံကို အမှားအယွင်းမရှိ တစ်စက္ကန့်အတွင်း ဖယ်ရှားပေးခြင်း' },
      { en: 'API available for bulk developer integration', my: 'Developer များအတွက် အစုလိုက်ချိတ်ဆက်သုံးရန် API ပါရှိခြင်း' }
    ],
    cons: [
      { en: 'Full resolution downloads require credits or subscription', my: 'အရည်အသွေးအပြည့်အစုံ ဒေါင်းလုဒ်ဆွဲရန် Credit လိုအပ်ခြင်း' }
    ],
    pricing: { en: 'Free previews | Credit packs from $9', my: 'အခမဲ့ ကြည့်ရှုနိုင် | Credit ပက်ကေ့ချ် $9 မှစတင်' },
    toolUrl: 'https://www.remove.bg'
  },
  {
    id: '100',
    title: 'Hugging Face Spaces',
    subtitle: 'Open Source AI Model Hub & Community',
    category: 'Development',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    pricingType: 'Free / Pro GPU Hardware',
    recommendFor: { en: 'AI Researchers, Developers & Tech Enthusiasts.', my: 'AI သုတေသီများနှင့် နည်းပညာ ဝါသနာရှင်များ။' },
    pros: [
      { en: 'Access to thousands of open-source AI models and demos', my: 'Open Source AI မော်ဒယ်များနှင့် Demos သောင်းချီကို အခမဲ့ စမ်းသပ်နိုင်ခြင်း' },
      { en: 'Deploy your own custom machine learning apps easily', my: 'ကိုယ်ပိုင် Machine Learning App များကို လွယ်ကူစွာ တင်သုံးနိုင်ခြင်း' }
    ],
    cons: [
      { en: 'Free public spaces can have high wait times during heavy traffic', my: 'အခမဲ့သုံးချိန်တွင် အသုံးပြုသူများပါက စောင့်ဆိုင်းရတတ်ခြင်း' }
    ],
    pricing: { en: 'Free ($0) | Pro GPU upgrades available', my: 'အခမဲ့ ($0) | Pro GPU ပလန်များ ရရှိနိုင်' },
    toolUrl: 'https://huggingface.co/spaces'
  }
];