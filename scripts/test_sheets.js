const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('--- TESTE DE CONEXÃO GOOGLE SHEETS ---');
  
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!privateKey || !clientEmail || !sheetId) {
    console.error('❌ Erro: Variáveis de ambiente não encontradas no .env.local');
    return;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    console.log('⏳ Carregando informações da planilha...');
    await doc.loadInfo();
    console.log(`✅ Conectado à planilha: "${doc.title}"`);

    const sheet = doc.sheetsByIndex[0];
    console.log(`✅ Aba selecionada: "${sheet.title}"`);

    const dataHora = new Date().toLocaleString('pt-BR');
    console.log('⏳ Tentando adicionar linha de teste...');
    
    await sheet.addRow([
      'TESTE SISTEMA', 
      '00000000000', 
      'Teste de conexão automática', 
      'SCRIPT_TESTE', 
      dataHora
    ]);

    console.log('🚀 SUCESSO! Linha adicionada com sucesso.');
  } catch (error) {
    console.error('❌ ERRO NO TESTE:', error.message);
  }
}

testConnection();
