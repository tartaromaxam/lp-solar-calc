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
            --scp-primary: ${config.cor_primaria};
            --scp-secondary: ${config.cor_secundaria};
            --scp-bg-glass: rgba(255, 255, 255, 0.1);
            --scp-bg-glass-dark: rgba(30, 58, 95, 0.05);
            --scp-text-dark: #1e3a5f;
            --scp-text-light: #546e7a;
            --scp-error: #ff4d4d;
            --scp-whatsapp: #25D366;
            --scp-shadow: 0 12px 40px rgba(30, 58, 95, 0.15);
            --scp-radius: 16px;
        }
        .scp-calculator-container { font-family: 'Inter', sans-serif; max-width: 600px; margin: 1rem auto; color: var(--scp-text-dark); }
        .scp-card { background: #fff; border-radius: var(--scp-radius); padding: 2rem; box-shadow: var(--scp-shadow); border: 1px solid rgba(0,0,0,0.05); position: relative; overflow: hidden; }
        .scp-title { font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem; text-align: center; background: linear-gradient(45deg, var(--scp-primary), var(--scp-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .scp-subtitle { font-size: 0.9rem; color: var(--scp-text-light); text-align: center; margin-bottom: 1.5rem; }
        .scp-form-group { margin-bottom: 1rem; }
        .scp-form-group label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--scp-text-dark); }
        .scp-form-group input { width: 100%; padding: 0.7rem 1rem; border: 2px solid #eee; border-radius: 10px; font-size: 1rem; box-sizing: border-box; transition: all 0.3s; }
        .scp-form-group input:focus { border-color: var(--scp-primary); outline: none; box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1); }
        .scp-input-error { border-color: var(--scp-error) !important; background: rgba(255,77,77,0.05); }
        .scp-error-message { color: var(--scp-error); font-size: 0.8rem; margin-bottom: 1rem; padding: 0.5rem; background: rgba(255,77,77,0.1); border-radius: 8px; text-align: center; }
        .scp-btn-primary { width: 100%; padding: 0.9rem; border: none; border-radius: 10px; background: linear-gradient(45deg, var(--scp-primary), #2c5282); color: #fff; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; transition: 0.3s; box-shadow: 0 4px 15px rgba(30, 58, 95, 0.2); }
        .scp-btn-primary:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.1); }
        .scp-btn-primary:disabled { opacity: 0.8; cursor: not-allowed; }
        .scp-results-section { margin-top: 2rem; animation: scp-fade-in 0.4s ease-out forwards; }
        @keyframes scp-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .scp-results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1.5rem; }
        .scp-result-item { background: var(--scp-bg-glass-dark); padding: 1rem; border-radius: 10px; text-align: center; }
        .scp-result-highlight { grid-column: span 2; background: linear-gradient(45deg, rgba(30,58,95,0.03), rgba(46,204,113,0.03)); border: 1px solid var(--scp-primary); }
        .scp-result-label { font-size: 0.75rem; color: var(--scp-text-light); text-transform: uppercase; margin-bottom: 0.2rem; }
        .scp-result-value { font-size: 1.1rem; font-weight: 800; }
        .scp-result-highlight .scp-result-value { font-size: 1.6rem; color: var(--scp-primary); }
        .scp-btn-whatsapp { display: flex; justify-content: center; align-items: center; gap: 10px; background: var(--scp-whatsapp); color: #fff; text-decoration: none; padding: 0.9rem; border-radius: 10px; font-weight: 700; transition: 0.3s; }
        .scp-btn-whatsapp:hover { filter: brightness(1.1); transform: scale(1.02); color: #fff; }
        .scp-pulse-animation { animation: scp-pulse 2s infinite; }
        @keyframes scp-pulse { 0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); } 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); } }
        .scp-loader { border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top: 2px solid #fff; width: 16px; height: 16px; animation: scp-spin 1s linear infinite; }
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
                <h2 class="scp-title">Simulador Mavinic Solar</h2>
                <p class="scp-subtitle">Descubra sua economia em poucos segundos.</p>
                <div class="scp-form-group">
                    <label>Seu Nome Completo</label>
                    <input type="text" id="userName" placeholder="Ex: João Silva">
                </div>
                <div class="scp-form-group">
                    <label>Valor da conta mensal (R$)</label>
                    <input type="number" id="billValue" placeholder="Ex: 500">
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
                            <span class="scp-result-label">Sistema Sugerido</span>
                            <span id="systemSize" class="scp-result-value">0,00 kWp</span>
                        </div>
                        <div class="scp-result-item">
                            <span class="scp-result-label">Investimento Estimado</span>
                            <span id="estInvestment" class="scp-result-value">R$ 0,00</span>
                        </div>
                        <div class="scp-result-item scp-result-highlight">
                            <span class="scp-result-label">Tempo de Retorno (Payback)</span>
                            <span id="payback" class="scp-result-value">0 anos</span>
                        </div>
                    </div>
                    <a href="#" class="scp-btn-whatsapp" target="_blank" style="display: none;">
                        Falar com Especialista no WhatsApp
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

