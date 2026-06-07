"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

type QuestionType = "welcome" | "text" | "options" | "result";

interface Option {
  label: string;
  value: string;
  points?: number;
}

interface Question {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: Option[];
  placeholder?: string;
}

const QUESTIONS: Question[] = [
  {
    id: "welcome",
    type: "welcome",
    title: "Descubra o seu potencial solar",
    subtitle: "Responda algumas perguntas rápidas e veja quanto você pode economizar e qualificar seu projeto.",
  },
  {
    id: "nome",
    type: "text",
    title: "Qual é o seu nome?",
    placeholder: "Digite seu nome",
  },
  {
    id: "whatsapp",
    type: "text",
    title: "Qual é o seu WhatsApp?",
    placeholder: "(DD) 9XXXX-XXXX",
  },
  {
    id: "cidade",
    type: "text",
    title: "Qual é a sua cidade?",
    placeholder: "Digite sua cidade",
  },
  {
    id: "conta",
    type: "options",
    title: "Qual o valor médio da sua conta de energia?",
    options: [
      { label: "Até R$ 300", value: "ate-300", points: 5 },
      { label: "R$ 301 a R$ 500", value: "301-500", points: 15 },
      { label: "R$ 501 a R$ 800", value: "501-800", points: 25 },
      { label: "Acima de R$ 800", value: "acima-800", points: 35 },
    ],
  },
  {
    id: "imovel",
    type: "options",
    title: "Qual o tipo de imóvel?",
    options: [
      { label: "Residência (Casa)", value: "casa" },
      { label: "Empresa / Comércio", value: "empresa" },
      { label: "Propriedade Rural", value: "rural" },
    ],
  },
  {
    id: "proprio",
    type: "options",
    title: "O imóvel é próprio?",
    options: [
      { label: "Sim", value: "sim", points: 20 },
      { label: "Não", value: "nao", points: 0 },
    ],
  },
  {
    id: "telhado",
    type: "options",
    title: "Qual o tipo principal de telhado?",
    options: [
      { label: "Fibrocimento", value: "fibrocimento" },
      { label: "Colonial", value: "colonial" },
      { label: "Metálico", value: "metalico" },
      { label: "Laje", value: "laje" },
      { label: "Estrutura de Solo", value: "solo" },
    ],
  },
  {
    id: "sombreamento",
    type: "options",
    title: "Como é o sombreamento no telhado durante o dia?",
    options: [
      { label: "Nenhum", value: "nenhum", points: 15 },
      { label: "Pouco", value: "pouco", points: 10 },
      { label: "Moderado", value: "moderado", points: 5 },
      { label: "Muito", value: "muito", points: 0 },
    ],
  },
  {
    id: "padrao",
    type: "options",
    title: "Qual o seu padrão elétrico?",
    options: [
      { label: "Monofásico", value: "monofasico" },
      { label: "Bifásico", value: "bifasico" },
      { label: "Trifásico", value: "trifasico" },
      { label: "Não sei", value: "naosei" },
    ],
  },
  {
    id: "prazo",
    type: "options",
    title: "Qual a sua expectativa de prazo para a instalação?",
    options: [
      { label: "Imediatamente", value: "imediato", points: 25 },
      { label: "Até 30 dias", value: "30-dias", points: 20 },
      { label: "Até 90 dias", value: "90-dias", points: 10 },
      { label: "Apenas pesquisando", value: "pesquisando", points: 0 },
    ],
  },
];

export default function TypeformFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSubmitted = useRef(false);

  // 1. Carrega parâmetros de URL se existirem (Nome, WhatsApp, Conta)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlNome = params.get("nome");
      const urlWhatsapp = params.get("whatsapp");
      const urlConta = params.get("conta");

      const initialAnswers: Record<string, string> = {};

      if (urlNome) initialAnswers["nome"] = decodeURIComponent(urlNome);
      if (urlWhatsapp) initialAnswers["whatsapp"] = decodeURIComponent(urlWhatsapp);
      if (urlConta) {
        const contaNum = Number(urlConta);
        let contaValue = "ate-300";
        if (contaNum > 800) contaValue = "acima-800";
        else if (contaNum > 500) contaValue = "501-800";
        else if (contaNum > 300) contaValue = "301-500";
        initialAnswers["conta"] = contaValue;
      }

      if (Object.keys(initialAnswers).length > 0) {
        console.log("Dados da calculadora carregados no formulário:", initialAnswers);
        setAnswers(initialAnswers);
      }
    }
  }, []);

  const question = QUESTIONS[currentStep];
  const isFinished = currentStep >= QUESTIONS.length;

  const submitLeadData = async (finalAnswers: Record<string, string>) => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (q.type === "options" && q.options) {
        const selectedValue = finalAnswers[q.id];
        const option = q.options.find((o) => o.value === selectedValue);
        if (option && option.points !== undefined) {
          score += option.points;
        }
      }
    });

    let category = "Frio";
    if (score >= 70) category = "Quente";
    else if (score >= 40) category = "Morno";

    const payload = {
      answers: finalAnswers,
      score,
      category,
      urlOrigem: window.location.href,
    };

    console.log("Enviando lead para API", payload);

    try {
      await fetch("/api/ai-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Erro ao submeter lead para API interna:", err);
    }
  };

  const advanceStep = (currentAnswers: Record<string, string>, fromStep = currentStep) => {
    let nextStep = fromStep + 1;
    
    // Pula perguntas que já vieram respondidas/pré-preenchidas pela URL
    while (nextStep < QUESTIONS.length && currentAnswers[QUESTIONS[nextStep].id] !== undefined) {
      console.log(`[Skip] Pulando pergunta já preenchida: ${QUESTIONS[nextStep].id}`);
      nextStep++;
    }

    setCurrentStep(nextStep);
    
    // Se avançar para a última tela, dispara a API imperativamente
    if (nextStep >= QUESTIONS.length && !hasSubmitted.current) {
      console.log("Gatilho imperativo disparado! Preparando envio...");
      hasSubmitted.current = true;
      submitLeadData(currentAnswers);
    }
  };

  useEffect(() => {
    // Focus input on text steps
    if (question && question.type === "text" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep, question]);

  const handleNext = () => {
    if (question.type === "text") {
      if (!textInput.trim()) return; // Required validation
      const newAnswers = { ...answers, [question.id]: textInput };
      setAnswers(newAnswers);
      setTextInput("");
      advanceStep(newAnswers);
    } else {
      advanceStep(answers);
    }
  };

  const handleOptionSelect = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    // Pequeno delay para a transição ficar suave e perceptível
    setTimeout(() => {
      advanceStep(newAnswers);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && question.type === "text" && textInput.trim()) {
      handleNext();
    }
  };

  const renderProgress = () => {
    if (isFinished || question.type === "welcome") return null;
    const progress = (currentStep / (QUESTIONS.length - 1)) * 100;
    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div
          className="h-full bg-[#D4AF37] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const renderResult = () => {
    // Recalcula score no frontend apenas para uso visual caso necessário
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (q.type === "options" && q.options) {
        const option = q.options.find((o) => o.value === answers[q.id]);
        if (option && option.points !== undefined) score += option.points;
      }
    });
    let category = "Frio";
    if (score >= 70) category = "Quente";
    else if (score >= 40) category = "Morno";
    const completedAt = new Date().toISOString(); // Preparado para integrações futuras

    const getLabel = (questionId: string) => {
      if (questionId === "conta" && answers["conta_exata"]) {
        const valor = parseFloat(answers["conta_exata"]);
        return isNaN(valor) ? answers["conta_exata"] : `R$ ${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
      }
      const q = QUESTIONS.find((q) => q.id === questionId);
      if (!q) return answers[questionId] || "-";
      if (q.type === "options" && q.options) {
        const opt = q.options.find((o) => o.value === answers[questionId]);
        return opt ? opt.label : "-";
      }
      return answers[questionId] || "-";
    };

    const handleWhatsAppRedirect = () => {
      const phone = "5544988160797";
      
      const labelConta = answers["conta_exata"] ? "Valor Médio da Conta" : "Faixa da Conta";
      
      const textArray = [
        "Olá!",
        "",
        "Acabei de concluir a Pré-Análise Solar.",
        "",
        "Origem: Solar Lead Agent IA",
        "",
        "Resumo:",
        `Nome: ${getLabel("nome")}`,
        `Cidade: ${getLabel("cidade")}`,
        `Tipo de Imóvel: ${getLabel("imovel")}`,
        `Imóvel Próprio: ${getLabel("proprio")}`,
        `Tipo de Telhado: ${getLabel("telhado")}`,
        `Padrão Elétrico: ${getLabel("padrao")}`,
        `${labelConta}: ${getLabel("conta")}`,
        `Sombreamento: ${getLabel("sombreamento")}`,
        `Prazo de Instalação: ${getLabel("prazo")}`
      ];

      const text = textArray.join("\n");
      const encodedText = encodeURIComponent(text);
      
      const url = `https://wa.me/${phone}?text=${encodedText}`;
      
      console.log("=== DIAGNÓSTICO WHATSAPP ===");
      console.log("Mensagem original:", text);
      console.log("URL final do WhatsApp:", url);
      
      window.open(url, "_blank");
    };
    return (
      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4">
          <Check className="w-12 h-12 text-[#D4AF37]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Pré-análise Concluída</h2>
        
        <p className="text-xl text-white/70 mb-4">
          Obrigado, {answers.nome?.split(" ")[0] || "cliente"}. Com base nas informações fornecidas, identificamos características compatíveis com um projeto de energia solar. Uma avaliação técnica permitirá confirmar a viabilidade e estimar o potencial de economia do imóvel.
        </p>
 
        <div className="glass-card p-6 md:p-8 rounded-2xl w-full text-left mb-2">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-3">Resumo da Pré-Análise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm md:text-base text-white/80">
            <div>
              <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">Cidade</span>
              <span className="font-medium text-white">{getLabel("cidade")}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">Tipo de Imóvel</span>
              <span className="font-medium text-white">{getLabel("imovel")}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">Imóvel Próprio</span>
              <span className="font-medium text-white">{getLabel("proprio")}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">Tipo de Telhado</span>
              <span className="font-medium text-white">{getLabel("telhado")}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">Padrão Elétrico</span>
              <span className="font-medium text-white">{getLabel("padrao")}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">
                {answers["conta_exata"] ? "Valor Médio da Conta" : "Faixa da Conta"}
              </span>
              <span className="font-medium text-white">{getLabel("conta")}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">Sombreamento</span>
              <span className="font-medium text-white">{getLabel("sombreamento")}</span>
            </div>
            <div>
              <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">Prazo de Instalação</span>
              <span className="font-medium text-white">{getLabel("prazo")}</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl w-full mb-4">
          <h3 className="text-2xl font-bold text-[#D4AF37] mb-3">Próximo Passo Recomendado</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            O próximo passo é realizar uma análise técnica detalhada para avaliar as condições do imóvel, posicionamento dos equipamentos, incidência solar e estimativa de economia.
          </p>
        </div>

        <button
          onClick={handleWhatsAppRedirect}
          className="group bg-[#D4AF37] text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-[#F7C843] transition-all flex items-center justify-center gap-3 w-full md:w-auto mt-4"
        >
          Falar com Especialista
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            setAnswers({});
            setCurrentStep(0);
            hasSubmitted.current = false;
          }}
          className="mt-6 text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          Reiniciar Demonstração
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-white flex flex-col relative overflow-hidden font-sans">
      {renderProgress()}

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              {renderResult()}
            </motion.div>
          ) : (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-3xl"
            >
              <div className="flex items-center text-[#D4AF37] font-semibold mb-6">
                {question.type !== "welcome" && (
                  <span className="flex items-center gap-2">
                    {currentStep} <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
                {question.title}
              </h2>

              {question.subtitle && (
                <p className="text-xl md:text-2xl text-white/60 mb-12 font-light">
                  {question.subtitle}
                </p>
              )}

              <div className="mt-8 md:mt-12">
                {question.type === "welcome" && (
                  <button
                    onClick={handleNext}
                    className="group bg-[#D4AF37] text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-[#F7C843] transition-all flex items-center gap-3"
                  >
                    Começar Agora
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                {question.type === "text" && (
                  <div className="flex flex-col items-start gap-6">
                    <input
                      id={`input-${question.id}`}
                      name={question.id}
                      ref={inputRef}
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={question.placeholder}
                      className="w-full bg-transparent border-b-2 border-white/20 text-3xl md:text-4xl py-4 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/20"
                    />
                    <button
                      onClick={handleNext}
                      disabled={!textInput.trim()}
                      className="group bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:text-white flex items-center gap-2"
                    >
                      OK <Check className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <div className="text-white/40 text-sm mt-2">Pressione Enter ↵</div>
                  </div>
                )}

                {question.type === "options" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options?.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option.value)}
                        className="text-left bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-white/10 p-6 rounded-2xl text-xl font-medium transition-all group flex items-center gap-4"
                      >
                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-sm text-white/50 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none -z-10 translate-x-1/2" />
    </div>
  );
}
