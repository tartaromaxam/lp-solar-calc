const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

async function setupSheets() {
  console.log('--- CONFIGURAÇÃO DE ABAS E COLUNAS GOOGLE SHEETS ---');
  
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
    console.log('⏳ Conectando ao Google Sheets...');
    await doc.loadInfo();
    console.log(`✅ Conectado à planilha: "${doc.title}"`);

    // 1. Verificar/Adicionar as novas colunas nas abas existentes
    const existingSheetsToUpdate = ['Leads Site', 'Leads Bot'];
    const newControlHeaders = ['Notificação Mavinic', 'Data Notificação', 'Log de Erros WhatsApp'];

    for (const sheetName of existingSheetsToUpdate) {
      const sheet = doc.sheetsByTitle[sheetName];
      if (sheet) {
        console.log(`⏳ Verificando colunas da aba "${sheetName}"...`);
        await sheet.loadHeaderRow();
        const currentHeaders = sheet.headerValues;
        const headersToAdd = newControlHeaders.filter(h => !currentHeaders.includes(h));

        if (headersToAdd.length > 0) {
          const updatedHeaders = [...currentHeaders, ...headersToAdd];
          
          // Redimensiona a aba para caber as novas colunas
          if (sheet.columnCount < updatedHeaders.length) {
            console.log(`⏳ Redimensionando aba "${sheetName}" para ${updatedHeaders.length} colunas...`);
            await sheet.resize({
              rowCount: sheet.rowCount,
              columnCount: updatedHeaders.length
            });
          }
          
          await sheet.setHeaderRow(updatedHeaders);
          console.log(`✅ Aba "${sheetName}" atualizada. Novas colunas adicionadas:`, headersToAdd);
        } else {
          console.log(`ℹ️ Aba "${sheetName}" já possui todas as novas colunas.`);
        }
      } else {
        console.log(`⚠️ Aba "${sheetName}" não foi encontrada no documento.`);
      }
    }

    // 2. Verificar/Criar a aba dedicada "Leads AI"
    const aiSheetName = 'Leads AI';
    let aiSheet = doc.sheetsByTitle[aiSheetName];

    const aiHeaders = [
      'ID Lead',
      'Data/Hora',
      'Nome',
      'WhatsApp',
      'Cidade',
      'Estado',
      'Tipo de Imóvel',
      'Imóvel Próprio',
      'Faixa da Conta',
      'Tipo de Telhado',
      'Padrão Elétrico',
      'Sombreamento',
      'Prazo de Instalação',
      'Lead Score',
      'Classificação Interna',
      'Análise IA',
      'Pitch IA',
      'Notificação Mavinic',
      'Data Notificação',
      'Log de Erros WhatsApp'
    ];

    if (!aiSheet) {
      console.log(`⏳ Criando nova aba "${aiSheetName}" com ${aiHeaders.length} colunas...`);
      aiSheet = await doc.addSheet({
        title: aiSheetName,
        headerValues: aiHeaders,
        gridProperties: {
          rowCount: 1000,
          columnCount: aiHeaders.length
        }
      });
      console.log(`✅ Nova aba "${aiSheetName}" criada com sucesso com todas as 20 colunas estruturadas!`);
    } else {
      console.log(`⏳ Aba "${aiSheetName}" encontrada. Verificando cabeçalhos...`);
      await aiSheet.loadHeaderRow();
      const currentAIHeaders = aiSheet.headerValues;
      const missingAIHeaders = aiHeaders.filter(h => !currentAIHeaders.includes(h));

      if (missingAIHeaders.length > 0) {
        const updatedAIHeaders = [...currentAIHeaders, ...missingAIHeaders];
        
        if (aiSheet.columnCount < updatedAIHeaders.length) {
          console.log(`⏳ Redimensionando aba "${aiSheetName}" para ${updatedAIHeaders.length} colunas...`);
          await aiSheet.resize({
            rowCount: aiSheet.rowCount,
            columnCount: updatedAIHeaders.length
          });
        }

        await aiSheet.setHeaderRow(updatedAIHeaders);
        console.log(`✅ Aba "${aiSheetName}" atualizada com as colunas faltantes:`, missingAIHeaders);
      } else {
        console.log(`ℹ️ Aba "${aiSheetName}" já possui a estrutura completa.`);
      }
    }

    console.log('🚀 CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!');
  } catch (error) {
    console.error('❌ ERRO DURANTE A CONFIGURAÇÃO:', error.message);
  }
}

setupSheets();
