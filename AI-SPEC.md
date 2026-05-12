# AI-SPEC: Solar Pro Calculator & Landing Page

This document provides a technical specification for AI agents to understand, maintain, and extend the Solar Energy project.

## Project Overview
The project consists of two main parts:
1.  **Solar Energy Landing Page (LP)**: A Next.js 15 application (App Router) designed for high-ticket lead generation.
2.  **Solar Pro Calculator (Widget)**: A portable, vanilla JavaScript widget (`spc-widget.js`) integrated into the LP but capable of running standalone.

---

## Technical Stack
-   **Frontend (LP)**: Next.js 15, Tailwind CSS, Framer Motion, Lucide React.
-   **Widget**: Vanilla JavaScript, CSS-in-JS (Dynamic styles injection).
-   **Backend/Integrations**:
    -   **Make.com**: Webhook for lead processing (`https://hook.us2.make.com/...`).
    -   **Railway**: Bot API for Telegram notifications (`https://bot-telegram-production-0a8d.up.railway.app/...`).
    -   **WhatsApp**: Direct lead communication.

---

## Core Logic: Solar Calculator
The calculation logic resides in `spc-widget.js`.

### Formulas
1.  **Consumption (kWh)**: `bill_value / tarifa`
2.  **System Size (kWp)**: `consumption / producao_kwp`
3.  **Monthly Savings**: `bill_value * taxa_economia`
4.  **Yearly Savings**: `monthly_savings * 12`
5.  **Estimated Investment**: `system_size * custo_kwp`
6.  **Payback (Years)**: `investment / yearly_savings` (Capped at 25 years).

### Default Constants (Configurable via `window.spc_config`)
-   `tarifa`: R$ 0.82
-   `custo_kwp`: R$ 4800
-   `producao_kwp`: 145 (kWh per month per kWp)
-   `taxa_economia`: 95% (0.95)

---

## Integration Points

### 1. Lead Capture (Next.js Form)
The `LeadForm.tsx` component sends data to two endpoints in parallel:
-   **Railway**: Primary database/notification system.
-   **Make.com**: Automation workflow.

### 2. Lead Capture (Widget)
The `spc-widget.js` sends leads via a `POST` request to the configured webhook.
-   **Mode**: `no-cors` (to avoid preflight issues on standard static hosts).
-   **Payload**: Includes name, bill value, calculated results, UTMs, and device info.

### 3. Tracking (GTM/DataLayer)
The widget pushes events to `window.dataLayer`:
-   `simulacao_iniciada`: When the user clicks calculate.
-   `simulacao_concluida`: When results are displayed.
-   `click_whatsapp`: When the user clicks the WhatsApp button.

---

## Deployment & Hosting
-   **LP**: Hosted on Vercel (`solar.mavinic.com.br`).
-   **Widget Script**: Located at `/public/spc-widget.js`.

---

## Maintenance Notes
-   **CLS Prevention**: The `SolarWidget.tsx` component uses `min-h-[700px]` to prevent layout shift while the widget script loads.
-   **Hydration**: The widget container `div#solar-pro-widget` MUST remain empty in the React source to avoid hydration mismatches.
-   **Cache Busting**: Use query parameters (e.g., `?v=1.0.1`) when updating the widget script.
