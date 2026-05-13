# Solar Pro Landing Page & Calculator

A premium, high-conversion ecosystem for solar energy lead generation.

## 🚀 Overview
This project combines a high-fidelity **Next.js Landing Page** with a modular **Solar Pro Calculator Widget**. It's designed to provide a "wow" experience for users while capturing high-quality leads for solar energy companies.

## 📁 Project Structure
- **`app/`**: Next.js 15 (App Router) source code.
- **`public/spc-widget.js`**: The standalone Solar Calculator logic and UI.
- **`AI-SPEC.md`**: Technical specification for AI agents.
- **`ARCHITECTURE.md`**: System design and data flow overview.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org)
- **Styling**: Tailwind CSS, Vanilla CSS (Widget)
- **Animations**: Framer Motion
- **Integrations**: Make.com (Webhooks), Vercel API (Google Sheets & Telegram)

## 📖 Documentation for AI Agents
If you are an AI working on this project, please read these files first:
1. [**AI-SPEC.md**](./AI-SPEC.md): Understand the calculation logic and integration schemas.
2. [**ARCHITECTURE.md**](./ARCHITECTURE.md): Understand the project structure and dependencies.

## ⚙️ Setup & Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## 🌐 Deployment
The project is configured for deployment on **Vercel**. 
Subdomain: `solar.mavinic.com.br`

### Environment Variables
Ensure the following variables are set in Vercel:
- `TELEGRAM_TOKEN`: Bot token for notifications.
- `TELEGRAM_CHAT_ID`: Destination chat ID.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account for Sheets.
- `GOOGLE_PRIVATE_KEY`: Private key (replace `\n` with actual newlines).
- `GOOGLE_SHEET_ID`: Target Spreadsheet ID.
- `NEXT_PUBLIC_API_URL`: (Optional) Custom API endpoint if not using internal routes.

## 🛠️ Maintenance & Updates
- **Widget Configuration**: Business rules (rates, costs) are managed in `app/components/SolarWidget.tsx` via `window.spc_config`.
- **Lead Webhooks**: Webhooks are defined in both `LeadForm.tsx` and `SolarWidget.tsx`. Ensure these match your CRM/Automation tool.
- **Cache Control**: The `vercel.json` file is configured to serve `spc-widget.js` with `max-age=0` to ensure users always receive the latest version without aggressive CDN caching.

## 📈 Conversion Funnel
1. **Awareness**: SEO-optimized landing page.
2. **Engagement**: Interactive simulation via `spc-widget.js`.
3. **Capture**: 
   - Primary: Calculation results lead to WhatsApp with pre-filled context.
   - Secondary: LeadForm at the bottom for direct consultations.
4. **Processing**: Automated delivery to Google Sheets (via Railway/Make) and Telegram notifications.

