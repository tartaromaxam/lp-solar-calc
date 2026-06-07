(function() {
    window.renderSolarWidget = function() {
        // 1. CONFIG LOAD (Proteção Global)
        window.spc_config = window.spc_config || {};
        
        const scriptTag = document.currentScript;
        const scriptUrl = scriptTag ? scriptTag.src : '';
        let apiBaseUrl = '';
        if (scriptUrl && scriptUrl.startsWith('http')) {
            try {
                apiBaseUrl = new URL(scriptUrl).origin;
            } catch (e) {
                console.error("Error parsing script URL:", e);
            }
        }
    
    const config = {
        tarifa: parseFloat(window.spc_config?.tarifa) || 0.82,
        custo_kwp: parseFloat(window.spc_config?.custo_kwp) || 4800,
        producao_kwp: parseFloat(window.spc_config?.producao_kwp) || 145,
        taxa_economia: parseFloat(window.spc_config?.taxa_economia) || 0.95,
        whatsapp: window.spc_config?.whatsapp || '5544988160797',
        webhook: window.spc_config?.webhook || 'https://hook.us2.make.com/5177ub4bdfmkujgdw81l9l3c42mf81b3',
        cor_primaria: window.spc_config?.cor_primaria || '#D4AF37', // Gold Mavinic
        cor_secundaria: window.spc_config?.cor_secundaria || '#F5C518',
        inflacao_energetica: 0.08, // 8% ao ano
        taxa_financiamento: 0.014, // 1.4% ao mês
        prazo_financiamento: 60, // 60 meses padrão
        painel_watts: 550,
        painel_area: 2.58
    };

    // Helper to extract RGB numbers from hex
    const hexToRgbString = (hex) => {
        let cleaned = hex.replace('#', '');
        if (cleaned.length === 3) {
            cleaned = cleaned.split('').map(char => char + char).join('');
        }
        const r = parseInt(cleaned.substring(0, 2), 16);
        const g = parseInt(cleaned.substring(2, 4), 16);
        const b = parseInt(cleaned.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    };

    const primaryRgb = hexToRgbString(config.cor_primaria);

    const DEBUG = false;

    // 2. UTILS
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
        },
        formatBRL(val) {
            return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    };

    // 3. CSS INJECTION (Premium SaaS/Tesla Style)
    if (!document.getElementById('scp-widget-styles')) {
        const style = document.createElement('style');
        style.id = 'scp-widget-styles';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root {
            --scp-primary: ${config.cor_primaria};
            --scp-primary-rgb: ${primaryRgb};
            --scp-bg-glass: rgba(15, 15, 18, 0.7);
            --scp-border: rgba(255, 255, 255, 0.08);
            --scp-text-main: #FFFFFF;
            --scp-text-muted: #A0A0A0;
            --scp-radius-lg: 24px;
            --scp-radius-md: 16px;
            --scp-shadow-soft: 0 20px 40px rgba(0, 0, 0, 0.4);
            --scp-glass-shine: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
            --scp-glow-impact: 0 0 30px rgba(${primaryRgb}, 0.2);
        }

        @keyframes scp-shine-sweep {
            0% { left: -100%; }
            20% { left: 100%; }
            100% { left: 100%; }
        }

        .scp-widget {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: var(--scp-text-main);
            max-width: 650px;
            margin: 0 auto;
            line-height: 1.5;
        }

        .scp-glass-card {
            background: var(--scp-bg-glass);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--scp-border);
            border-radius: var(--scp-radius-lg);
            padding: 2.5rem 2rem;
            box-shadow: var(--scp-shadow-soft);
            position: relative;
            overflow: hidden;
        }

        .scp-glass-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: var(--scp-glass-shine);
            pointer-events: none;
        }

        .scp-header { text-align: center; margin-bottom: 2.5rem; }
        .scp-title { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, #FFF, var(--scp-primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.02em; }
        .scp-subtitle { color: var(--scp-text-muted); font-size: 1rem; }

        .scp-form-grid { display: grid; gap: 1.5rem; margin-bottom: 2rem; }
        .scp-field label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--scp-text-muted); margin-bottom: 0.75rem; }
        .scp-input { 
            width: 100%; padding: 1.1rem 1.25rem; 
            background: rgba(255,255,255,0.03); 
            border: 1px solid var(--scp-border); 
            border-radius: var(--scp-radius-md); 
            color: #fff; font-size: 1.1rem; 
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scp-input:focus { border-color: var(--scp-primary); outline: none; background: rgba(255,255,255,0.06); box-shadow: 0 0 20px rgba(${primaryRgb}, 0.15); }

        .scp-btn-main {
            width: 100%; padding: 1.2rem; 
            background: var(--scp-primary); 
            color: #000; font-weight: 700; font-size: 1.1rem;
            border: none; border-radius: var(--scp-radius-md); 
            cursor: pointer; transition: all 0.4s;
            text-transform: uppercase; letter-spacing: 0.05em;
            display: flex; justify-content: center; align-items: center; gap: 10px;
        }
        .scp-btn-main:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4); filter: brightness(1.1); }
        .scp-btn-main:active { transform: translateY(-1px); }

        /* LOADING OVERLAY */
        .scp-loading-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15,15,18,0.95); z-index: 10;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            opacity: 0; pointer-events: none; transition: opacity 0.4s;
        }
        .scp-loading-overlay.active { opacity: 1; pointer-events: all; }
        .scp-spinner { width: 50px; height: 50px; border: 3px solid rgba(${primaryRgb}, 0.1); border-top-color: var(--scp-primary); border-radius: 50%; animation: scp-spin 1s linear infinite; margin-bottom: 1rem; }
        @keyframes scp-spin { to { transform: rotate(360deg); } }

        /* RESULTS AREA */
        .scp-results { display: none; margin-top: 3rem; animation: scp-slide-up 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
        @keyframes scp-slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .scp-main-impact {
            text-align: center; padding: 3rem 2rem; background: rgba(${primaryRgb}, 0.03);
            border: 1px solid rgba(${primaryRgb}, 0.15); border-radius: var(--scp-radius-lg);
            margin-bottom: 2.5rem; position: relative; overflow: hidden;
            box-shadow: var(--scp-glow-impact);
        }
        .scp-main-impact::after {
            content: ''; position: absolute; top: 0; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
            transform: skewX(-20deg); animation: scp-shine-sweep 4s infinite;
        }
        .scp-main-impact-label { font-size: 0.85rem; color: var(--scp-primary); font-weight: 700; margin-bottom: 0.75rem; display: block; text-transform: uppercase; letter-spacing: 0.1em; }
        .scp-main-impact-value { font-size: 3.8rem; font-weight: 900; line-height: 1; margin-bottom: 1.2rem; display: block; color: #fff; text-shadow: 0 0 25px rgba(${primaryRgb}, 0.4); }
        .scp-main-impact-sub { font-size: 0.85rem; color: var(--scp-text-muted); max-width: 400px; margin: 0 auto; }

        .scp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .scp-stat-card { background: rgba(255,255,255,0.03); border: 1px solid var(--scp-border); padding: 1.5rem; border-radius: var(--scp-radius-md); text-align: center; }
        .scp-stat-label { font-size: 0.7rem; color: var(--scp-text-muted); text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
        .scp-stat-value { font-size: 1.25rem; font-weight: 700; color: #fff; }
        .scp-stat-detail { font-size: 0.85rem; color: var(--scp-primary); font-weight: 600; margin-top: 0.4rem; display: block; }

        /* COMPARISON BLOCK */
        .scp-comparison { margin-bottom: 2.5rem; }
        .scp-comp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--scp-border); border-radius: var(--scp-radius-md); overflow: hidden; border: 1px solid var(--scp-border); }
        .scp-comp-col { background: var(--scp-bg-glass); padding: 1.5rem; }
        .scp-comp-col.active { background: rgba(${primaryRgb}, 0.03); }
        .scp-comp-title { font-size: 0.8rem; font-weight: 700; margin-bottom: 1.2rem; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
        .scp-comp-list { list-style: none; padding: 0; margin: 0; font-size: 0.85rem; }
        .scp-comp-list li { margin-bottom: 10px; display: flex; align-items: flex-start; gap: 10px; color: var(--scp-text-muted); }
        .scp-comp-list li::before { content: '✕'; color: #ff4d4d; font-weight: bold; flex-shrink: 0; }
        .scp-comp-col.active .scp-comp-list li::before { content: '✓'; color: #2ecc71; }
        .scp-comp-col.active .scp-comp-list li { color: #fff; }

        /* TIMELINE */
        .scp-timeline { margin-bottom: 2.5rem; }
        .scp-timeline-title { font-size: 1rem; font-weight: 700; margin-bottom: 1.5rem; text-align: center; }
        .scp-timeline-track { display: flex; justify-content: space-between; position: relative; padding: 0 10px; }
        .scp-timeline-track::before { content: ''; position: absolute; top: 12px; left: 10px; right: 10px; height: 2px; background: var(--scp-border); z-index: 0; }
        .scp-timeline-step { position: relative; z-index: 1; text-align: center; flex: 1; }
        .scp-timeline-dot { width: 24px; height: 24px; background: #222; border: 2px solid var(--scp-border); border-radius: 50%; margin: 0 auto 10px; transition: all 0.5s; }
        .scp-timeline-step.active .scp-timeline-dot { background: var(--scp-primary); border-color: var(--scp-primary); box-shadow: 0 0 15px rgba(${primaryRgb}, 0.5); }
        .scp-timeline-year { font-size: 0.7rem; color: var(--scp-text-muted); font-weight: 600; }
        .scp-timeline-val { font-size: 0.8rem; font-weight: 700; margin-top: 5px; opacity: 0; transition: all 0.5s; transform: translateY(5px); }
        .scp-timeline-step.active .scp-timeline-val { opacity: 1; transform: translateY(0); }

        /* FINANCING BOX */
        .scp-finance-box { background: #111; padding: 1.5rem; border-radius: var(--scp-radius-md); border-left: 4px solid var(--scp-primary); margin-bottom: 2.5rem; }
        .scp-finance-header { font-size: 0.9rem; font-weight: 700; margin-bottom: 1rem; display: flex; justify-content: space-between; }
        .scp-finance-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; font-size: 0.85rem; }
        .scp-finance-val { font-weight: 700; }
        .scp-finance-val.green { color: #2ecc71; }

        /* CTA */
        .scp-cta-whatsapp {
            background: #1b4d3e; color: #fff; text-decoration: none;
            padding: 1.2rem; border-radius: var(--scp-radius-md);
            display: flex; flex-direction: column; align-items: center; gap: 4px;
            transition: all 0.3s; font-weight: 700; border: 1px solid rgba(255,255,255,0.05);
        }
        .scp-cta-whatsapp:hover { background: #236350; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        .scp-cta-main-text { font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
        .scp-cta-sub-text { font-size: 0.75rem; opacity: 0.8; font-weight: 400; }
        .scp-cta-whatsapp svg { width: 20px; height: 20px; fill: currentColor; }

        .scp-error { color: #ff4d4d; font-size: 0.8rem; margin-top: 1rem; text-align: center; display: none; }

        @media (max-width: 480px) {
            .scp-glass-card { padding: 2rem 1.25rem; }
            .scp-main-impact-value { font-size: 2.5rem; }
            .scp-grid { grid-template-columns: 1fr; }
            .scp-comp-grid { grid-template-columns: 1fr; }
            .scp-comp-col { border-bottom: 1px solid var(--scp-border); }
        }
    `;
        document.head.appendChild(style);
    }

    // 4. HTML INJECTION
    const target = document.getElementById('solar-pro-widget');
    if (!target || target.dataset.loaded) return;
    target.dataset.loaded = 'true';

    target.innerHTML = `
        <div class="scp-widget">
            <div class="scp-glass-card">
                <div class="scp-loading-overlay">
                    <div class="scp-spinner"></div>
                    <p style="font-weight: 700; color: var(--scp-primary); text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem;">Projetando seu patrimônio...</p>
                    <p style="font-size: 0.75rem; color: #666; margin-top: 5px;">Analisando dados de irradiação solar</p>
                </div>

                <div class="scp-header">
                    <h2 class="scp-title">Simulador de Patrimônio</h2>
                    <p class="scp-subtitle">Transforme sua conta de luz em liberdade financeira.</p>
                </div>

                <div id="scp-form">
                    <div class="scp-form-grid">
                        <div class="scp-field">
                            <label>Seu Nome Completo</label>
                            <input type="text" id="scp-name" class="scp-input" placeholder="Ex: Marcelo Silva">
                        </div>
                        <div class="scp-field">
                            <label>Seu WhatsApp</label>
                            <input type="tel" id="scp-phone" class="scp-input" placeholder="Ex: (11) 99999-9999">
                        </div>
                        <div class="scp-field">
                            <label>Valor médio da conta (R$)</label>
                            <input type="number" id="scp-bill" class="scp-input" placeholder="Ex: 500" inputmode="numeric">
                        </div>
                    </div>
                    <button id="scp-calc-btn" class="scp-btn-main">
                        Ver Simulação Completa
                    </button>
                    <div id="scp-form-error" class="scp-error"></div>
                </div>

                <div id="scp-results" class="scp-results">
                    <div class="scp-main-impact">
                        <span class="scp-main-impact-label">Patrimônio acumulado em 25 anos:</span>
                        <span id="scp-val-25y" class="scp-main-impact-value">R$ 0,00</span>
                        <p class="scp-main-impact-sub">Cálculo baseado na vida útil do sistema, eliminando a inflação energética do período.</p>
                    </div>

                    <div class="scp-grid">
                        <div class="scp-stat-card">
                            <span class="scp-stat-label">Economia Mensal</span>
                            <span id="scp-val-monthly" class="scp-stat-value">R$ 0,00</span>
                        </div>
                        <div class="scp-stat-card">
                            <span class="scp-stat-label">Retorno (Payback)</span>
                            <span id="scp-val-payback" class="scp-stat-value">0 anos</span>
                        </div>
                        <div class="scp-stat-card">
                            <span class="scp-stat-label">Tamanho do Sistema</span>
                            <span id="scp-val-kwp" class="scp-stat-value">0,00 kWp</span>
                            <span id="scp-val-panels" class="scp-stat-detail">≈ 0 painéis</span>
                        </div>
                        <div class="scp-stat-card">
                            <span class="scp-stat-label">Área Necessária</span>
                            <span id="scp-val-area" class="scp-stat-value">0 m²</span>
                            <span class="scp-stat-detail">Estimativa aproximada</span>
                        </div>
                    </div>

                    <div class="scp-finance-box">
                        <div class="scp-finance-header">
                            <span>OPÇÃO DE FINANCIAMENTO</span>
                            <span style="color: var(--scp-primary);">SEM ENTRADA</span>
                        </div>
                        <div class="scp-finance-row">
                            <span>Sua conta atual:</span>
                            <span id="scp-fin-current" class="scp-finance-val">R$ 0,00</span>
                        </div>
                        <div class="scp-finance-row">
                            <span>Parcela estimada (60x):</span>
                            <span id="scp-fin-parcel" class="scp-finance-val green">R$ 0,00</span>
                        </div>
                        <div style="font-size: 0.7rem; color: #666; text-align: center; margin-top: 10px;">
                            Troque sua conta por um patrimônio. Parcela menor que o gasto atual.
                        </div>
                    </div>

                    <div class="scp-timeline">
                        <p class="scp-timeline-title">Crescimento do seu Patrimônio</p>
                        <div class="scp-timeline-track">
                            <div class="scp-timeline-step" id="step-1">
                                <div class="scp-timeline-dot"></div>
                                <span class="scp-timeline-year">1 Ano</span>
                                <div class="scp-timeline-val" id="tl-1">R$ 0</div>
                            </div>
                            <div class="scp-timeline-step" id="step-5">
                                <div class="scp-timeline-dot"></div>
                                <span class="scp-timeline-year">5 Anos</span>
                                <div class="scp-timeline-val" id="tl-5">R$ 0</div>
                            </div>
                            <div class="scp-timeline-step" id="step-10">
                                <div class="scp-timeline-dot"></div>
                                <span class="scp-timeline-year">10 Anos</span>
                                <div class="scp-timeline-val" id="tl-10">R$ 0</div>
                            </div>
                            <div class="scp-timeline-step" id="step-25">
                                <div class="scp-timeline-dot"></div>
                                <span class="scp-timeline-year">25 Anos</span>
                                <div class="scp-timeline-val" id="tl-25">R$ 0</div>
                            </div>
                        </div>
                    </div>

                    <div class="scp-comparison">
                        <div class="scp-comp-grid">
                            <div class="scp-comp-col">
                                <div class="scp-comp-title">Sem Energia Solar</div>
                                <ul class="scp-comp-list">
                                    <li>Conta aumenta todo ano</li>
                                    <li>Dependência total</li>
                                    <li>Gasto contínuo e perdido</li>
                                    <li>Sem retorno financeiro</li>
                                </ul>
                            </div>
                            <div class="scp-comp-col active">
                                <div class="scp-comp-title" style="color: var(--scp-primary);">Com Energia Solar</div>
                                <ul class="scp-comp-list">
                                    <li>Economia recorrente</li>
                                    <li>Patrimônio energético</li>
                                    <li>Previsibilidade mensal</li>
                                    <li>Valorização do imóvel</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <a id="scp-whatsapp-btn" href="#" class="scp-cta-whatsapp" style="background: var(--scp-primary); color: #000; text-align: center; justify-content: center; display: flex; flex-direction: column; align-items: center; text-decoration: none; padding: 1.5rem 1rem; border-radius: var(--scp-radius-md);">
                        <div class="scp-cta-main-text" style="font-size: 1.25rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 10px;">
                            RECEBER DIAGNÓSTICO SOLAR GRATUITO 🚀
                        </div>
                        <span class="scp-cta-sub-text" style="color: rgba(0, 0, 0, 0.7); font-size: 0.85rem; font-weight: 600; margin-top: 5px;">Configure seu telhado e relógio via satélite</span>
                    </a>
                </div>
            </div>
        </div>
    `;

    // 5. ELEMENTS
    const elements = {
        name: document.getElementById('scp-name'),
        phone: document.getElementById('scp-phone'),
        bill: document.getElementById('scp-bill'),
        btn: document.getElementById('scp-calc-btn'),
        results: document.getElementById('scp-results'),
        overlay: document.querySelector('.scp-loading-overlay'),
        error: document.getElementById('scp-form-error'),
        val25y: document.getElementById('scp-val-25y'),
        valMonthly: document.getElementById('scp-val-monthly'),
        valPayback: document.getElementById('scp-val-payback'),
        valKwp: document.getElementById('scp-val-kwp'),
        valPanels: document.getElementById('scp-val-panels'),
        valArea: document.getElementById('scp-val-area'),
        finCurrent: document.getElementById('scp-fin-current'),
        finParcel: document.getElementById('scp-fin-parcel'),
        whatsapp: document.getElementById('scp-whatsapp-btn'),
        tl1: document.getElementById('tl-1'),
        tl5: document.getElementById('tl-5'),
        tl10: document.getElementById('tl-10'),
        tl25: document.getElementById('tl-25')
    };

    // 6. CALCULATIONS
    const Logic = {
        calculate(bill) {
            const consumption = bill / config.tarifa;
            const kwp = consumption / config.producao_kwp;
            const savingsMonthly = bill * config.taxa_economia;
            const investment = kwp * config.custo_kwp;
            
            // Economia acumulada com inflação energética
            let total25y = 0;
            let yearlyEcon = savingsMonthly * 12;
            const savingsTimeline = { 1: 0, 5: 0, 10: 0, 25: 0 };
            
            for (let year = 1; year <= 25; year++) {
                total25y += yearlyEcon;
                if (year === 1) savingsTimeline[1] = total25y;
                if (year === 5) savingsTimeline[5] = total25y;
                if (year === 10) savingsTimeline[10] = total25y;
                if (year === 25) savingsTimeline[25] = total25y;
                yearlyEcon *= (1 + config.inflacao_energetica);
            }

            const payback = investment / (savingsMonthly * 12);
            
            // Financiamento (PMT)
            const n = config.prazo_financiamento;
            const i = config.taxa_financiamento;
            const parcel = investment * ( (i * Math.pow(1+i, n)) / (Math.pow(1+i, n) - 1) );

            const panels = Math.ceil((kwp * 1000) / config.painel_watts);
            const area = panels * config.painel_area;

            return {
                savingsMonthly,
                total25y,
                payback: Math.min(payback, 25),
                kwp,
                investment,
                parcel,
                panels,
                area,
                timeline: savingsTimeline
            };
        },

        validate(name, bill, phone) {
            elements.name.style.borderColor = '';
            elements.bill.style.borderColor = '';
            elements.phone.style.borderColor = '';
            elements.error.style.display = 'none';

            if (!name || name.trim().split(' ').length < 2) {
                elements.name.style.borderColor = '#ff4d4d';
                elements.error.textContent = "Informe seu nome completo.";
                elements.error.style.display = 'block';
                return false;
            }
            if (!phone || phone.trim().length < 8) {
                elements.phone.style.borderColor = '#ff4d4d';
                elements.error.textContent = "Informe um WhatsApp válido.";
                elements.error.style.display = 'block';
                return false;
            }
            if (!bill || bill < 150) {
                elements.bill.style.borderColor = '#ff4d4d';
                elements.error.textContent = "O valor mínimo para simulação é R$ 150,00.";
                elements.error.style.display = 'block';
                return false;
            }
            return true;
        }
    };

    // 7. UI UPDATES
    function animateValue(el, start, end, duration, format = 'BRL') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = progress * (end - start) + start;
            
            if (format === 'BRL') {
                el.textContent = Utils.formatBRL(value);
            } else if (format === 'KWP') {
                el.textContent = value.toFixed(2).replace('.', ',') + ' kWp';
            } else if (format === 'YEARS') {
                el.textContent = value.toFixed(1).replace('.', ',') + ' anos';
            } else if (format === 'INT') {
                el.textContent = Math.floor(value);
            }
            
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    async function sendLead(name, bill, phone, results) {
        const payload = {
            nome: name,
            whatsapp: phone,
            valor_conta: Number(bill),
            economia_mensal: Number(results.savingsMonthly),
            sistema_kwp: Number(results.kwp),
            investimento: Number(results.investment),
            payback: Number(results.payback),
            economia_25anos: Number(results.total25y),
            timestamp: new Date().toISOString(),
            origem: window.location.href,
            utms: Utils.getUTMs(),
            device: Utils.getDeviceInfo()
        };

        try {
            // 1. Webhook Principal (Make.com)
            await fetch(config.webhook, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // 2. Backup Interna (API Local)
            const backupUrl = apiBaseUrl ? `${apiBaseUrl}/api/leads` : '/api/leads';
            fetch(backupUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    whatsapp: phone,
                    billAmount: bill
                })
            }).catch(err => console.error("Erro no backup interno:", err));

        } catch (e) {
            console.error("Lead send failed", e);
        }
    }

    // 8. EVENTS
    elements.btn.addEventListener('click', () => {
        const name = elements.name.value;
        const bill = parseFloat(elements.bill.value);
        const phone = elements.phone.value;

        if (!Logic.validate(name, bill, phone)) return;

        // Show Loading
        elements.overlay.classList.add('active');
        Utils.trackEvent('calc_click', { name });

        setTimeout(() => {
            const res = Logic.calculate(bill);
            
            elements.overlay.classList.remove('active');
            elements.results.style.display = 'block';

            // Main Animation
            animateValue(elements.val25y, 0, res.total25y, 1500);
            animateValue(elements.valMonthly, 0, res.savingsMonthly, 1000);
            animateValue(elements.valPayback, 0, res.payback, 1000, 'YEARS');
            animateValue(elements.valKwp, 0, res.kwp, 1000, 'KWP');
            elements.valPanels.textContent = `≈ ${res.panels} módulos solares`;
            elements.valArea.textContent = `${Math.ceil(res.area)} m²`;
            
            elements.finCurrent.textContent = Utils.formatBRL(bill);
            animateValue(elements.finParcel, 0, res.parcel, 1200);

            // Timeline Animation
            [1, 5, 10, 25].forEach((y, i) => {
                setTimeout(() => {
                    const step = document.getElementById(`step-${y}`);
                    const val = document.getElementById(`tl-${y}`);
                    step.classList.add('active');
                    val.textContent = Utils.formatBRL(res.timeline[y]).split(',')[0];
                }, 1000 + (i * 300));
            });

            // Redireciona para o Diagnóstico Solar Completo
            const targetUrl = `/demo/?nome=${encodeURIComponent(name)}&whatsapp=${encodeURIComponent(phone)}&conta=${bill}`;
            elements.whatsapp.href = targetUrl;
            elements.whatsapp.removeAttribute('target');

            // Send Lead
            sendLead(name, bill, phone, res);

            // Smooth Scroll
            setTimeout(() => {
                elements.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

        }, 1500);
    });

    }; // End of window.renderSolarWidget

    // Auto-init for standard HTML environments or initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.renderSolarWidget);
    } else {
        window.renderSolarWidget();
    }
})();
