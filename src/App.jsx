import React, { useState, useEffect, useRef } from 'react';
import {
  ChefHat,
  MessageSquare,
  Send,
  Mail,
  Utensils,
  Search,
  Clock,
  Flame,
  ArrowRight,
  Menu,
  X,
  Phone,
  MapPin,
  Sparkles,
  Calendar,
  Volume2,
  Loader2,
  Trophy,
  Award,
  Star,
  Quote,
  Users,
  ShieldCheck,
  Zap,
  FileText,
  Copy,
  Check,
  ChevronRight,
  Layers,
  Database,
  History,
  Cloud,
  Edit3,
  CheckCircle,
  Mic,
  MicOff
} from 'lucide-react';

/**
 * DEPLOYMENT CONFIGURATION
 * API key is loaded from environment variables (.env file)
 */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const appId = typeof __app_id !== 'undefined' ? __app_id : 'thangarasu-samayal-v5';

const ATLAS_KNOWLEDGE_BASE = [
  {
    tag: "heritage",
    content: "Thangarasu Samayal established in 1999. Specializing in Kongunadu and Chettinad flavors. 25 years of mastery in Erode district."
  },
  {
    tag: "signature_dish",
    content: "Mutton Sukka: Slow-cooked for 3.5 hours in wood-fire. Uses cold-pressed gingelly oil and hand-ground Salem pepper."
  },
  {
    tag: "menu_philosophy",
    content: "We use zero artificial colors or MSG. Spices are sun-dried and stone-ground weekly in our Appakudal kitchen."
  },
  {
    tag: "service_metrics",
    content: "Capacity to serve 500 to 5,000 guests. 100% on-time delivery record for the last 1,200 events."
  }
];

const App = () => {
  // --- STATE ---
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Vanakkam! I am Friday. I've successfully connected to the Thangarasu Samayal Atlas Vector Store. How can I assist your celebration?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGeneratingMenu, setIsGeneratingMenu] = useState(false);
  const [generatedMenu, setGeneratedMenu] = useState(null);
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [editableQuote, setEditableQuote] = useState("");
  const [showQuoteEditor, setShowQuoteEditor] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [quoteLang, setQuoteLang] = useState('english');
  const [selectedItems, setSelectedItems] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');

  const recognitionRef = useRef(null);

  // Voice recognition for Feast Architect - Manual Start/Stop
  const toggleVoiceInput = () => {
    // If already listening, stop
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log('Stop error:', e);
      }
      setIsListening(false);
      recognitionRef.current = null;
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false; // Only final results for reliability

      // Get selected language from form
      const langSelect = document.querySelector('select[name="language"]');
      const selectedLang = langSelect ? langSelect.value : 'english';
      recognition.lang = selectedLang === 'tamil' ? 'ta-IN' : 'en-IN';

      recognition.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.log('Voice error:', event.error);
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        console.log('Voice result:', event.results);
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          const transcript = lastResult[0].transcript;
          console.log('Transcript:', transcript);
          setVoiceText(prev => prev + (prev ? ' ' : '') + transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      console.log('Recognition started');
    } catch (e) {
      console.error('Voice start error:', e);
      alert('Could not start voice recognition. Please try again.');
    }
  };

  const toggleItem = (item) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const getSuggestions = async (event, guests, pref, language) => {
    setIsLoadingSuggestions(true);
    try {
      const langInstruction = language === 'tamil'
        ? 'Write ALL dish names in Tamil language (தமிழ்) using Tamil script.'
        : 'Write dish names in English.';
      const prompt = `Suggest 15-20 menu items for a ${event} catering event for ${guests} guests. Preference: ${pref || 'Traditional South Indian'}. 
      Return ONLY a JSON array of dish names, nothing else. Example: ["Sambar", "Rasam", "Idli"]
      Include a good mix of main course, rice, tiffin items, sweets, and snacks. Be specific to South Indian/Kongunadu cuisine.
      ${langInstruction}`;

      const res = await callFriday(prompt, `You are a menu expert. Return ONLY a valid JSON array of dish names. No explanations, no markdown, just the array. ${langInstruction}`);

      // Parse the JSON response
      const cleanedRes = res.replace(/```json\n?|\n?```/g, '').trim();
      const items = JSON.parse(cleanedRes);
      setAiSuggestions(items);
    } catch (e) {
      console.error('Error getting suggestions:', e);
      // Fallback suggestions if AI fails
      setAiSuggestions(['Sambar', 'Rasam', 'Poriyal', 'Payasam', 'Vadai', 'Idli', 'Dosa', 'Biryani', 'Curd Rice', 'Kesari']);
    }
    setIsLoadingSuggestions(false);
  };

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- AGENTIC RAG: VECTOR SEARCH RETRIEVER ---
  const atlasVectorSearch = (query) => {
    const q = query.toLowerCase();
    return ATLAS_KNOWLEDGE_BASE
      .filter(doc => q.includes(doc.tag) || doc.content.toLowerCase().split(' ').some(word => word.length > 3 && q.includes(word)))
      .map(doc => doc.content)
      .join("\n");
  };
  // --- GEMINI INTEGRATION ---
  const callFriday = async (prompt, systemInstruction) => {
    let retries = 0;
    while (retries < 5) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] }
          })
        });
        if (!response.ok) throw new Error('Network latency detected');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (e) {
        retries++;
        await new Promise(r => setTimeout(r, Math.pow(2, retries) * 1000));
      }
    }
    return "The spice cabinet is currently locked. Please try again.";
  };

  const playFridayVoice = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      const text = "Vanakkam. I am Friday. We have been perfecting traditional Erode flavors for over 25 years.";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Say warmly: ${text}` }] }],
          generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } }
        })
      });
      const result = await response.json();
      const pcmData = result.candidates[0].content.parts[0].inlineData.data;
      const wav = pcmToWav(pcmData, 24000);
      const audio = new Audio(URL.createObjectURL(wav));
      audio.onended = () => setIsPlayingAudio(false);
      audio.play();
    } catch (e) { setIsPlayingAudio(false); }
  };

  const pcmToWav = (base64, rate) => {
    const buffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer;
    const wav = new ArrayBuffer(44 + buffer.byteLength);
    const v = new DataView(wav);
    const s = (o, str) => { for (let i = 0; i < str.length; i++) v.setUint8(o + i, str.charCodeAt(i)); };
    s(0, 'RIFF'); v.setUint32(4, 36 + buffer.byteLength, true); s(8, 'WAVE'); s(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true);
    v.setUint16(34, 16, true); s(36, 'data'); v.setUint32(40, buffer.byteLength, true);
    new Uint8Array(wav, 44).set(new Uint8Array(buffer));
    return new Blob([wav], { type: 'audio/wav' });
  };

  // --- ACTIONS ---

  // Text-to-Speech for Friday's voice output
  const speakFriday = (text) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN'; // Indian English
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for friendly tone

      // Try to find a female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google'));
      if (femaleVoice) utterance.voice = femaleVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleChat = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Check for booking/planning intent
    const bookingKeywords = ['book', 'plan', 'menu', 'wedding', 'catering', 'quote', 'order', 'event', 'feast', 'guests'];
    const hasBookingIntent = bookingKeywords.some(keyword => userMsg.toLowerCase().includes(keyword));

    const context = atlasVectorSearch(userMsg);
    let systemPrompt = `You are Friday, the AI assistant for Thangarasu Samayal catering. Context: ${context}. Tone: Elite and professional. Start with Vanakkam. Keep responses concise (under 50 words) for voice output.`;

    if (hasBookingIntent) {
      systemPrompt += ` The user seems interested in booking/planning. After answering, suggest they scroll down to the 'Feast Architect' section to plan their menu and get a quotation, or ask them for event details (event type, guests count, date, food preferences) and you can help them plan.`;
    }

    const botRes = await callFriday(userMsg, systemPrompt);
    setMessages(prev => [...prev, { role: 'bot', text: botRes }]);
    setIsTyping(false);

    // Speak Friday's response
    speakFriday(botRes);
  };


  const handlePlanning = async (e) => {
    e.preventDefault();
    setIsGeneratingMenu(true);
    setShowQuoteEditor(false);
    setEditableQuote("");
    const d = new FormData(e.target);
    const selectedLang = d.get('language') || 'english';
    const eventDate = d.get('eventDate') || '';
    const additionalInfo = d.get('additionalInfo') || '';
    setQuoteLang(selectedLang);
    const langInstruction = selectedLang === 'tamil'
      ? 'Write the ENTIRE menu in Tamil language (தமிழ்). Use Tamil script for all dish names and descriptions.'
      : 'Write the menu in English language.';
    const dateInfo = eventDate ? `Event Date: ${eventDate}.` : '';
    const extraInfo = additionalInfo ? `Additional Requirements: ${additionalInfo}.` : '';
    const selectedMenuItemsStr = d.get('selectedMenuItems') || '';
    const menuItemsInfo = selectedMenuItemsStr ? `Selected Menu Items: ${selectedMenuItemsStr}. Include ONLY these items, no extras.` : '';
    const prompt = `Plan a premium menu for a ${d.get('event')} for ${d.get('guests')} guests. Pref: ${d.get('pref')}. ${dateInfo} ${extraInfo} ${menuItemsInfo} ${langInstruction}`;
    const systemPrompt = `You are Friday, an expert catering menu planner for Thangarasu Samayal. 
IMPORTANT RULES:
1. If the user specifies EXACT items (like "sambar, rasam, vadai only"), include ONLY those items. Do NOT add extra dishes.
2. If the user says "only", "no extra items", or lists specific items, respect that strictly.
3. Only suggest additional items if the user asks for recommendations or doesn't specify exact dishes.
4. Keep the menu focused and practical based on the user's request.
5. Use markdown headers ## for categories.
6. ONLY list dish NAMES - do NOT include any descriptions, explanations, or recipes. Just the dish name.
${langInstruction}`;
    const res = await callFriday(prompt, systemPrompt);
    setGeneratedMenu({ text: res, event: d.get('event'), guests: d.get('guests'), language: selectedLang, eventDate: eventDate, additionalInfo: additionalInfo });
    setIsGeneratingMenu(false);
  };

  const handleGenerateQuoteDraft = async () => {
    if (!generatedMenu) return;
    setIsGeneratingQuote(true);
    const lang = generatedMenu.language || quoteLang;
    const langInstruction = lang === 'tamil'
      ? 'Write the ENTIRE quotation in Tamil language (தமிழ்). Use Tamil script throughout. Include all details in Tamil.'
      : 'Write the quotation in English language.';
    const dateInfo = generatedMenu.eventDate ? `Event Date: ${generatedMenu.eventDate}.` : '';
    const extraInfo = generatedMenu.additionalInfo ? `Additional Requirements: ${generatedMenu.additionalInfo}.` : '';
    const prompt = `Based on this menu: ${generatedMenu.text}, for ${generatedMenu.guests} guests, create a professional catering quotation document.
    ${dateInfo} ${extraInfo}
    IMPORTANT PRICING RULE: Do NOT include any prices, rates, or cost estimates in the quotation.
    Instead, add a section that says: "For pricing details, please contact us:"
    - Phone: 8012678719
    - Email: boopathiraj01.t@gmail.com
    Include the menu items, event details, terms and conditions, but NO PRICES.
    Company: Thangarasu Samayal, Appakudal.
    ${langInstruction}`;
    const res = await callFriday(prompt, `You are Friday. Create a text-based formal quotation. Avoid markdown, use plain professional spacing. Do NOT include any prices or cost estimates. ${langInstruction}`);
    setEditableQuote(res);
    setShowQuoteEditor(true);
    setIsGeneratingQuote(false);
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinalizeEmail = () => {
    const subject = `Booking Inquiry: ${generatedMenu.event} - ${generatedMenu.guests} Guests`;
    const body = editableQuote;
    const email = 'boopathiraj01.t@gmail.com';

    // Copy to clipboard first
    navigator.clipboard.writeText(body).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      // Fallback copy method
      const textArea = document.createElement("textarea");
      textArea.value = body;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });

    // Try to open mailto
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Create a temporary link and click it
    const link = document.createElement('a');
    link.href = mailto;
    link.click();

    // Show alert with email info
    alert(`Quote copied to clipboard!\\n\\nIf email app doesn't open, please manually send to:\\n${email}\\n\\nJust paste (Ctrl+V) the copied content in your email.`);
  };

  const parseMenuToCards = (text) => {
    if (!text) return null;
    return text.split(/##|###/).filter(s => s.trim().length > 0).map((sec, idx) => {
      const lines = sec.trim().split('\n');
      const title = lines[0].replace(/[*#:]/g, '').trim();
      const list = lines.slice(1).filter(l => l.trim().length > 0);
      return (
        <div key={idx} className="bg-slate-50/50 border border-slate-100 p-6 rounded-3xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-orange-600"></div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</h4>
          </div>
          <ul className="space-y-1.5">
            {list.map((item, i) => (
              <li key={i} className="text-xs font-semibold text-slate-600 flex gap-2">
                <ChevronRight size={12} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{item.replace(/^[-*]\s*/, '').trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-900 font-sans antialiased selection:bg-orange-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-1.5 rounded-xl shadow-lg">
              <ChefHat className="text-white" size={20} />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase text-slate-900">
              THANGARASU <span className="text-orange-600">SAMAYAL</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              Available for Booking
            </div>
            <button onClick={playFridayVoice} className="px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black tracking-widest uppercase hover:bg-orange-600 transition flex items-center gap-2 shadow-xl shadow-slate-200">
              <Volume2 size={12} /> Friday Voice
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={20} /></button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 md:p-20 border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col justify-center space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition duration-1000">
                <Utensils size={300} />
              </div>
              <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-700 w-fit">
                <Cloud size={12} /> Appakudal, Erode • Since 1999
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Perfecting <br />
                <span className="text-orange-600 italic">Tradition.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                25 years of authentic Kongunadu & Chettinad flavors. We bring Erode's culinary legacy to your weddings, engagements, and special celebrations with premium catering services.
              </p>

              {/* Service Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-orange-600">500+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Guests Capacity</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-orange-600">100%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Fresh Spices</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-orange-600">24hr</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Advance Prep</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-orange-600">0%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">MSG Used</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#planner" className="px-10 py-5 bg-orange-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-orange-700 transition flex items-center gap-3 shadow-2xl shadow-orange-100">
                  Plan with Friday <ArrowRight size={16} />
                </a>
                <a href="tel:8012678719" className="px-10 py-5 bg-white border border-slate-200 rounded-[2rem] font-black uppercase tracking-widest text-[10px] text-slate-800 hover:border-orange-300 transition flex items-center gap-3">
                  <Phone size={16} /> 8012678719
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-rows-3 gap-6">
              <div className="bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col justify-between shadow-2xl">
                <div className="flex justify-between items-start">
                  <Trophy className="text-orange-500" size={28} />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Heritage</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-1 tracking-tighter">25+</div>
                  <div className="text-xs font-bold text-slate-400">Years of Erode Legacy</div>
                </div>
              </div>
              <div className="bg-orange-600 rounded-[3rem] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <Flame size={100} className="absolute -bottom-8 -right-8 opacity-20" />
                <div className="flex justify-between items-start">
                  <Users size={28} />
                  <History size={14} className="opacity-50" />
                </div>
                <div>
                  <div className="text-4xl font-black mb-1 tracking-tighter">1200+</div>
                  <div className="text-xs font-bold text-white/70">Events Served</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-8 text-white shadow-2xl">
                <div className="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-3">Specialties</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Flame size={12} className="text-orange-500" /> Kongunadu Cuisine
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Flame size={12} className="text-orange-500" /> Chettinad Specials
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Flame size={12} className="text-orange-500" /> Wedding Feasts
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Flame size={12} className="text-orange-500" /> Corporate Events
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catering Services Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-700 mb-6">
              <Utensils size={12} /> Our Expertise
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
              Authentic <span className="text-orange-600 italic">Flavors.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we bring the authentic taste of Kongunadu and Chettinad cuisine to your doorstep.
            </p>
          </div>

          {/* Signature Dishes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Flame, title: "Mutton Sukka", desc: "Slow-cooked 3.5 hours in wood-fire with hand-ground Salem pepper", tag: "Signature" },
              { icon: ChefHat, title: "Kongunadu Chicken", desc: "Traditional coconut-based gravy with freshly ground spices", tag: "Popular" },
              { icon: Star, title: "Chettinad Biryani", desc: "Aromatic basmati rice layered with tender meat and secret spices", tag: "Premium" },
              { icon: Zap, title: "Erode Special Rasam", desc: "Soul-warming lentil soup with temple-style tempering", tag: "Classic" }
            ].map((dish, i) => (
              <div key={i} className="group bg-slate-50 hover:bg-orange-600 rounded-[2.5rem] p-8 transition-all duration-500 cursor-pointer border border-slate-100 hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-200">
                <div className="flex justify-between items-start mb-6">
                  <dish.icon className="text-orange-600 group-hover:text-white transition" size={32} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-orange-600 group-hover:text-white/80 bg-orange-100 group-hover:bg-white/20 px-3 py-1 rounded-full transition">{dish.tag}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-white mb-2 transition">{dish.title}</h3>
                <p className="text-sm text-slate-500 group-hover:text-white/80 font-medium leading-relaxed transition">{dish.desc}</p>
              </div>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {/* Wedding Catering */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-[3rem] p-10 text-white relative overflow-hidden group">
              <Flame size={150} className="absolute -bottom-10 -right-10 opacity-10" />
              <div className="relative z-10">
                <Calendar className="mb-6" size={40} />
                <h3 className="text-2xl font-black mb-3">Wedding Catering</h3>
                <p className="text-white/80 font-medium leading-relaxed mb-6">
                  Grand feasts for 500 to 5,000+ guests with traditional banana leaf service and live cooking stations.
                </p>
                <ul className="space-y-2">
                  {["Multi-cuisine menus", "Live dosa counters", "Traditional serving", "On-time guarantee"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-bold">
                      <CheckCircle size={14} className="text-white/60" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Corporate Events */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Users size={120} />
              </div>
              <div className="relative z-10">
                <Award className="mb-6" size={40} />
                <h3 className="text-2xl font-black mb-3">Corporate Events</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-6">
                  Professional catering for office parties, conferences, and business lunches with punctual service.
                </p>
                <ul className="space-y-2">
                  {["Boxed meals available", "Buffet setups", "Diet-friendly options", "Quick turnaround"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-300">
                      <CheckCircle size={14} className="text-orange-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Private Functions */}
            <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition duration-500">
              <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition">
                <ChefHat size={120} />
              </div>
              <div className="relative z-10">
                <Sparkles className="mb-6 text-orange-600" size={40} />
                <h3 className="text-2xl font-black text-slate-900 mb-3">Private Functions</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  Intimate gatherings, house warmings, and family celebrations with personalized menu curation.
                </p>
                <ul className="space-y-2">
                  {["Custom menus", "Home delivery", "Chef on-site", "Flexible portions"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <CheckCircle size={14} className="text-orange-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quality Promise */}
          <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-500 mb-6">
                  <ShieldCheck size={12} /> Quality Promise
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-4">
                  Pure. <span className="text-orange-500 italic">Traditional.</span> Authentic.
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  We take pride in our commitment to authentic flavors. Every dish is prepared with love, using recipes passed down through generations.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "0%", label: "Artificial Colors" },
                  { value: "0%", label: "MSG Used" },
                  { value: "100%", label: "Fresh Spices" },
                  { value: "100%", label: "On-time Delivery" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-orange-500 mb-1">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Capacity Banner */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "500-5000+", label: "Guest Capacity" },
              { icon: Clock, value: "1,200+", label: "Events Served" },
              { icon: MapPin, value: "Erode & Beyond", label: "Service Area" },
              { icon: Trophy, value: "25+", label: "Years Experience" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <item.icon className="text-orange-600" size={24} />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">{item.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Friday AI Assistant Interface */}
      <section id="assistant" className="py-24 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black text-white tracking-tighter italic">Friday <span className="text-orange-500">Assistant</span></h2>
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                  <Database size={12} className="text-orange-500" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Vector Engine 5.0</span>
                </div>
              </div>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Knowledge Store Active</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3.5rem] overflow-hidden flex flex-col h-[550px] backdrop-blur-3xl shadow-2xl relative">
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[2.5rem] ${m.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5 shadow-inner'}`}>
                    <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && <div className="px-6 py-3 bg-white/5 rounded-full w-fit animate-pulse text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 border border-white/10">
                <Loader2 className="animate-spin text-orange-500" size={14} />
                Processing...
              </div>}
              <div ref={chatEndRef} />
            </div>
            <div className="p-6 bg-black/50 border-t border-white/10">
              <div className="flex gap-4">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleChat()}
                  placeholder="Ask about recipes, bookings, or pricing..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition font-medium"
                />
                <button onClick={handleChat} className="bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-[2rem] shadow-2xl transition">
                  <Send size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Planner & Quotation Workflow */}
      <section id="planner" className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <div className="px-4 py-1.5 bg-white border border-slate-100 rounded-full w-fit shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Sparkles size={14} className="text-orange-500" /> Cloud Planning Engine
                  </span>
                </div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Feast <br /> <span className="text-orange-600">Architect.</span></h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                  Friday drafts professional menus and instant quotations in seconds.
                </p>
              </div>

              <form onSubmit={handlePlanning} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Event</label>
                    <select name="event" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none">
                      <option>Wedding Feast</option>
                      <option>Engagement</option>
                      <option>Corporate Lunch</option>
                      <option>House Warming</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Event Date</label>
                    <input name="eventDate" type="date" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 transition" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Guests</label>
                    <input name="guests" type="number" defaultValue="300" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Palate Note</label>
                    <input name="pref" type="text" placeholder="e.g. Traditional Non-Veg..." className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 transition" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Quote Language</label>
                    <select name="language" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none">
                      <option value="english">English</option>
                      <option value="tamil">தமிழ் (Tamil)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
                      Upload Reference <span className="text-[8px] text-slate-300 font-bold">(Optional)</span>
                    </label>
                    <input name="reference" type="file" accept="image/*,.pdf,.doc,.docx" className="w-full bg-slate-50 border-none rounded-2xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-orange-500 transition file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-orange-100 file:text-orange-600 file:uppercase file:tracking-widest hover:file:bg-orange-200 file:cursor-pointer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Additional Requirements</label>
                    <button
                      type="button"
                      onClick={toggleVoiceInput}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition ${isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        }`}
                    >
                      {isListening ? <><MicOff size={12} /> Stop</> : <><Mic size={12} /> Voice Input</>}
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      name="additionalInfo"
                      rows="3"
                      value={voiceText}
                      onChange={(e) => setVoiceText(e.target.value)}
                      placeholder="Any special requests, dietary restrictions, venue details, timing preferences, etc..."
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                    ></textarea>
                    {isListening && (
                      <div className="absolute top-2 right-2 text-orange-600 animate-pulse text-xs font-bold flex items-center gap-1">
                        <Mic size={12} /> Listening...
                      </div>
                    )}
                  </div>
                </div>

                {/* Menu Suggestions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">AI Menu Suggestions</label>
                    {selectedItems.length > 0 && (
                      <button type="button" onClick={() => setSelectedItems([])} className="text-[10px] font-bold text-orange-600 hover:text-orange-700">
                        Clear All ({selectedItems.length})
                      </button>
                    )}
                  </div>

                  {/* Get Suggestions Button */}
                  <button
                    type="button"
                    disabled={isLoadingSuggestions}
                    onClick={() => {
                      const form = document.querySelector('form');
                      const formData = new FormData(form);
                      getSuggestions(formData.get('event'), formData.get('guests'), formData.get('pref'), formData.get('language'));
                    }}
                    className="w-full py-3 bg-orange-100 text-orange-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-200 transition flex items-center justify-center gap-2"
                  >
                    {isLoadingSuggestions ? (
                      <><Loader2 className="animate-spin" size={14} /> Getting Suggestions...</>
                    ) : (
                      <><Sparkles size={14} /> Get AI Suggestions Based on Your Event</>
                    )}
                  </button>

                  {/* AI Suggestions Display */}
                  {aiSuggestions.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3">Click to Select Items</div>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestions.map(item => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleItem(item)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition ${selectedItems.includes(item)
                              ? 'bg-orange-600 text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300'
                              }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected Items Display */}
                  {selectedItems.length > 0 && (
                    <div className="text-xs font-bold text-slate-600 bg-orange-50 rounded-xl p-3">
                      <span className="text-orange-600">Selected ({selectedItems.length}):</span> {selectedItems.join(', ')}
                    </div>
                  )}
                  <input type="hidden" name="selectedMenuItems" value={selectedItems.join(', ')} />
                </div>
                <button disabled={isGeneratingMenu} type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition flex items-center justify-center gap-3 shadow-2xl shadow-slate-200">
                  {isGeneratingMenu ? <Loader2 className="animate-spin" /> : <Layers size={20} />}
                  Architect Feast
                </button>
              </form>
            </div>

            <div className="lg:col-span-7">
              {generatedMenu ? (
                <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-700">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{showQuoteEditor ? 'Modify Quote' : 'Feast Draft'}</h3>
                      <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{generatedMenu.event} • {generatedMenu.guests} Pax</p>
                    </div>
                    {showQuoteEditor ? <Edit3 className="text-orange-500" /> : <FileText className="text-slate-100" size={60} />}
                  </div>

                  {!showQuoteEditor ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {parseMenuToCards(generatedMenu.text)}
                      </div>
                      <div className="flex flex-col md:flex-row gap-4">
                        <button onClick={handleGenerateQuoteDraft} disabled={isGeneratingQuote} className="flex-1 py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition flex items-center justify-center gap-3">
                          {isGeneratingQuote ? <Loader2 className="animate-spin" /> : <Sparkles size={16} />}
                          Draft Quotation
                        </button>
                        <button onClick={() => setGeneratedMenu(null)} className="flex-1 py-5 border-2 border-slate-100 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition text-slate-400">
                          Restart Planner
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <textarea value={editableQuote} onChange={(e) => setEditableQuote(e.target.value)} rows="12" className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-orange-500 outline-none leading-relaxed custom-scrollbar shadow-inner" />
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <button onClick={handleFinalizeEmail} className="md:col-span-2 py-5 bg-orange-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition flex items-center justify-center gap-3 shadow-xl shadow-orange-100">
                          <Mail size={16} /> Send via Email
                        </button>
                        <button onClick={() => copyToClipboard(editableQuote)} className="py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition flex items-center justify-center gap-3">
                          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied!' : 'Copy Quote'}
                        </button>
                        <a href="tel:8012678719" className="py-5 bg-white border-2 border-slate-200 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:border-orange-600 transition flex items-center justify-center gap-3 text-slate-800">
                          <Phone size={16} /> Call Now
                        </a>
                        <button onClick={() => setShowQuoteEditor(false)} className="md:col-span-4 text-xs font-bold text-slate-400 hover:text-orange-600 transition flex items-center justify-center gap-2 pt-2">
                          <ArrowRight size={14} className="rotate-180" /> Back to Menu View
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[4/3] bg-white rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12 shadow-sm">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-8">
                    <Cloud size={48} className="text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-300 tracking-tight">Syncing Planner</h3>
                  <p className="text-slate-400 max-w-xs mt-3 font-medium text-sm leading-relaxed">Define your event on the left to activate Friday's architecting engine.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section >

      {/* Testimonials */}
      < section className="py-24 px-6 bg-white border-y border-slate-50" >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-black tracking-tighter text-slate-900 mb-2">Guest <span className="text-orange-600">Pulse.</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Traditional Quality Since 1999</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { name: "Rajasekharan", role: "Wedding Client", text: "The Mutton Sukka at my son's wedding was legendary. Tradition in every bite." },
            { name: "Muthu Kumar", role: "Local Regular", text: "Zero MSG and sun-dried spices make a huge difference. Authentic Erode taste." },
            { name: "Senthil V.", role: "Corporate Head", text: "Managed 800 guests with impeccable hygiene and timing. Highly professional." }
          ].map((t, i) => (
            <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow-2xl transition duration-500 group">
              <div className="space-y-6">
                <Quote className="text-orange-200 group-hover:text-orange-600 transition" size={40} />
                <p className="text-slate-700 font-medium italic leading-relaxed">{t.text}</p>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-black text-orange-600 text-xs">{t.name[0]}</div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* Footer */}
      < footer id="contact" className="py-24 bg-white px-6" >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-20">
          <div className="space-y-8 max-w-sm">
            <div className="flex items-center gap-3">
              <ChefHat className="text-orange-600" size={36} />
              <span className="text-3xl font-black uppercase tracking-tighter">Thangarasu Samayal</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed">Preserving the culinary legacy of Erode since 1999. Premium catering for weddings, engagements, and special celebrations.</p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-orange-600 hover:text-white transition duration-500 cursor-pointer shadow-sm">
                <Flame size={20} />
              </a>
              <a href="mailto:boopathiraj01.t@gmail.com" className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-orange-600 hover:text-white transition duration-500 cursor-pointer shadow-sm">
                <Mail size={20} />
              </a>
              <a href="tel:8012678719" className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-orange-600 hover:text-white transition duration-500 cursor-pointer shadow-sm">
                <Phone size={20} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 lg:gap-24 w-full lg:w-auto">
            <div className="space-y-6">
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Headquarters</h4>
              <div className="text-sm font-black text-slate-900 leading-relaxed">Appakudal, Erode<br />Tamil Nadu - 638315</div>
            </div>
            <div className="space-y-6">
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Direct Contact</h4>
              <a href="tel:8012678719" className="text-2xl font-black text-slate-900 hover:text-orange-600 transition tracking-tighter italic underline decoration-orange-200 underline-offset-4">8012678719</a>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Open Daily: 9AM - 9PM
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">&copy; 2024 THANGARASU SAMAYAL. EXCELLENCE IN TASTE.</div>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-6 py-2 rounded-full border border-slate-100">
            <Phone size={12} className="text-orange-500" /> Call: 8012678719
          </div>
        </div>
      </footer >
    </div >
  );
};

export default App;
