# Handoff & Memória de Implementação - Versão 2.1 (10/06/2026)

Este documento registra as atividades práticas, diagnósticos e descobertas cruciais realizadas no dia 10 de junho de 2026. Ele serve como ponto de partida (memória persistente) para qualquer agente de IA ou desenvolvedor que assumir o projeto a partir daqui.

---

## 🚀 Resumo das Entregas

1. **Estrutura de Dados Atualizada no Google Sheets**:
   * O script [setup_sheets_columns.js](file:///d:/site-marcelo/projects/solar-energy-lp/scripts/setup_sheets_columns.js) foi executado com sucesso contra a planilha conectada (`GOOGLE_SHEET_ID` no `.env.local`).
   * A aba dedicada **`Leads AI`** foi criada com as 20 colunas exatas da especificação.
   * As abas legadas (`Leads Site` e `Leads Bot`) receberam as colunas de controle do WhatsApp (`Notificação Mavinic`, `Data Notificação`, `Log de Erros WhatsApp`) no final de suas grades, com redimensionamento dinâmico prévio.
   * Cabeçalhos verificados via script.

2. **Manual de Configuração e Blueprint do Make.com**:
   * O arquivo [make_integration_guide.md](file:///d:/site-marcelo/projects/solar-energy-lp/.planning/make_integration_guide.md) foi criado no repositório local. Ele detalha as URLs, prompts, payload JSON para o Gemini/OpenRouter, lógica de roteador para Quente/Morno/Frio, tratamento de erros e envio do link `wa.me` via Evolution API.

3. **Validação da Rota de Webhook**:
   * Desenvolvemos e rodamos o script [test_webhook_direct.js](file:///d:/site-marcelo/projects/solar-energy-lp/scripts/test_webhook_direct.js) para simular o envio de um lead qualificado do simulador.
   * A chamada obteve resposta `Status 200 (Accepted)` do Make.com, atestando a integridade da comunicação local.

---

## 🔍 Diagnósticos e Descobertas Cruciais (Gotchas)

Durante a homologação, identificamos os seguintes pontos críticos na integração atual que impedem os leads de caírem na aba correta:

### A. Divergência de Webhooks no Código vs. Documentação
* Na documentação legada (`INTEGRATIONS.md`), o webhook citado era `uenwaqqn6cjyrx754med5l5hcarhby46`.
* No código real em produção (`.env.local`, `SolarWidget.tsx`, `LeadForm.tsx`), o webhook configurado é **`5177ub4bdfmkujgdw81l9l3c42mf81b3`**.
* **Ação**: O Make.com deve escutar o webhook `5177ub4bdfmkujgdw81l9l3c42mf81b3` para a Versão 2.1.

### B. Variável de Ambiente Ausente na Vercel (Produção)
* **O Problema**: O lead "Isaque Dias" preencheu o formulário completo da calculadora no ar, mas a linha de IA não apareceu no sheets.
* **Causa**: A variável de ambiente **`MAKE_WEBHOOK_URL`** não está configurada nas variáveis de ambiente da Vercel para o ambiente de produção.
* **Impacto**: A API do Next.js `/api/ai-lead` falha silenciosamente ao disparar o webhook em produção, embora a rota de backup `/api/leads` (que usa o SDK direto do Sheets e não depende do webhook) consiga gravar o contato bruto na aba `Leads Site` com a origem `SITE_SOLAR`.
* **Solução**: Cadastrar `MAKE_WEBHOOK_URL` nas configurações da Vercel e realizar o redeploy.

### C. Desalinhamento de Colunas e Reprocessamento (Aba Leads AI - Linha 14)
* **O Problema**: A linha 14 da nova aba `Leads AI` continha o pitch e a análise de IA do lead antigo `Test Agent Antigravity` (enviado em 08/06), mas as colunas de dados básicos do lead (Nome, WhatsApp, etc.) estavam em branco.
* **Causa**: O usuário reprocessou um webhook antigo no Make.com após criarmos a nova aba. O módulo **"Add a Row"** falhou ao mapear os dados básicos porque o Make.com estava utilizando um mapeamento de colunas antigo/desalinhado. O módulo **"Update a Row"** atualizou o pitch e a análise corretamente porque eles vinham diretamente do Gemini.
* **Solução**: No cenário do Make.com, deve-se re-resolver os cabeçalhos (*Re-resolve headers*) e remapear os dados básicos do webhook para as colunas estruturadas da nova aba `Leads AI`.

---

## 🛠️ Próximas Ações Imediatas para o Próximo Agente/Desenvolvedor

1. Auxiliar o usuário a cadastrar a variável `MAKE_WEBHOOK_URL` na Vercel.
2. Auxiliar o usuário no Make.com a remapear os campos de "Add a Row" e "Update a Row" para a aba `Leads AI`.
3. Disparar `node scripts/test_webhook_direct.js` após a reconfiguração para validar o fluxo de ponta a ponta.
