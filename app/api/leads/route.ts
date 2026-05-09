import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function POST(req: NextRequest) {
  try {
    const { name, whatsapp, billAmount } = await req.json();

    console.log(`[API Leads] Recebendo lead: ${name} (${whatsapp})`);

    // 1. Configurar autenticação com o Google
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!privateKey || !clientEmail || !sheetId) {
      console.error("[API Leads] Erro: Variáveis de ambiente faltando!");
      throw new Error("Configurações do Google Sheets não encontradas.");
    }

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // 2. Conectar à planilha
    console.log("[API Leads] Conectando ao Google Sheets...");
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // 3. Adicionar os dados na planilha
    // Padronizado com o BOT para evitar confusão na planilha
    const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    
    // Colunas: Nome | WhatsApp | Mensagem/Valor | Origem | Data/Hora
    await sheet.addRow([
      name, 
      whatsapp, 
      `Total Conta: R$ ${billAmount}`, 
      "SITE_SOLAR", 
      dataHora
    ]);

    console.log("✅ [API Leads] Salvo no Google Sheets com sucesso!");

    // 4. Notificar via Telegram (Sem aguardar para no travar o site)
    const botToken = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (botToken && chatId) {
      const message = `🚀 *NOVO LEAD DO SITE!*\n\n` +
                      `👤 *Nome:* ${name}\n` +
                      `📱 *WhatsApp:* ${whatsapp}\n` +
                      `💰 *Conta Mensal:* R$ ${billAmount}\n` +
                      `⏰ *Data:* ${dataHora}`;

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }).then(() => console.log("✅ [API Leads] Notificação Telegram enviada!"))
        .catch(err => console.error("❌ [API Leads] Erro Telegram:", err.message));
    }

    return NextResponse.json({ success: true, timestamp: dataHora });
  } catch (error: any) {
    console.error("❌ [API Leads] Erro crítico:", error.message || error);
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao processar lead" },
      { status: 500 }
    );
  }
}
