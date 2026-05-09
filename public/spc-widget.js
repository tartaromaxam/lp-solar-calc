(function() {
    // 1. CONFIG LOAD (Proteção Global)
    window.spc_config = window.spc_config || {};
    
    const config = {
        tarifa: parseFloat(window.spc_config?.tarifa) || 0.82,
        custo_kwp: parseFloat(window.spc_config?.custo_kwp) || 4800,
        producao_kwp: parseFloat(window.spc_config?.producao_kwp) || 145,
        taxa_economia: parseFloat(window.spc_config?.taxa_economia) || 0.95,
        whatsapp: window.spc_config?.whatsapp || '',
        webhook: window.spc_config?.webhook || '',
        pixel: window.spc_config?.pixel || '',
        cor_primaria: window.spc_config?.cor_primaria || '#1e3a5f', // Azul Nativa
        cor_secundaria: window.spc_config?.cor_secundaria || '#2ecc71' // Verde Nativa
    };

    const DEBUG = false;

    // 2. UTILS & TRACKING
    const Utils = {
        trackEvent(event, data = {}) {
            if (DEBUG) console.log(`[Tracking] ${event}`, data);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event, ...data });
        },
        getUTMs() {
            const params = new URLSearchParams(window.location.search);
            return {
                source: params.get('utm_source') || '',
                medium: params.get('utm_medium') || '',
                campaign: params.get('utm_campaign') || '',
                content: params.get('utm_content') || '',
                term: params.get('utm_term') || ''
            };
        },
        getDeviceInfo() {
            return {
                ua: navigator.userAgent,
                screen: `${window.screen.width}x${window.screen.height}`,
                lang: navigator.language
            };
        }
    };

    // 3. CSS INJECTION
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --scp-primary: ${config.cor_primaria || '#D4AF37'};
            --scp-secondary: ${config.cor_secundaria || '#F5C518'};
            --scp-bg-base: #0a0a0a;
            --scp-bg-glass: rgba(20, 20, 20, 0.6);
            --scp-bg-glass-input: rgba(255, 255, 255, 0.03);
            --scp-bg-glass-result: rgba(255, 255, 255, 0.02);
            --scp-border-glass: rgba(255, 255, 255, 0.08);
            --scp-border-focus: rgba(212, 175, 55, 0.4);
            --scp-text-dark: #ffffff;
            --scp-text-light: #a0a0a0;
            --scp-error: #ff4d4d;
            --scp-whatsapp: #1b4d3e;
            --scp-whatsapp-hover: #236350;
            --scp-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            --scp-glow: 0 0 20px rgba(212, 175, 55, 0.15);
            --scp-glow-strong: 0 0 30px rgba(212, 175, 55, 0.3);
            --scp-radius: 20px;
        }
        .scp-calculator-container { font-family: 'Inter', sans-serif; max-width: 600px; margin: 1rem auto; color: var(--scp-text-dark); }
        .scp-card { background: var(--scp-bg-glass); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-radius: var(--scp-radius); padding: 2.5rem 2rem; box-shadow: var(--scp-shadow); border: 1px solid var(--scp-border-glass); position: relative; overflow: hidden; }
        .scp-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; text-align: center; background: linear-gradient(135deg, var(--scp-secondary), var(--scp-primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: var(--scp-glow); letter-spacing: -0.5px; }
        .scp-subtitle { font-size: 0.95rem; color: var(--scp-text-light); text-align: center; margin-bottom: 2rem; font-weight: 400; }
        .scp-form-group { margin-bottom: 1.2rem; }
        .scp-form-group label { display: block; font-size: 0.85rem; font-weight: 500; margin-bottom: 0.5rem; color: var(--scp-text-light); letter-spacing: 0.5px; text-transform: uppercase; }
        .scp-form-group input { width: 100%; padding: 0.9rem 1.2rem; background: var(--scp-bg-glass-input); border: 1px solid var(--scp-border-glass); border-radius: 12px; font-size: 1rem; color: #fff; box-sizing: border-box; transition: all 0.3s ease; }
        .scp-form-group input::placeholder { color: rgba(255,255,255,0.2); }
        .scp-form-group input:focus { border-color: var(--scp-border-focus); outline: none; box-shadow: var(--scp-glow); background: rgba(255,255,255,0.05); }
        .scp-input-error { border-color: var(--scp-error) !important; background: rgba(255,77,77,0.05) !important; }
        .scp-error-message { color: var(--scp-error); font-size: 0.85rem; margin-bottom: 1.2rem; padding: 0.8rem; background: rgba(255,77,77,0.1); border-radius: 10px; border: 1px solid rgba(255,77,77,0.2); text-align: center; font-weight: 500; }
        .scp-btn-primary { width: 100%; padding: 1rem; margin-top: 0.5rem; border: none; border-radius: 12px; background: linear-gradient(135deg, var(--scp-secondary), var(--scp-primary)); color: #111; font-size: 1.05rem; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); box-shadow: var(--scp-glow); text-transform: uppercase; letter-spacing: 1px; }
        .scp-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--scp-glow-strong); filter: brightness(1.1); }
        .scp-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; filter: grayscale(1); }
        .scp-results-section { margin-top: 2.5rem; animation: scp-fade-in 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; border-top: 1px solid var(--scp-border-glass); padding-top: 2rem; }
        @keyframes scp-fade-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .scp-results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .scp-result-item { background: var(--scp-bg-glass-result); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--scp-border-glass); text-align: center; transition: transform 0.3s ease; }
        .scp-result-item:hover { transform: translateY(-2px); background: rgba(255,255,255,0.04); }
        .scp-result-highlight { grid-column: span 2; background: linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02)); border: 1px solid var(--scp-border-focus); position: relative; overflow: hidden; padding: 2rem 1.2rem; box-shadow: inset 0 0 20px rgba(212,175,55,0.02); }
        .scp-result-highlight::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--scp-primary), transparent); opacity: 0.5; }
        .scp-result-label { font-size: 0.75rem; color: var(--scp-text-light); text-transform: uppercase; margin-bottom: 0.4rem; letter-spacing: 0.5px; font-weight: 500; display: block; }
        .scp-result-value { font-size: 1.2rem; font-weight: 700; color: #fff; }
        .scp-result-highlight .scp-result-label { color: var(--scp-primary); font-size: 0.85rem; letter-spacing: 1px; font-weight: 600; }
        .scp-result-highlight .scp-result-value { font-size: 2.2rem; color: var(--scp-primary); text-shadow: 0 0 15px rgba(212,175,55,0.3); font-weight: 800; line-height: 1.2; }
        .scp-btn-whatsapp { display: flex; justify-content: center; align-items: center; gap: 12px; background: var(--scp-whatsapp); color: #fff; text-decoration: none; padding: 1rem; border-radius: 12px; font-weight: 600; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.1); }
        .scp-btn-whatsapp:hover { background: var(--scp-whatsapp-hover); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(27, 77, 62, 0.3); }
        .scp-btn-whatsapp svg { width: 22px; height: 22px; fill: currentColor; }
        .scp-pulse-animation { animation: scp-pulse 2.5s infinite cubic-bezier(0.66, 0, 0, 1); }
        @keyframes scp-pulse { 0% { box-shadow: 0 0 0 0 rgba(27, 77, 62, 0.6); } 70% { box-shadow: 0 0 0 12px rgba(27, 77, 62, 0); } 100% { box-shadow: 0 0 0 0 rgba(27, 77, 62, 0); } }
        .scp-loader { border: 2px solid rgba(0,0,0,0.1); border-radius: 50%; border-top: 2px solid #111; width: 18px; height: 18px; animation: scp-spin 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite; }
        @keyframes scp-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // 4. HTML INJECTION
    const target = document.getElementById('solar-pro-widget');
    if (!target) return;
    
    if (target.dataset.loaded) return;
    target.dataset.loaded = 'true';

    target.innerHTML = `
        <div class="scp-calculator-container">
            <div class="scp-card">
                <h2 class="scp-title">Simulador Premium</h2>
                <p class="scp-subtitle">Descubra o potencial de economia do seu imóvel.</p>
                <div class="scp-form-group">
                    <label>Seu Nome Completo</label>
                    <input type="text" id="userName" placeholder="Ex: João da Silva" autocomplete="name">
                </div>
                <div class="scp-form-group">
                    <label>Valor médio da conta de luz (R$)</label>
                    <input type="number" id="billValue" placeholder="Ex: 500" inputmode="numeric">
                </div>
                <div id="scp-error-msg" class="scp-error-message" style="display: none;"></div>
                <button id="calculateBtn" class="scp-btn-primary">
                    <span>Calcular Economia</span>
                    <div class="scp-loader" style="display: none;"></div>
                </button>
                <div id="scp-results" class="scp-results-section" style="display: none;">
                    <div class="scp-results-grid">
                        <div class="scp-result-item">
                            <span class="scp-result-label">Economia Mensal</span>
                            <span id="monthlySavings" class="scp-result-value">R$ 0,00</span>
                        </div>
                        <div class="scp-result-item">
                            <span class="scp-result-label">Economia Anual</span>
                            <span id="yearlySavings" class="scp-result-value">R$ 0,00</span>
                        </div>
                        <div class="scp-result-item">
                            <span class="scp-result-label">Sistema Estimado</span>
                            <span id="systemSize" class="scp-result-value">0,00 kWp</span>
                        </div>
                        <div class="scp-result-item">
                            <span class="scp-result-label">Investimento Base</span>
                            <span id="estInvestment" class="scp-result-value">R$ 0,00</span>
                        </div>
                        <div class="scp-result-item scp-result-highlight">
                            <span class="scp-result-label">Retorno do Investimento (Payback)</span>
                            <span id="payback" class="scp-result-value">0 anos</span>
                        </div>
                    </div>
                    <a href="#" class="scp-btn-whatsapp" target="_blank" style="display: none;">
                        <svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/></svg>
                        Falar com Especialista Mavinic
                    </a>
                </div>
            </div>
        </div>
    `;

    // 5. ELEMENTS
    const elements = {
        userName: document.getElementById('userName'),
        billValue: document.getElementById('billValue'),
        calculateBtn: document.getElementById('calculateBtn'),
        resultsSection: document.getElementById('scp-results'),
        errorMsg: document.getElementById('scp-error-msg'),
        whatsappBtn: document.querySelector('.scp-btn-whatsapp'),
        loader: document.querySelector('.scp-loader'),
        btnText: document.querySelector('#calculateBtn span'),
        monthlySavings: document.getElementById('monthlySavings'),
        yearlySavings: document.getElementById('yearlySavings'),
        systemSize: document.getElementById('systemSize'),
        payback: document.getElementById('payback'),
        estInvestment: document.getElementById('estInvestment')
    };

    if (!elements.calculateBtn || !elements.userName || !elements.billValue) return;

    let leadSent = false;
    let isCalculating = false;

    // 6. LOGIC FUNCTIONS
    const Logic = {
        calculate(conta) {
            const consumo = conta / config.tarifa;
            const kwp = consumo / config.producao_kwp;
            const ecoMes = conta * config.taxa_economia;
            const ecoAno = ecoMes * 12;
            const inv = kwp * config.custo_kwp;
            let pb = (ecoAno > 0) ? inv / ecoAno : 0;
            if (pb > 25) pb = 25;

            return { monthlySavings: ecoMes, yearlySavings: ecoAno, systemSize: kwp, estInvestment: inv, payback: pb };
        },

        validate(nome, conta) {
            elements.userName.classList.remove('scp-input-error');
            elements.billValue.classList.remove('scp-input-error');
            let error = "";

            const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}(\s[a-zA-ZÀ-ÿ\s]{2,})+$/;
            if (!nome || !nameRegex.test(nome.trim())) {
                error = "Por favor, informe seu nome completo válido.";
                elements.userName.classList.add('scp-input-error');
            } else if (isNaN(conta) || conta <= 0) {
                error = "Informe um valor de conta válido.";
                elements.billValue.classList.add('scp-input-error');
            } else if (conta > 100000) {
                error = "Valor acima do limite para simulação online.";
                elements.billValue.classList.add('scp-input-error');
            }

            if (error) {
                elements.errorMsg.textContent = error;
                elements.errorMsg.style.display = 'block';
                return false;
            }
            elements.errorMsg.style.display = 'none';
            return true;
        },

        async sendLead(data, results, retryCount = 2) {
            if (leadSent || !config.webhook) return;
            
            const payload = {
                nome: data.nome,
                valor_conta: Number(data.valor_conta),
                economia_mensal: Number(results.monthlySavings),
                sistema_kwp: Number(results.systemSize),
                investimento: Number(results.estInvestment),
                payback: Number(results.payback),
                timestamp: new Date().toISOString(),
                origem: window.location.href,
                utms: Utils.getUTMs(),
                device: Utils.getDeviceInfo()
            };

            const attempt = async (remaining) => {
                try {
                    await fetch(config.webhook, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    leadSent = true;
                } catch (e) {
                    if (remaining > 0) setTimeout(() => attempt(remaining - 1), 2000);
                    else if (elements.errorMsg) {
                        elements.errorMsg.textContent = "Erro ao registrar dados. Você pode continuar pelo WhatsApp.";
                        elements.errorMsg.style.display = 'block';
                    }
                }
            };
            attempt(retryCount);
        }
    };

    // 7. ANIMATION
    function animate(obj, start, end, duration, type) {
        if (!obj) return;
        let startT = null;
        const step = (t) => {
            if (!startT) startT = t;
            const progress = Math.min((t - startT) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const val = easeOutQuart * (end - start) + start;
            
            if (type === 'BRL') {
                obj.innerHTML = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            } else if (type === 'KWP') {
                obj.innerHTML = val.toFixed(2).replace('.', ',') + ' kWp';
            } else if (type === 'YEARS') {
                if (val >= 24.9) {
                    obj.innerHTML = '25+ anos';
                } else {
                    const displayVal = val.toFixed(1).replace('.', ',');
                    obj.innerHTML = displayVal + (val <= 1.1 ? ' ano' : ' anos');
                }
            }
            
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    // 8. EVENT LISTENERS
    elements.calculateBtn.addEventListener('click', () => {
        if (isCalculating) return;
        const nome = elements.userName.value.trim();
        const conta = parseFloat(elements.billValue.value);

        if (!Logic.validate(nome, conta)) return;

        isCalculating = true;
        elements.calculateBtn.disabled = true;
        elements.loader.style.display = 'block';
        elements.btnText.style.opacity = '0.5';

        Utils.trackEvent('simulacao_iniciada', { nome });

        setTimeout(() => {
            const results = Logic.calculate(conta);
            elements.resultsSection.style.display = 'block';
            
            animate(elements.monthlySavings, 0, results.monthlySavings, 800, 'BRL');
            animate(elements.yearlySavings, 0, results.yearlySavings, 800, 'BRL');
            animate(elements.systemSize, 0, results.systemSize, 800, 'KWP');
            animate(elements.estInvestment, 0, results.estInvestment, 800, 'BRL');
            animate(elements.payback, 0, results.payback, 800, 'YEARS');

            if (config.whatsapp && elements.whatsappBtn) {
                const msg = `Olá! Sou ${nome} e vi que posso economizar ${results.monthlySavings.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}/mês com energia solar. Pode me ajudar?`;
                elements.whatsappBtn.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;
                elements.whatsappBtn.style.display = 'flex';
                elements.whatsappBtn.classList.add('scp-pulse-animation');
            }

            Utils.trackEvent('simulacao_concluida', { economia: results.monthlySavings });
            Logic.sendLead({ nome, valor_conta: conta }, results);

            isCalculating = false;
            elements.calculateBtn.disabled = false;
            elements.loader.style.display = 'none';
            elements.btnText.style.opacity = '1';
            
            setTimeout(() => elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        }, 800);
    });

    const reset = () => { leadSent = false; elements.errorMsg.style.display = 'none'; };
    elements.userName.addEventListener('input', reset);
    elements.billValue.addEventListener('input', reset);

    if (elements.whatsappBtn) {
        elements.whatsappBtn.addEventListener('click', () => {
            Utils.trackEvent('click_whatsapp', { nome: elements.userName.value });
        });
    }

})();

