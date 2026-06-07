import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Lead recebido", data);
    
    // 1. Geração de ID Único e Timestamp
    const leadId = `L-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const completedAt = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    
    // Captura o Referer / Origem
    const urlOrigem = data.urlOrigem || request.headers.get("referer") || "URL não identificada";

    // Função auxiliar para evitar undefined e facilitar leitura na planilha
    const formatValue = (val: any) => val ? val : "Não informado";

    // 2. Construção do Payload completo formatado para o Make e Google Sheets
    const valorContaExata = data.answers.conta_exata ? `R$ ${parseFloat(data.answers.conta_exata).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "";
    
    const payload = {
      idLead: leadId,
      dataHora: completedAt,
      origem: "Solar Lead Agent IA",
      urlOrigem,
      nome: formatValue(data.answers.nome),
      cidade: formatValue(data.answers.cidade),
      whatsapp: formatValue(data.answers.whatsapp),
      imovelProprio: formatValue(data.answers.proprio),
      tipoImovel: formatValue(data.answers.imovel),
      faixaConta: valorContaExata ? valorContaExata : formatValue(data.answers.conta),
      tipoTelhado: formatValue(data.answers.telhado),
      padraoEletrico: formatValue(data.answers.padrao),
      sombreamento: formatValue(data.answers.sombreamento),
      prazoInstalacao: formatValue(data.answers.prazo),
      leadScore: data.score || 0,
      classificacaoInterna: data.category || "Frio"
    };

    // 3. Disparo para o Make.com
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (webhookUrl) {
      console.log("Enviando para Make", webhookUrl);
      // Dispara em background para não bloquear a resposta do Frontend
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error("[Make] Erro ao enviar Webhook:", err));
    } else {
      console.warn("[Aviso] MAKE_WEBHOOK_URL não configurada. Payload gerado:", payload);
    }

    // 4. Resposta de Sucesso para o Frontend
    return NextResponse.json({ success: true, leadId });

  } catch (error: any) {
    console.error("Erro na API ai-lead:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao processar e salvar os dados do lead." },
      { status: 500 }
    );
  }
}
