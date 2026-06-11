# Project State: Solar Pro (Mavinic)

- [x] Milestone 1: Estrutura Base e SEO
- [x] Milestone 2: Otimização de Conversão e UI
- [x] Milestone 3: Deploy Final e Handoff
- [x] Milestone 4: Automação de Primeiro Contato (Evolution API) [V2.1]
- [x] Versão 1: Mavinic Solar AI SDR Concluída

## Status Atual
A implementação da **Versão 2.1** foi concluída com sucesso no repositório local e na planilha do Google Sheets. A estrutura de dados para o SDR de pré-vendas com validação humana (Human-in-the-Loop) está totalmente configurada e operacional. Criou-se a aba dedicada **"Leads AI"** com 20 colunas e adicionou-se as colunas de controle às abas legadas. O blueprint de orquestração do Make.com foi completamente documentado para importação do cliente.

### Progresso Recente
- [x] Homologação completa da Versão 1 de IA (Next.js LP -> Make -> Gemini -> Sheets).
- [x] Decisão estratégica de remover o Hermes Agent do escopo atual para manter a stack serverless e mais segura.
- [x] Aprovação do plano de implementação da Versão 2.1 com validação humana (Human-in-the-Loop).
- [x] Criação da aba dedicada **"Leads AI"** com a estrutura correta de 20 colunas no Google Sheets.
- [x] Adição das colunas de controle (`Notificação Mavinic`, `Data Notificação`, `Log de Erros WhatsApp`) nas abas `Leads Site` e `Leads Bot`.
- [x] Elaboração do guia de integração detalhado para o cenário no Make.com (`make_integration_guide.md`).
- [x] Confirmação de remoção de qualquer dependência ou arquivo legado do Hermes Agent no repositório.

### Próximos Passos Imediatos
1. Solicitar ao usuário a importação/configuração do blueprint no Make.com utilizando o guia [make_integration_guide.md](file:///d:/site-marcelo/projects/solar-energy-lp/.planning/make_integration_guide.md).
2. Conectar a Evolution API no Make.com conforme instruções.
3. Realizar o teste de ponta a ponta submetendo um lead qualificado pela calculadora no site.

### Notas
- A chave de segurança e o Hermes Agent foram completamente descontinuados.
- Todo o fluxo de envio direto ao lead está desativado nesta fase para permitir a auditoria interna dos pitches gerados.
- A aba `Leads AI` agora atua como repositório canônico para dados refinados de IA e rastreabilidade da Evolution API.
