# Contexto da Migração de Imagens do Blog - Mavinic Solar

Documento temporário para guiar o próximo assistente ou a continuação do trabalho na próxima sessão.

---

## 📅 Status Atual (18/05/2026)

Concluímos a primeira etapa da migração das imagens provisórias do blog para imagens reais/customizadas fornecidas pelo Marcelo.

1. **Pasta de Imagens**: Criamos a pasta `public/assets/blog/` para organizar as novas imagens.
2. **Configuração Técnica**: Atualizamos o `next.config.ts` para habilitar `dangerouslyAllowSVG` e outras diretrizes de segurança de imagem, permitindo que Next.js renderize imagens locais em formato `.svg` usando o componente `<Image />` sem restrições.
3. **Primeira Imagem Integrada**: 
   - O Marcelo adicionou a imagem `Residencial.svg` (com cerca de 3.3MB) na pasta `public/assets/blog/`.
   - Atualizamos o artigo **"Quantas placas solares preciso para a minha casa?"** (categoria `Residencial`) para usar esta imagem local: `image: "/assets/blog/Residencial.svg"`.
   - Ajustamos o casing do arquivo no markdown para coincidir exatamente com o rastreado pelo Git (`Residencial.svg`) para evitar erro 404 de sensibilidade a maiúsculas/minúsculas no servidor Linux da Vercel.
4. **Artigo de Tecnologia Restaurado**:
   - O artigo **"Como funciona a energia solar residencial passo a passo"** (categoria `Tecnologia Solar`) foi revertido temporariamente para a foto bonita original do Unsplash, pois o SVG anterior enviado tinha problemas visuais (ficava todo preto devido ao contraste do fundo escuro).
5. **Git & Deploy**: Todas as alterações acima foram devidamente commitadas e enviadas para a branch `main` (`git push`). O deploy automático da Vercel está ativo.

---

## 📋 Próximos Passos (Para Amanhã)

Quando o Marcelo voltar, ele terá convertido e adicionado as outras imagens dos artigos. O objetivo será atualizar as capas dos 4 artigos restantes:

### 1. Artigos a Atualizar

| Artigo (Arquivo `.md` em `content/blog/`) | Categoria | Imagem Atual | Nova Imagem (A ser colocada em `/assets/blog/`) |
| :--- | :--- | :--- | :--- |
| `como-funciona-energia-solar-residencial.md` | Tecnologia Solar | Unsplash (Solar) | *A ser definida pelo Marcelo* |
| `como-reduzir-conta-de-luz-em-ate-95-porcento.md` | Economia | Unsplash (Money/Solar) | *A ser definida pelo Marcelo* |
| `energia-solar-vale-a-pena-em-umuarama.md` | Regional | Unsplash (Umuarama) | *A ser definida pelo Marcelo* |
| `quanto-custa-instalar-energia-solar-em-umuarama.md` | Custo | Unsplash (Custo) | *A ser definida pelo Marcelo* |

### 2. O que fazer passo a passo:

1. **Verificar os novos arquivos**: Rodar um `list_dir` na pasta `public/assets/blog/` para ver as novas imagens que o Marcelo adicionou.
2. **Atualizar os Markdowns**: Abrir cada arquivo `.md` correspondente na pasta `content/blog/` e substituir a linha `image: "https://images.unsplash..."` pelo caminho local, ex: `image: "/assets/blog/nome-do-arquivo.jpg"`.
3. **Atenção ao Casing**: Lembrar que o servidor da Vercel diferencia maiúsculas de minúsculas. O nome no Markdown deve ser idêntico ao nome do arquivo físico no disco.
4. **Commit & Push**:
   ```bash
   git add .
   git commit -m "feat: integra novas imagens locais para os artigos do blog"
   git push
   ```

---

*Bom descanso, Marcelo! Até amanhã! ☀️🚀*
