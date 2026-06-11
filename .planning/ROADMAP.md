# Roadmap: Solar Pro (Mavinic)

## Milestone 1: MVP & Core Landing Page (DONE)
- [x] Estrutura base Next.js 15.
- [x] Componentes de UI (Hero, Benefits, Pain).
- [x] Layout responsivo e estilização Tailwind.

## Milestone 2: Widget & Lead Integration (DONE)
- [x] Desenvolvimento do `spc-widget.js`.
- [x] Lógica de cálculo e animações de resultado.
- [x] Integração com Make.com e Railway.
- [x] Implementação de tracking (DataLayer).

## Milestone 3: Polimento & Produção (DONE)
### Fase 1: Ajustes Finais e SEO (COMPLETED)
- [x] Revisar Meta Tags e SEO Scores (Solar Pro Mavinic).
- [x] Configurar `robots.txt` e idioma (pt-BR).
- [x] Otimizar imagens e assets (placeholders realistas).
- [x] Validar fluxos de erro e fallback do widget (envio resiliente).

### Fase 2: Testes de Conversão e UI (COMPLETED)
- [x] Testar a responsividade em dispositivos móveis (Mobile-First).
- [x] Revisar as cópias (textos) das seções `Benefits` e `Pain` (Autoridade Mavinic).
- [x] Integrar Google Analytics / Meta Pixel (via GTM).

### Fase 3: Deploy e Documentação Final (DONE)
- [x] Configuração final de domínio (Vercel/Hostinger).
- [x] Testes de carga e validação de leads em produção.
- [x] Entrega da documentação técnica atualizada.

## Milestone 4: Automação de Primeiro Contato (Evolution API) [V2.1] (ACTIVE)
### Fase 1: Ajuste de Estrutura de Dados & Filtros (COMPLETED)
- [x] Definir colunas adicionais de rastreabilidade (Notificação Mavinic, Data Notificação, Log de Erros) no Sheets.
- [x] Criar e configurar a aba dedicada "Leads AI" com 20 colunas estruturadas.
- [x] Projetar filtros de temperatura (Quente/Morno vs. Frio) no Make.com.
- [x] Remover infraestrutura/dependência legada do Hermes Agent do repositório.

### Fase 2: Integração com Evolution API (IN PROGRESS)
- [x] Desenhar e documentar módulo HTTP da Evolution API para notificação ao celular comercial Mavinic.
- [x] Configurar formatação do link wa.me com o pitch gerado codificado em URL.
- [x] Implementar e documentar tratamento de erros e atualização de status no Sheets.
- [ ] Executar testes integrados de ponta a ponta (Aguardando homologação visual no Make.com).
