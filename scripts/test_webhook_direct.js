require('dotenv').config({ path: '.env.local' });

async function testWebhook() {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('❌ Erro: MAKE_WEBHOOK_URL não encontrada no .env.local');
    return;
  }

  console.log('--- TESTE DE ENVIO DIRETO PARA WEBHOOK MAKE.COM ---');
  console.log('Webhook URL:', webhookUrl);

  const mockPayload = {
    idLead: `L-TEST-${Date.now().toString(36).toUpperCase()}`,
    dataHora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    origem: "Solar Lead Agent IA (Mock Test)",
    urlOrigem: "https://solar.mavinic.com.br/simulador-teste",
    nome: "Marcelo Teste SDR",
    cidade: "Campinas",
    whatsapp: "5544988160797", // WhatsApp comercial ou de teste
    imovelProprio: "Sim",
    tipoImovel: "Casa",
    faixaConta: "R$ 650,00",
    tipoTelhado: "Fibrocimento",
    padraoEletrico: "Bifásico",
    sombreamento: "Nenhum",
    prazoInstalacao: "Imediatamente",
    leadScore: 85,
    classificacaoInterna: "Quente"
  };

  console.log('Payload enviado:', JSON.stringify(mockPayload, null, 2));

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockPayload)
    });

    if (response.ok) {
      console.log(`✅ Webhook enviado com sucesso! Status: ${response.status}`);
      const text = await response.text();
      console.log('Resposta do Make:', text || '(vazia/Accepted)');
    } else {
      console.error(`❌ Erro no envio. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Erro na requisição HTTP:', error.message);
  }
}

testWebhook();
