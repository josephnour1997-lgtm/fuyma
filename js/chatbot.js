/* =========================================
   Felixinator – Concept Placeholder
   ========================================= */

(function () {

  // ── Inject styles ──────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Launcher button */
    #fuyma-chat-launcher {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9000;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e8700a, #f08c35);
      border: none;
      cursor: pointer;
      box-shadow: 0 6px 28px rgba(232,112,10,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s;
      outline: none;
    }
    #fuyma-chat-launcher:hover {
      transform: scale(1.1);
      box-shadow: 0 10px 36px rgba(232,112,10,0.6);
    }
    #fuyma-chat-launcher svg { transition: opacity 0.2s, transform 0.2s; }
    #fuyma-chat-launcher.open .icon-chat { opacity: 0; transform: scale(0.5) rotate(30deg); position: absolute; }
    #fuyma-chat-launcher.open .icon-close { opacity: 1; transform: scale(1) rotate(0deg); }
    #fuyma-chat-launcher .icon-close { opacity: 0; transform: scale(0.5) rotate(-30deg); position: absolute; }

    /* Notification dot */
    #fuyma-chat-launcher::after {
      content: '';
      position: absolute;
      top: 4px; right: 4px;
      width: 12px; height: 12px;
      background: #22c55e;
      border-radius: 50%;
      border: 2px solid #0d1b2a;
      animation: fuyma-ping 2s infinite;
    }
    #fuyma-chat-launcher.open::after { display: none; }
    @keyframes fuyma-ping {
      0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
      70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
      100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
    }

    /* Chat window */
    #fuyma-chat-window {
      position: fixed;
      bottom: 100px;
      right: 28px;
      z-index: 8999;
      width: 360px;
      max-height: 540px;
      background: #162032;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      box-shadow: 0 24px 64px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(16px) scale(0.97);
      pointer-events: none;
      transition: opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1);
      font-family: 'Inter', system-ui, sans-serif;
    }
    #fuyma-chat-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* Header */
    #fuyma-chat-header {
      background: linear-gradient(135deg, #1e2f47, #243654);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .fuyma-avatar {
      width: 38px; height: 38px;
      background: linear-gradient(135deg, #e8700a, #f08c35);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; flex-shrink: 0;
    }
    .fuyma-header-info { flex: 1; }
    .fuyma-header-name {
      font-size: 0.88rem; font-weight: 700; color: #f0f4f8;
      font-family: 'Montserrat', system-ui, sans-serif;
    }
    .fuyma-header-status {
      display: flex; align-items: center; gap: 5px;
      font-size: 0.7rem; color: #8fa3bc; margin-top: 1px;
    }
    .fuyma-status-dot {
      width: 6px; height: 6px; background: #22c55e;
      border-radius: 50;
      animation: fuyma-ping 2s infinite;
    }
    .fuyma-beta-tag {
      background: rgba(232,112,10,0.15);
      border: 1px solid rgba(232,112,10,0.3);
      color: #f08c35;
      font-size: 0.6rem; font-weight: 700;
      letter-spacing: 1px; text-transform: uppercase;
      padding: 2px 7px; border-radius: 20px;
    }

    /* Messages */
    #fuyma-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scroll-behavior: smooth;
    }
    #fuyma-chat-messages::-webkit-scrollbar { width: 4px; }
    #fuyma-chat-messages::-webkit-scrollbar-track { background: transparent; }
    #fuyma-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

    .fuyma-msg {
      display: flex;
      flex-direction: column;
      max-width: 85%;
      animation: fuyma-msg-in 0.25s ease;
    }
    @keyframes fuyma-msg-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fuyma-msg.bot { align-self: flex-start; }
    .fuyma-msg.user { align-self: flex-end; }

    .fuyma-bubble {
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 0.82rem;
      line-height: 1.55;
    }
    .fuyma-msg.bot .fuyma-bubble {
      background: #1e2f47;
      border: 1px solid rgba(255,255,255,0.07);
      color: #d0dce8;
      border-bottom-left-radius: 4px;
    }
    .fuyma-msg.user .fuyma-bubble {
      background: linear-gradient(135deg, #e8700a, #f08c35);
      color: white;
      border-bottom-right-radius: 4px;
    }
    .fuyma-msg-time {
      font-size: 0.62rem;
      color: #5a7a99;
      margin-top: 4px;
      padding: 0 4px;
    }
    .fuyma-msg.user .fuyma-msg-time { text-align: right; }

    /* Quick replies */
    .fuyma-quick-replies {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 0 18px 12px;
      flex-shrink: 0;
    }
    .fuyma-qr-btn {
      background: rgba(232,112,10,0.1);
      border: 1px solid rgba(232,112,10,0.25);
      color: #f08c35;
      font-size: 0.72rem; font-weight: 600;
      padding: 6px 12px; border-radius: 20px;
      cursor: pointer; transition: all 0.2s;
      font-family: 'Inter', system-ui, sans-serif;
      white-space: nowrap;
    }
    .fuyma-qr-btn:hover {
      background: rgba(232,112,10,0.2);
      border-color: rgba(232,112,10,0.5);
    }

    /* Typing indicator */
    .fuyma-typing .fuyma-bubble {
      display: flex; align-items: center; gap: 4px; padding: 12px 16px;
    }
    .fuyma-typing-dot {
      width: 6px; height: 6px; background: #5a7a99;
      border-radius: 50%; animation: fuyma-bounce 1.2s infinite;
    }
    .fuyma-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .fuyma-typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes fuyma-bounce {
      0%,60%,100% { transform: translateY(0); }
      30%          { transform: translateY(-5px); }
    }

    /* Input area */
    #fuyma-chat-input-area {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding: 12px 14px;
      display: flex;
      gap: 8px;
      align-items: center;
      background: #1a2840;
      flex-shrink: 0;
    }
    #fuyma-chat-input {
      flex: 1;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 22px;
      padding: 9px 16px;
      color: #f0f4f8;
      font-size: 0.82rem;
      font-family: 'Inter', system-ui, sans-serif;
      outline: none;
      transition: border-color 0.2s;
    }
    #fuyma-chat-input:focus { border-color: rgba(232,112,10,0.5); }
    #fuyma-chat-input::placeholder { color: rgba(143,163,188,0.4); }
    #fuyma-chat-send {
      width: 36px; height: 36px; flex-shrink: 0;
      background: linear-gradient(135deg, #e8700a, #f08c35);
      border: none; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
    }
    #fuyma-chat-send:hover { transform: scale(1.1); box-shadow: 0 4px 16px rgba(232,112,10,0.4); }
    #fuyma-chat-send svg { width: 15px; height: 15px; color: white; }

    /* Disclaimer */
    .fuyma-disclaimer {
      text-align: center;
      font-size: 0.6rem;
      color: #3d5470;
      padding: 6px 14px 10px;
      flex-shrink: 0;
    }

    @media (max-width: 480px) {
      #fuyma-chat-window { width: calc(100vw - 24px); right: 12px; bottom: 90px; }
      #fuyma-chat-launcher { right: 16px; bottom: 20px; }
    }
  `;
  document.head.appendChild(style);

  // ── Inject HTML ────────────────────────────────────────────────
  const html = `
    <button id="fuyma-chat-launcher" aria-label="Open Felixinator">
      <svg class="icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg class="icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div id="fuyma-chat-window" role="dialog" aria-label="Felixinator">
      <div id="fuyma-chat-header">
        <div class="fuyma-avatar">🤖</div>
        <div class="fuyma-header-info">
          <div class="fuyma-header-name">Felixinator</div>
          <div class="fuyma-header-status">
            <div class="fuyma-status-dot"></div>
            Online · AI-powered
          </div>
        </div>
        <span class="fuyma-beta-tag">Beta</span>
      </div>

      <div id="fuyma-chat-messages"></div>

      <div class="fuyma-quick-replies" id="fuymaQuickReplies"></div>

      <div id="fuyma-chat-input-area">
        <input id="fuyma-chat-input" type="text" placeholder="Ask about die casting, certifications…" autocomplete="off" maxlength="200">
        <button id="fuyma-chat-send" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <div class="fuyma-disclaimer">AI concept · Responses are illustrative only</div>
    </div>
  `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // ── State & elements ───────────────────────────────────────────
  const launcher   = document.getElementById('fuyma-chat-launcher');
  const chatWindow = document.getElementById('fuyma-chat-window');
  const messages   = document.getElementById('fuyma-chat-messages');
  const input      = document.getElementById('fuyma-chat-input');
  const sendBtn    = document.getElementById('fuyma-chat-send');
  const qrArea     = document.getElementById('fuymaQuickReplies');
  let isOpen = false;
  let hasGreeted = false;

  // ── Quick-reply topics ─────────────────────────────────────────
  const quickReplies = [
    'What materials do you cast?',
    'Tell me about your certifications',
    'What is your machine capacity?',
    'How do I get a quote?',
    'Do you offer machining?',
  ];

  // ── Scripted responses ─────────────────────────────────────────
  const responses = [
    {
      match: /material|alumin|zamak|brass|alloy/i,
      reply: 'We specialise in high-pressure die casting of <strong>Aluminium</strong>, <strong>Zamak</strong> and <strong>Brass</strong>. Aluminium is our primary alloy — available in multiple grades to suit structural, thermal and pressure-tight applications.'
    },
    {
      match: /certif|iso|iatf|ecovadis|standard/i,
      reply: 'FUYMA holds four international certifications: <strong>IATF 16949</strong> (automotive quality), <strong>ISO 9001</strong> (quality management), <strong>ISO 14001</strong> (environmental), and <strong>ISO 27001</strong> (information security). We are also <strong>EcoVadis certified</strong>.'
    },
    {
      match: /machine|tonne|ton|capacity|size|weight|kg/i,
      reply: 'Our injection machines range from <strong>60 to 1,600 tonnes</strong> of clamping force, producing parts up to <strong>15 kg</strong> in weight. All cells are fully automated for consistent quality and minimal porosity.'
    },
    {
      match: /quote|price|cost|enquir|request/i,
      reply: 'To request a quote, please visit our <strong>Contact page</strong> or email us directly at <strong>fuyma@fuyma.com</strong>. Our team typically responds within one business day. The more detail you can share about your component, the faster we can help.'
    },
    {
      match: /machin|finish|coat|paint|impreg|assembly|treat/i,
      reply: 'Yes — we offer a full finishing service including <strong>CNC machining, vacuum impregnation, cataphoresis, painting, chrome plating, shot blasting, vibratory finishing</strong> and assembly. We can deliver complete, ready-to-fit parts from a single source.'
    },
    {
      match: /simulat|fill|porosity|solidif/i,
      reply: 'Our engineering team runs <strong>fill simulation, cooling simulation, hot-zone analysis, porosity risk analysis</strong> and thickness analysis before any mould is cut. This eliminates defects early and reduces time to first good part significantly.'
    },
    {
      match: /histor|founded|since|1987|year|old/i,
      reply: 'FUYMA was founded in <strong>1987</strong> by D. Feliciano Arias. Over 37 years we have grown from a single 60-tonne machine to a fully automated facility with machines up to 1,600 tonnes. We were inducted into the <strong>John Deere Hall of Fame</strong> in 2012.'
    },
    {
      match: /contact|address|location|phone|email|where/i,
      reply: 'You can reach us at:<br><strong>📍</strong> Polígono La Fraila III, C/ Tenerife 30–36, 28970 Humanes de Madrid<br><strong>📞</strong> +34 91 697 73 25<br><strong>✉️</strong> fuyma@fuyma.com'
    },
    {
      match: /engineer|design|tooling|mould|mold|r.?d/i,
      reply: 'We recommend involving FUYMA from the <strong>very start</strong> of your project. Our engineers co-design components for die casting — advising on simplicity, mass reduction, tolerances and critical features. We design and manufacture all tooling in-house.'
    },
    {
      match: /quality|inspect|x.?ray|spectr|cmm|3d|measure/i,
      reply: 'Quality is verified at three levels: <strong>Spectrometer</strong> for material composition, <strong>X-Ray</strong> for internal porosity and defects, and <strong>CMM</strong> (3D coordinate measurement) for dimensional accuracy. Every batch is documented and traceable.'
    },
    {
      match: /job|career|employ|work|hire|position|vacancies/i,
      reply: 'We recruit across Quality, Foundry, Maintenance, Die-Making and CNC Machining departments. Visit our <strong>Careers page</strong> to register your interest and send us your CV. We will be in touch when a suitable role arises.'
    },
    {
      match: /hello|hi|hey|hola|bonjour|hallo|ciao/i,
      reply: 'Hello! 👋 I\'m the Felixinator. I can answer questions about our die casting capabilities, certifications, engineering services, products and more. What would you like to know?'
    },
    {
      match: /thank|thanks|gracias|merci|danke/i,
      reply: 'You\'re very welcome! If you have any more questions or would like to discuss a project, don\'t hesitate to reach out. Our team is happy to help. 😊'
    },
  ];

  const fallback = "That's a great question. For detailed information on that topic, I'd recommend speaking directly with our team — email us at <strong>fuyma@fuyma.com</strong> or call <strong>+34 91 697 73 25</strong> and we'll be happy to help.";

  // ── Helpers ────────────────────────────────────────────────────
  function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `fuyma-msg ${type}`;
    msg.innerHTML = `
      <div class="fuyma-bubble">${text}</div>
      <div class="fuyma-msg-time">${now()}</div>
    `;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'fuyma-msg bot fuyma-typing';
    t.id = 'fuymaTyping';
    t.innerHTML = `<div class="fuyma-bubble"><div class="fuyma-typing-dot"></div><div class="fuyma-typing-dot"></div><div class="fuyma-typing-dot"></div></div>`;
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    document.getElementById('fuymaTyping')?.remove();
  }

  function buildQuickReplies(items) {
    qrArea.innerHTML = '';
    items.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'fuyma-qr-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        qrArea.innerHTML = '';
        sendMessage(label);
      });
      qrArea.appendChild(btn);
    });
  }

  function getBotReply(text) {
    for (const r of responses) {
      if (r.match.test(text)) return r.reply;
    }
    return fallback;
  }

  function sendMessage(text) {
    const clean = text.trim();
    if (!clean) return;
    input.value = '';
    qrArea.innerHTML = '';
    addMessage(clean, 'user');
    showTyping();
    const delay = 700 + Math.random() * 700;
    setTimeout(() => {
      removeTyping();
      addMessage(getBotReply(clean), 'bot');
    }, delay);
  }

  // ── Toggle ─────────────────────────────────────────────────────
  function toggleChat() {
    isOpen = !isOpen;
    launcher.classList.toggle('open', isOpen);
    chatWindow.classList.toggle('open', isOpen);

    if (isOpen && !hasGreeted) {
      hasGreeted = true;
      setTimeout(() => {
        addMessage("👋 Hi! I'm the <strong>Felixinator</strong> — here to answer your questions about our die casting capabilities, engineering services, certifications and more.", 'bot');
        setTimeout(() => buildQuickReplies(quickReplies), 600);
      }, 300);
    }

    if (isOpen) {
      setTimeout(() => input.focus(), 350);
    }
  }

  // ── Event listeners ────────────────────────────────────────────
  launcher.addEventListener('click', toggleChat);

  sendBtn.addEventListener('click', () => sendMessage(input.value));

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(input.value);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !chatWindow.contains(e.target) && !launcher.contains(e.target)) {
      isOpen = false;
      launcher.classList.remove('open');
      chatWindow.classList.remove('open');
    }
  });

})();
