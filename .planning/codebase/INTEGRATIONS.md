# Integrations - Solar Energy LP

The project uses a multi-layered lead capture and notification system.

## Lead Capture Flow
1. **Frontend Submit**: `LeadForm.tsx` sends data in parallel to:
   - **Railway**: `https://bot-telegram-production-0a8d.up.railway.app/api/leads`
   - **Make.com**: `https://hook.us2.make.com/uenwaqqn6cjyrx754med5l5hcarhby46`
2. **Internal API**: `app/api/leads/route.ts` (triggered by external integrations or direct calls) handles:
   - **Google Sheets**: Appends lead data to the primary spreadsheet.
   - **Telegram**: Sends instant notifications to a specific chat via the Telegram Bot API.

## Service Details
- **Google Sheets**:
  - Library: `google-spreadsheet`
  - Auth: JWT with Service Account (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`)
  - Target: `GOOGLE_SHEET_ID`
- **Telegram Bot**:
  - Endpoint: `https://api.telegram.org/bot{TOKEN}/sendMessage`
  - Auth: `TELEGRAM_TOKEN`
  - Chat: `TELEGRAM_CHAT_ID`
- **Railway**: Acts as a backup or specialized processing node for Telegram leads.
- **Make.com**: Used for advanced automation (CRM sync, email follow-ups).

## External Components
- **Solar Widget**: Injected via `SolarWidget.tsx` (next/script). It carries its own integration logic but relies on the container structure provided by the LP.
