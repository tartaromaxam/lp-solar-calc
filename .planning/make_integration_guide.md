# Guia de Integração Make.com & Evolution API (Versão 2.1)

Este guia detalha a configuração do cenário de automação no **Make.com** para o processamento de leads qualificados, geração de pitches com Gemini (OpenRouter) e envio de notificações para a equipe da Mavinic via **Evolution API**.

---

## Estrutura do Fluxo no Make.com

O cenário é desenhado em formato linear com uma ramificação final usando um **Router**:

```
[Webhook] ──> [Sheets: Add Row] ──> [HTTP: Gemini API] ──> [Sheets: Update Row] ──> [Router]
                                                                                      │
                                                     ┌────────────────────────────────┴────────────────────────────────┐
                                                     ▼ (Filtro: Quente ou Morno)                                       ▼ (Filtro: Frio)
                                        [HTTP: Evolution API] ──> [Sheets: Update Status]                       [Sheets: Update Status (Frio)]
```

---

## Configuração Módulo por Módulo

### 1. Módulo 1: Custom Webhook (Gatilho)
* **Nome**: `Receber Lead Simulação`
* **Configuração**: Cria um webhook público para receber o payload de `/api/ai-lead`.
* **Exemplo de payload recebido**:
  ```json
  {
    "idLead": "L-KSK82J-9D82",
    "dataHora": "10/06/2026, 14:15:59",
    "origem": "Solar Lead Agent IA",
    "urlOrigem": "https://solar.mavinic.com.br/simulador",
    "nome": "Marcelo Silva",
    "cidade": "Campinas",
    "whatsapp": "5519999999999",
    "imovelProprio": "Sim",
    "tipoImovel": "Casa",
    "faixaConta": "R$ 650,00",
    "tipoTelhado": "Fibrocimento",
    "padraoEletrico": "Bifásico",
    "sombreamento": "Nenhum",
    "prazoInstalacao": "Imediatamente",
    "leadScore": 85,
    "classificacaoInterna": "Quente"
  }
  ```

---

### 2. Módulo 2: Google Sheets - Add a Row
* **Conexão**: Google Sheets da Mavinic.
* **Spreadsheet ID**: `1E1bbELbUJuSu8Oy5Sfz7-SB1CSb7H7QoC8hHcfbV6PQ`
* **Sheet Name**: `Leads AI`
* **Mapeamento de Campos**:
  - `ID Lead`: `{{idLead}}`
  - `Data/Hora`: `{{dataHora}}`
  - `Nome`: `{{nome}}`
  - `WhatsApp`: `{{whatsapp}}`
  - `Cidade`: `{{cidade}}`
  - `Estado`: *(Deixar vazio, campo não coletado no formulário atual)*
  - `Tipo de Imóvel`: `{{tipoImovel}}`
  - `Imóvel Próprio`: `{{imovelProprio}}`
  - `Faixa da Conta`: `{{faixaConta}}`
  - `Tipo de Telhado`: `{{tipoTelhado}}`
  - `Padrão Elétrico`: `{{padraoEletrico}}`
  - `Sombreamento`: `{{sombreamento}}`
  - `Prazo de Instalação`: `{{prazoInstalacao}}`
  - `Lead Score`: `{{leadScore}}`
  - `Classificação Interna`: `{{classificacaoInterna}}`
  - `Notificação Mavinic`: `Pendente`

---

### 3. Módulo 3: HTTP - Make a Request (Gemini via OpenRouter)
* **Método**: `POST`
* **URL**: `https://openrouter.ai/api/v1/chat/completions`
* **Headers**:
  - `Authorization`: `Bearer <Sua_Chave_OpenRouter>`
  - `Content-Type`: `application/json`
  - `HTTP-Referer`: `https://solar.mavinic.com.br`
  - `X-Title`: `Mavinic Solar AI SDR`
* **Request Body (JSON)**:
  ```json
  {
    "model": "google/gemini-2.5-flash",
    "response_format": { "type": "json_object" },
    "messages": [
      {
        "role": "system",
        "content": "Você é o SDR Inteligente e Analista de Pré-Vendas da Mavinic Solar. Sua missão é analisar leads de energia solar para qualificação interna do vendedor humano e preparar uma mensagem amigável de abordagem via WhatsApp.\n\nInstruções Absolutas de Processamento:\n1. PRECISÃO COMERCIAL: Se a conta média do cliente for informada com um valor exato (ex: R$ 642,37), utilize SEMPRE este valor exato nos cálculos de economia e referências. Nunca use ou mencione faixas de conta (ex: R$ 501 a R$ 800) se o valor exato estiver disponível no campo 'Valor da Conta'.\n2. NUNCA INVENTE INTENÇÕES: Não assuma que o cliente deseja agendar uma visita técnica, quer fechar negócio ou quer financiamento se ele não tiver expressado isso explicitamente no formulário. A IA deve trabalhar APENAS com fatos coletados. Não use frases como: 'Gostaria de agendar uma avaliação técnica', 'Quero receber uma proposta', 'Tenho interesse em financiamento'.\n3. ANÁLISE COMERCIAL ESTRUTURADA (analise_ia): Destina-se ao vendedor interno. Deve conter exatamente a seguinte estrutura, sem desvios:\n   - Classificação/Temperatura (use emojis correspondentes):\n     * 🔥 Lead Quente: Conta de luz >= R$ 500/mês E imóvel próprio = Sim\n     * ⚡ Lead Morno: Conta de luz >= R$ 300/mês ou imóvel próprio = Sim\n     * ❄️ Lead Frio: Conta de luz < R$ 300/mês E imóvel próprio = Não\n   - Dados Coletados: Listar Nome, Cidade, Tipo de Imóvel, Imóvel Próprio, Tipo de Telhado, Padrão Elétrico, Valor Médio da Conta (se exato) ou Faixa da Conta, Sombreamento, Prazo de Instalação.\n   - Análise Comercial: Lista objetiva em tópicos (bullet points) destacando fatos comerciais (ex: imóvel próprio facilita aprovação, sem sombreamento aumenta a eficiência do sistema, tipo de telhado compatível, forte potencial de economia, urgência de curto prazo baseada no prazo selecionado).\n   - Ação Recomendada: Instrução precisa para o vendedor (ex: 'Priorizar contato em até 2 horas.', 'Entrar em contato em até 24 horas.').\n\n4. MENSAGEM DO WHATSAPP (pitch_ia): Um rascunho de abordagem humanizada e direta para o vendedor enviar ao cliente. Deve:\n   - Começar chamando o cliente pelo primeiro nome.\n   - Mencionar a cidade dele para criar afinidade local.\n   - Fazer gancho natural com o valor de conta e o tipo de telhado fornecido.\n   - Terminar com uma pergunta aberta e consultiva, sem forçar agendamento (ex: 'Gostaria de tirar alguma dúvida ou quer que eu elabore uma simulação detalhada para o seu telhado de Fibrocimento?').\n\nRetorne a resposta estritamente no seguinte formato JSON:\n{\n  \"analise_ia\": \"[Texto estruturado da Análise Comercial]\",\n  \"pitch_ia\": \"[Mensagem humanizada do WhatsApp]\"\n}"
      },
      {
        "role": "user",
        "content": "Dados do Lead:\n- Nome: {{nome}}\n- Cidade: {{cidade}}\n- WhatsApp: {{whatsapp}}\n- Imóvel Próprio: {{imovelProprio}}\n- Tipo de Imóvel: {{tipoImovel}}\n- Conta de Luz: {{faixaConta}}\n- Tipo de Telhado: {{tipoTelhado}}\n- Padrão Elétrico: {{padraoEletrico}}\n- Sombreamento: {{sombreamento}}\n- Prazo de Instalação: {{prazoInstalacao}}\n- Score Calculado: {{leadScore}}\n- Classificação Interna: {{classificacaoInterna}}"
      }
    ]
  }
  ```

---

### 4. Módulo 4: JSON Parser (Parse JSON)
* **Texto de Entrada**: `{{HTTP.data.choices[1].message.content}}`
  > [!NOTE]
  > No Make.com, os índices de arrays são baseados em 1. Portanto, `choices[1]` acessa o primeiro item da resposta do OpenRouter (equivalente a `choices[0]` em JSON padrão).
* **Campos Extraídos**: `analise_ia`, `pitch_ia`.

---

### 5. Módulo 5: Google Sheets - Update a Row
* **Row Number**: Obtido dinamicamente da linha criada no Módulo 2 (`{{rowNumber}}`).
* **Campos Atualizados**:
  - `Análise IA`: `{{analise_ia}}`
  - `Pitch IA`: `{{pitch_ia}}`

---

### 6. Módulo 6: Router
Divide o fluxo com base na temperatura do lead.

#### Rota A: Quente / Morno (Notificar WhatsApp Comercial)
* **Filtro da Rota**:
  - Condição 1: `classificacaoInterna` é igual a (case-insensitive) `Quente`
  - **OU**
  - Condição 2: `classificacaoInterna` é igual a (case-insensitive) `Morno`
  
* **Módulo HTTP - Enviar Notificação (Evolution API)**:
  - **Método**: `POST`
  - **URL**: `<EVOLUTION_API_URL>/message/sendText/<NOME_DA_INSTANCIA>`
  - **Headers**:
    - `apikey`: `<SUA_CHAVE_API_EVOLUTION>`
    - `Content-Type`: `application/json`
  - **Body (JSON)**:
    ```json
    {
      "number": "5544988160797",
      "text": "🔥 *NOVO LEAD QUALIFICADO MAVINIC SOLAR*\n\n📋 *ANÁLISE DE PRÉ-VENDA*:\n{{analise_ia}}\n\n💬 *PITCH SUGERIDO*:\n{{pitch_ia}}\n\n👉 *CLIQUE ABAIXO PARA ENVIAR O PITCH COM 1 CLIQUE*:\nhttps://wa.me/{{whatsapp}}?text={{encodeURL(pitch_ia)}}"
    }
    ```
    *(Nota: Use a função nativa do Make `{{encodeURL(pitch_ia)}}` para codificar a mensagem no link do WhatsApp).*

* **Módulo Google Sheets - Update Status (Sucesso)**:
  - **Row Number**: `{{rowNumber}}`
  - **Campos Atualizados**:
    - `Notificação Mavinic`: `Sucesso`
    - `Data Notificação`: `{{now}}` (timestamp do Make)

* **Tratamento de Erros no Disparo do WhatsApp (HTTP module error path)**:
  - Adicione uma diretiva de tratamento de erros **(Error Handler: Resume/Commit)** acoplada ao módulo HTTP da Evolution API.
  - Insira um módulo de **Google Sheets - Update Status (Erro)** após o erro:
    - **Row Number**: `{{rowNumber}}`
    - **Campos Atualizados**:
      - `Notificação Mavinic`: `Erro`
      - `Log de Erros WhatsApp`: `{{lastError.message}}`

---

#### Rota B: Frio (Apenas Registrar)
* **Filtro da Rota**:
  - Condição: `classificacaoInterna` é igual a (case-insensitive) `Frio`
* **Módulo Google Sheets - Update Status (Frio)**:
  - **Row Number**: `{{rowNumber}}`
  - **Campos Atualizados**:
    - `Notificação Mavinic`: `Não Enviado (Frio)`
