import React, { useState, useEffect } from 'react';
import {
  Music, History, Users, ClipboardCheck,
  Plus, CheckCircle2,
  Microscope, Clock, PlayCircle, BookOpen, Trash2,
  Sparkles, Loader2, ChevronUp, ChevronDown
} from 'lucide-react';

// Constantes de dados
const films = [
  { id: 'sw', title: "Star Wars", comp: "John Williams" },
  { id: 'et', title: "E.T. O Extraterrestre", comp: "John Williams" },
  { id: 'jp', title: "Jurassic Park", comp: "John Williams" },
  { id: 'lotr', title: "O Senhor dos Anéis", comp: "Howard Shore" },
  { id: 'pirates', title: "Piratas das Caraíbas", comp: "Hans Zimmer" },
  { id: 'lion', title: "O Rei Leão", comp: "Hans Zimmer" }
];

const PROTOCOLO = {
  1: {
    titulo: "Imersão: Star Wars & John Williams (1977)",
    instrucoes: [
      "Passo 1: Assista aos primeiros 20 minutos de 'Star Wars: A New Hope'. Foque na primeira aparição da trompa.",
      "Passo 2: Pesquise quem foi o solista de 1977. Dica: Procure pela seção de trompas da London Symphony Orchestra na época.",
      "Passo 3: No campo 'Contexto Histórico', escreva como Williams resgatou a orquestra romântica de Strauss/Wagner.",
      "Passo 4: Identifique o 'Leitmotif' da Força e anote a tonalidade original e o impacto do timbre da trompa."
    ]
  },
  2: {
    titulo: "Análise Técnica: Star Wars (Binary Sunset)",
    instrucoes: [
      "Passo 1: Abra a cena do Pôr do Sol Duplo. Faça a minutagem exata do filme.",
      "Passo 2: Abra a partitura e o áudio original. Observe o salto de 4ª justa inicial. O som é 'metálico' ou 'lírico'?",
      "Passo 3: Toque o trecho no seu instrumento. Anote qual nota da série harmônica é mais difícil de estabilizar.",
      "Passo 4: Cadastre o excerto no Laboratório abaixo com estas impressões técnicas e físicas."
    ]
  },
  3: {
    titulo: "Lirismo e Timbre: E.T. (1982)",
    instrucoes: [
      "Passo 1: Pesquise sobre Vince DeRosa. Ele é o som da trompa de Hollywood. O que define o seu timbre? (Vibrato, clareza?).",
      "Passo 2: Assista à cena da bicicleta voando. Como a trompa interage com as cordas e madeiras?",
      "Passo 3: No campo 'Histórico', descreva a evolução da escrita de Williams de 1977 para 1982 (mais lírica).",
      "Passo 4: Verifique se houve uso de sintetizadores a dobrar a trompa para encorpar o som."
    ]
  },
  4: {
    titulo: "Execução: Flying Theme (E.T.)",
    instrucoes: [
      "Passo 1: Minutagem: Diferencie o áudio do filme (mixagem com SFX) do áudio do CD (OST pura).",
      "Passo 2: Análise de Articulação: As ligaduras são curtas ou amplas? Como isso afeta o suporte da coluna de ar?",
      "Passo 3: Prática Individual: Tente tocar o tema principal. Onde são os pontos ideais de respiração?",
      "Passo 4: Registre as 'Dificuldades Reais' encontradas durante a execução no catálogo."
    ]
  },
  5: {
    titulo: "Majestade e Registro: Jurassic Park (1993)",
    instrucoes: [
      "Passo 1: Assista à cena da chegada à ilha de helicóptero. A trompa apresenta o tema após o piano.",
      "Passo 2: Pesquise sobre Jim Thatcher. Ele gravou este filme. Qual o bocal e trompa que ele utilizava?",
      "Passo 3: No site, escreva sobre como a trompa evoca a 'Grandiosidade da Natureza' nesta obra.",
      "Passo 4: Analise a orquestração: a trompa está a solo ou dobrada por trombones/fagotes?"
    ]
  },
  6: {
    titulo: "Análise de Salto: Jurassic Park",
    instrucoes: [
      "Passo 1: Identifique o salto de 8ª e o ataque no Sol agudo (G5) no tema principal.",
      "Passo 2: Minutagem: Marque o tempo de sustentação dessa nota na gravação original (durabilidade).",
      "Passo 3: Prática: Tente 10 ataques diferentes nesse Sol agudo. Qual a sua taxa de precisão?",
      "Passo 4: Sugira no campo 'Estratégia' um exercício de flexibilidade (ex: Bai Lin) para este salto."
    ]
  },
  7: {
    titulo: "A Trompa Nobre: Howard Shore (2001)",
    instrucoes: [
      "Passo 1: Assista a 'A Sociedade do Anel'. Foque no tema da Sociedade (The Fellowship).",
      "Passo 2: Pesquise a London Philharmonic. O som das trompas inglesas é mais 'escuro' que as americanas?",
      "Passo 3: Escreva sobre o uso da trompa como símbolo de 'Antiguidade' e 'Nobreza' na Terra Média.",
      "Passo 4: Identifique se o tema é apresentado em solo ou pela seção completa em uníssono."
    ]
  },
  8: {
    titulo: "Afinação de Seção: Lord of the Rings",
    instrucoes: [
      "Passo 1: Ouça o tema da Sociedade com fones. Tente isolar a 4ª trompa (as notas graves de suporte).",
      "Passo 2: Minutagem: Marque o clímax da cena onde as 8 trompas tocam juntas (fortíssimo).",
      "Passo 3: Prática: Toque o tema focando na projeção do som sem perder o centro da nota.",
      "Passo 4: Cadastre o excerto e comente sobre a 'espessura' e densidade do som da seção."
    ]
  },
  9: {
    titulo: "Modernidade e Força: Hans Zimmer",
    instrucoes: [
      "Passo 1: Pesquise o estilo de Zimmer. Ele usa muitas trompas (até 16). O que é o som 'Cuivré'?",
      "Passo 2: Assista a Piratas das Caraíbas. A trompa tem um papel mais rítmico ou melódico nesta trilha?",
      "Passo 3: Diferencie a trompa de Zimmer da de Williams (Ataque percussivo vs Lirismo clássico).",
      "Passo 4: Escreva sobre a resistência física extrema necessária para estas gravações modernas."
    ]
  },
  10: {
    titulo: "Maratona de Resistência: Zimmer",
    instrucoes: [
      "Passo 1: Minutagem: Marque o trecho de maior intensidade rítmica em 'He's a Pirate'.",
      "Passo 2: Análise Técnica: Como os ataques curtos e rápidos afetam a fadiga da embocadura?",
      "Passo 3: Prática: Toque o trecho 4 vezes sem parar. Onde o som começa a 'rachar' ou falhar?",
      "Passo 4: Sugira exercícios de 'Power Horn' e staccato no campo de estratégias pedagógicas."
    ]
  },
  11: {
    titulo: "Consolidação: Fichas dos Colegas",
    instrucoes: [
      "Passo 1: Reúna todas as fichas de avaliação que os seus colegas trompistas preencheram.",
      "Passo 2: Compare as respostas: Qual o trecho que gerou mais consenso de dificuldade?",
      "Passo 3: No site, em cada filme, preencha o campo 'Resumo das Fichas' com os dados coletados.",
      "Passo 4: Identifique padrões: 'Todos sentiram a mesma dificuldade no salto de Jurassic Park?'."
    ]
  },
  12: {
    titulo: "Estratégias Pedagógicas (Cap. 5)",
    instrucoes: [
      "Passo 1: Revise todas as 'Dificuldades Práticas' que anotou nos dias de estudo.",
      "Passo 2: Selecione 3 métodos fundamentais (ex: Kopprasch, Farkas, Shoemaker) para as soluções.",
      "Passo 3: No módulo final do site, organize a sua rotina de estudos sugerida para performance em estúdio.",
      "Passo 4: Crie o 'Guia de Sobrevivência': Como se preparar para uma gravação de trilha sonora."
    ]
  },
  13: {
    titulo: "Refinamento Académico & ABNT",
    instrucoes: [
      "Passo 1: Verifique se todos os títulos de filmes e obras estão corretamente em itálico.",
      "Passo 2: Garanta que os nomes dos músicos (Vince DeRosa, Thatcher, etc.) estão corretos.",
      "Passo 3: Releia a dissertação da Erika Wilsen e cite-a nas suas conclusões sobre o lirismo.",
      "Passo 4: Verifique se o seu Sumário e Introdução refletem o que realmente descobriu."
    ]
  },
  14: {
    titulo: "Finalização e Exportação",
    instrucoes: [
      "Passo 1: Faça uma revisão final em todos os campos. Nenhum filme deve ter análises vazias.",
      "Passo 2: Clique no botão 'Exportar Relatório Final (TXT)'.",
      "Passo 3: Organize os seus ficheiros de áudio e partitura para os anexos do TCC.",
      "Passo 4: Envie o documento final para o Professor Igor para a revisão final antes da banca."
    ]
  }
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

const App = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [activeFilm, setActiveFilm] = useState('sw');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isMissionExpanded, setIsMissionExpanded] = useState(true);
  const toggleMissionPanel = () => setIsMissionExpanded((prev) => !prev);
  const [db, setDb] = useState(() => {
    const saved = localStorage.getItem('tcc_horn_pro_final_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      }
    }
    const initialDb = {
      final_pedagogy: '',
      final_conclusion: ''
    };
    films.forEach(f => {
      initialDb[f.id] = {
        id: f.id,
        title: f.title,
        comp: f.comp,
        status: 'pendente',
        history: { style: '', musicians: '', topic: '' },
        excerpts: [],
        peerSummary: ''
      };
    });
    return initialDb;
  });

  useEffect(() => {
    localStorage.setItem('tcc_horn_pro_final_v2', JSON.stringify(db));
  }, [db]);

  // Função auxiliar para chamada Gemini com backoff
  const callGemini = async (prompt, systemPrompt) => {
    if (!apiKey) {
      throw new Error("Defina VITE_GEMINI_API_KEY no arquivo .env para usar IA.");
    }

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError = null;

    for (const model of models) {
      let delay = 1000;
      const retries = 3;

      for (let i = 0; i < retries; i++) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            let serverMessage = '';
            try {
              const errorBody = await response.json();
              serverMessage = errorBody?.error?.message || '';
            } catch (_) {
              serverMessage = '';
            }
            throw new Error(`Falha na API (${response.status})${serverMessage ? `: ${serverMessage}` : ''}`);
          }

          const result = await response.json();
          const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!text) {
            throw new Error('A API respondeu sem conteúdo de texto.');
          }
          return text;
        } catch (error) {
          lastError = error;
          if (i < retries - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 2;
          }
        }
      }
    }

    throw lastError || new Error('Falha ao chamar a API do Gemini.');
  };

  const generateAiHistory = async () => {
    const filmData = db[activeFilm];
    if (!filmData.title) return;

    setIsAiLoading(true);
    const systemPrompt = "Você é um musicólogo especializado em trilhas sonoras de cinema. Seu objetivo é ajudar um estudante de Bacharelado em Trompa a expandir sua pesquisa histórica. Escreva em português formal acadêmico.";
    const prompt = `Expanda a pesquisa histórica para o filme "${filmData.title}" composto por "${filmData.comp}". Fale sobre o estilo de orquestração para metais, a importância da trompa nessa trilha específica e menções a solistas famosos se houver. Use as notas atuais como base: ${filmData.history.style}.`;

    try {
      const result = await callGemini(prompt, systemPrompt);
      if (result) {
        const h = { ...db[activeFilm].history, style: result };
        updateFilmData('history', h);
      }
    } catch (e) {
      alert(e.message);
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const generateAiAnalysis = async (index) => {
    const ex = db[activeFilm].excerpts[index];
    if (!ex.titulo) return;

    setIsAiLoading(true);
    const systemPrompt = "Você é um professor de trompa especialista em repertório sinfônico e cinematográfico. Analise os desafios técnicos de um excerto musical para ajudar um aluno de bacharelado.";
    const prompt = `Analise o excerto "${ex.titulo}" do filme "${db[activeFilm].title}".
      Dados fornecidos:
      Tessitura: ${ex.tessitura}
      Interpretacao Original: ${ex.interpretacao}
      Dificuldade Prática: ${ex.dificuldadePratica}

      Por favor, forneça uma análise técnica profunda e sugira estratégias de estudo (métodos como Kopprasch, Farkas, etc.) para vencer os desafios desse trecho.`;

    try {
      const result = await callGemini(prompt, systemPrompt);
      if (result) {
        updateEx(index, 'estrategiaPedagogica', result);
      }
    } catch (e) {
      alert(e.message);
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const generateAiSummary = async () => {
    setIsAiLoading(true);
    const systemPrompt = "Você é um orientador de TCC em música. Sua tarefa é sintetizar dados de pesquisa em uma conclusão acadêmica robusta e formal.";

    const context = films.map(f => {
      const data = db[f.id];
      return `- ${f.title}: ${data.history.style.substring(0, 100)}... Excertos: ${data.excerpts.length}`;
    }).join('\n');

    const prompt = `Com base nas seguintes pesquisas parciais sobre a performance da trompa no cinema:\n${context}\n\nEscreva uma conclusão acadêmica (Capítulo 5) que sintetize os principais desafios técnicos e estilísticos encontrados em obras de John Williams, Howard Shore e Hans Zimmer. Fale sobre a evolução do papel do instrumento.`;

    try {
      const result = await callGemini(prompt, systemPrompt);
      if (result) {
        setDb(prev => ({ ...prev, final_pedagogy: result }));
      }
    } catch (e) {
      alert(e.message);
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const updateFilmData = (field, value) => {
    setDb(prev => ({ ...prev, [activeFilm]: { ...prev[activeFilm], [field]: value } }));
  };

  const addExcerpt = () => {
    const newEx = {
      id: Date.now(),
      titulo: '',
      minFilme: '',
      minAudio: '',
      tessitura: '',
      intervalos: '',
      interpretacao: '',
      dificuldadePratica: '',
      estrategiaPedagogica: ''
    };
    const currentExcerpts = db[activeFilm]?.excerpts || [];
    updateFilmData('excerpts', [...currentExcerpts, newEx]);
  };

  const updateEx = (index, field, value) => {
    const list = [...(db[activeFilm]?.excerpts || [])];
    if (list[index]) {
      list[index][field] = value;
      updateFilmData('excerpts', list);
    }
  };

  const removeEx = (index) => {
    if (confirm("Deseja remover esta análise de trecho?")) {
      const list = (db[activeFilm]?.excerpts || []).filter((_, i) => i !== index);
      updateFilmData('excerpts', list);
    }
  };

  const exportFinal = () => {
    let text = `TRABALHO DE CONCLUSÃO DE CURSO - TROMPA NO CINEMA\n`;
    text += `AUTOR: ANDRÉ PINTO | ORIENTADOR: IGOR\n`;
    text += `DATA DE EXPORTAÇÃO: ${new Date().toLocaleDateString()}\n`;
    text += `========================================================\n\n`;

    films.forEach(f => {
      const data = db[f.id];
      if (data) {
        text += `>>> FILME: ${f.title.toUpperCase()}\n`;
        text += `COMPOSITOR: ${f.comp}\n`;
        text += `HISTÓRICO: ${data.history?.style || 'N/A'}\n`;
        text += `MÚSICOS: ${data.history?.musicians || 'N/A'}\n\n`;

        (data.excerpts || []).forEach((ex, i) => {
          text += `  EXCERTO ${i + 1}: ${ex.titulo || 'Sem título'}\n`;
          text += `  Minutagem Filme: ${ex.minFilme || '-'} | Áudio OST: ${ex.minAudio || '-'}\n`;
          text += `  Tessitura: ${ex.tessitura || '-'}\n`;
          text += `  Interpretacao Original: ${ex.interpretacao || '-'}\n`;
          text += `  Sua Prática: ${ex.dificuldadePratica || '-'}\n`;
          text += `  Estratégia: ${ex.estrategiaPedagogica || '-'}\n\n`;
        });
        text += `RESUMO DAS FICHAS (PARES): ${data.peerSummary || 'N/A'}\n\n`;
        text += `--------------------------------------------------------\n\n`;
      }
    });

    text += `\nCAPÍTULO 5 - ESTRATÉGIAS PEDAGÓGICAS GERAIS:\n${db.final_pedagogy || 'N/A'}\n\n`;
    text += `CONSIDERAÇÕES FINAIS:\n${db.final_conclusion || 'N/A'}\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Relatorio_Final_TCC_Trompa_AI.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-[#FDFCFB] text-slate-900 font-sans overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-80 bg-[#121417] text-slate-400 flex flex-col border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 bg-[#0B0D0E] border-b border-slate-800">
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Music className="text-amber-500" /> TCC TROMPA AI
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Investigação de Performance ✨</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-4 px-2">Protocolo Diário</h3>
            <div className="space-y-1">
              {Object.keys(PROTOCOLO).map(day => (
                <button
                  key={day}
                  onClick={() => setActiveDay(parseInt(day))}
                  className={`w-full text-left p-2.5 rounded-xl text-[11px] transition-all flex items-start gap-3 border ${activeDay === parseInt(day) ? 'bg-amber-600/20 text-amber-400 border-amber-600/30' : 'border-transparent hover:bg-white/5'}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${activeDay === parseInt(day) ? 'bg-amber-500 text-white border-amber-400' : 'border-slate-700 text-slate-500 font-bold'}`}>
                    {day}
                  </span>
                  <span className={activeDay === parseInt(day) ? 'font-bold' : ''}>{PROTOCOLO[day].titulo}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-4 px-2">Análise por Filme</h3>
            <div className="space-y-1">
              {films.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilm(f.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex justify-between items-center ${activeFilm === f.id ? 'bg-white text-slate-900 shadow-lg scale-105' : 'hover:bg-white/5'}`}
                >
                  <div className="truncate">
                    <p className="text-xs font-bold truncate">{f.title}</p>
                    <p className="text-[9px] opacity-40 uppercase">{f.comp}</p>
                  </div>
                  {db[f.id]?.status === 'concluido' && <CheckCircle2 size={12} className="text-emerald-500" />}
                </button>
              ))}
              <button
                onClick={() => setActiveFilm('final')}
                className={`w-full text-left p-3 mt-4 rounded-xl border-2 border-dashed ${activeFilm === 'final' ? 'bg-emerald-500 text-white border-emerald-400' : 'border-slate-800 text-slate-600 hover:bg-white/5'}`}
              >
                <span className="text-xs font-bold">Resumo & Conclusão ✨</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#0B0D0E] border-t border-slate-800">
          <button
            onClick={exportFinal}
            className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all active:scale-95"
          >
            Exportar Relatório Final (TXT)
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO */}
      <main className="flex-1 overflow-y-auto flex flex-col relative">

        {/* MANUAL DO DIA - RETRÁTIL */}
        <section className={`bg-amber-50 border-b-2 border-amber-100 sticky top-0 z-10 transition-all duration-300 ${isMissionExpanded ? 'p-4' : 'p-3'}`}>
          <div className="max-w-4xl mx-auto">
            <div
              className="flex items-center justify-between gap-4 cursor-pointer"
              onClick={toggleMissionPanel}
              role="button"
              tabIndex={0}
              aria-expanded={isMissionExpanded}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleMissionPanel();
                }
              }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-md shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2 leading-tight">
                    Missão do Dia {activeDay}
                    {!isMissionExpanded && <span className="text-[10px] font-normal lowercase bg-amber-200 px-2 rounded-full hidden sm:inline">clique para expandir</span>}
                  </h2>
                  <p className="text-xs font-bold text-amber-700 uppercase truncate max-w-[500px]">{PROTOCOLO[activeDay].titulo}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {isAiLoading && <div className="animate-pulse text-amber-600 font-bold text-[10px] flex items-center gap-2 uppercase shrink-0"><Loader2 className="animate-spin" size={14}/> IA...</div>}
                <button 
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleMissionPanel();
                  }}
                  className="p-2 hover:bg-amber-200 rounded-full transition-colors text-amber-700 shrink-0"
                >
                  {isMissionExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>

            {isMissionExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {(PROTOCOLO[activeDay]?.instrucoes || []).map((inst, i) => (
                  <div key={i} className="flex gap-3 bg-white/60 p-2.5 rounded-xl border border-amber-200/50 text-[11px] leading-relaxed shadow-sm">
                    <span className="w-5 h-5 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center font-bold shrink-0 text-[10px]">{i + 1}</span>
                    <p>{inst}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* EDITOR */}
        <div className="p-10 pb-40">
          <div className="max-w-4xl mx-auto space-y-12">

            {activeFilm === 'final' ? (
              <div className="space-y-10 animate-in fade-in duration-500">
                <div className="flex justify-between items-center">
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Capítulo 5 & Conclusões</h3>
                  <button
                    onClick={generateAiSummary}
                    disabled={isAiLoading}
                    className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                  >
                    <Sparkles size={16} /> Sintetizar Pesquisa ✨
                  </button>
                </div>
                <div className="space-y-6">
                  <label className="block">
                    <span className="text-xs font-black uppercase text-slate-400 mb-2 block">Síntese de Estratégias Pedagógicas (Sugestão IA ✨)</span>
                    <textarea
                      value={db.final_pedagogy || ''}
                      onChange={(e) => setDb(prev => ({ ...prev, final_pedagogy: e.target.value }))}
                      placeholder="Reúna aqui os principais exercícios e métodos..."
                      className="w-full h-80 p-8 rounded-[2.5rem] border-2 border-emerald-100 bg-white shadow-xl outline-none focus:border-emerald-500 text-sm leading-relaxed"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-black uppercase text-slate-400 mb-2 block">Considerações Finais do TCC</span>
                    <textarea
                      value={db.final_conclusion || ''}
                      onChange={(e) => setDb(prev => ({ ...prev, final_conclusion: e.target.value }))}
                      placeholder="Qual o balanço final da sua investigação?"
                      className="w-full h-48 p-8 rounded-[2.5rem] border-2 border-slate-200 bg-white shadow-xl outline-none focus:border-slate-900 text-sm leading-relaxed"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-end border-b-2 border-slate-100 pb-8">
                  <div>
                    <h3 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{db[activeFilm]?.title}</h3>
                    <p className="text-lg text-slate-400 font-bold mt-2 uppercase tracking-widest">{db[activeFilm]?.comp}</p>
                  </div>
                  <select
                    value={db[activeFilm]?.status || 'pendente'}
                    onChange={(e) => updateFilmData('status', e.target.value)}
                    className="bg-white border-2 border-slate-200 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:border-amber-500 outline-none cursor-pointer"
                  >
                    <option value="pendente">Não Iniciado</option>
                    <option value="fazendo">Em Execução</option>
                    <option value="concluido">Concluído</option>
                  </select>
                </div>

                {/* Investigação Histórica */}
                <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                  <div className="p-8 bg-slate-50 border-b flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <History className="text-amber-500" size={24} />
                      <h4 className="font-black text-slate-800 uppercase tracking-tight">Investigação Histórica ✨</h4>
                    </div>
                    <button
                      onClick={generateAiHistory}
                      disabled={isAiLoading}
                      className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-amber-200 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <Sparkles size={14} /> Expandir com IA ✨
                    </button>
                  </div>
                  <div className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estilo & Período (Expansão IA ✨)</label>
                        <textarea
                          value={db[activeFilm]?.history?.style || ''}
                          onChange={(e) => {
                            const h = { ...(db[activeFilm]?.history || {}), style: e.target.value };
                            updateFilmData('history', h);
                          }}
                          placeholder="Descreva a orquestração..."
                          className="w-full h-40 p-5 rounded-2xl bg-slate-100/50 border border-slate-100 text-sm outline-none focus:bg-white"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solistas Originais (Gravação)</label>
                        <textarea
                          value={db[activeFilm]?.history?.musicians || ''}
                          onChange={(e) => {
                            const h = { ...(db[activeFilm]?.history || {}), musicians: e.target.value };
                            updateFilmData('history', h);
                          }}
                          placeholder="Quem tocou? Escola de trompa?"
                          className="w-full h-40 p-5 rounded-2xl bg-slate-100/50 border border-slate-100 text-sm outline-none focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Laboratório de Excertos */}
                <section className="space-y-8">
                  <div className="flex justify-between items-center px-4">
                    <h4 className="text-2xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
                      <Microscope size={28} className="text-amber-500" /> Laboratório Técnico
                    </h4>
                    <button
                      onClick={addExcerpt}
                      className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:bg-slate-800 shadow-2xl active:scale-95 transition-all"
                    >
                      <Plus size={18} /> Novo Trecho
                    </button>
                  </div>

                  {(db[activeFilm]?.excerpts || []).map((ex, idx) => (
                    <div key={ex.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
                      <div className="p-6 bg-[#1A1C20] flex justify-between items-center text-white">
                        <div className="flex items-center gap-6">
                          <span className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-black text-sm">{idx + 1}</span>
                          <input
                            value={ex.titulo || ''}
                            onChange={(e) => updateEx(idx, 'titulo', e.target.value)}
                            className="bg-transparent text-white font-black text-lg outline-none border-b-2 border-white/10 focus:border-amber-500 w-[300px]"
                            placeholder="Nome do Trecho"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => generateAiAnalysis(idx)}
                            disabled={isAiLoading || !ex.titulo}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all flex items-center gap-2 disabled:opacity-30"
                          >
                            <Sparkles size={14} /> Analisar com IA ✨
                          </button>
                          <button onClick={() => removeEx(idx)} className="text-white/20 hover:text-red-500 transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="p-10 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase mb-4 flex items-center gap-2"><Clock size={14} /> Localização</h5>
                            <div className="space-y-4">
                              <input value={ex.minFilme || ''} onChange={(e) => updateEx(idx, 'minFilme', e.target.value)} className="w-full p-3 bg-white border rounded-xl text-xs font-bold" placeholder="Tempo no Filme" />
                              <input value={ex.minAudio || ''} onChange={(e) => updateEx(idx, 'minAudio', e.target.value)} className="w-full p-3 bg-white border rounded-xl text-xs font-bold" placeholder="Tempo no Áudio OST" />
                            </div>
                          </div>
                          <div className="md:col-span-2 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase mb-4 flex items-center gap-2"><BookOpen size={14} /> Análise Musicológica (Score)</h5>
                            <div className="grid grid-cols-2 gap-4">
                              <textarea value={ex.tessitura || ''} onChange={(e) => updateEx(idx, 'tessitura', e.target.value)} className="h-24 p-4 rounded-xl text-xs bg-white border outline-none" placeholder="Tessitura & Registro..." />
                              <textarea value={ex.intervalos || ''} onChange={(e) => updateEx(idx, 'intervalos', e.target.value)} className="h-24 p-4 rounded-xl text-xs bg-white border outline-none" placeholder="Saltos & Intervalos..." />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-3">
                            <h5 className="text-[10px] font-black text-amber-600 uppercase flex items-center gap-2"><PlayCircle size={16} /> Performance Original</h5>
                            <textarea value={ex.interpretacao || ''} onChange={(e) => updateEx(idx, 'interpretacao', e.target.value)} className="w-full h-32 p-5 rounded-[2rem] bg-amber-50/20 border border-amber-100 outline-none text-sm italic" placeholder="Interpretacao..." />
                          </div>
                          <div className="space-y-3">
                            <h5 className="text-[10px] font-black text-emerald-600 uppercase flex items-center gap-2"><Users size={16} /> Sua Prática no Metal</h5>
                            <textarea value={ex.dificuldadePratica || ''} onChange={(e) => updateEx(idx, 'dificuldadePratica', e.target.value)} className="w-full h-32 p-5 rounded-[2rem] bg-emerald-50/20 border border-emerald-100 outline-none text-sm" placeholder="Sua experiência..." />
                          </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                          <label className="text-[10px] font-black text-slate-400 uppercase block mb-3">Estratégia Pedagógica Sugerida (Sugestão IA ✨)</label>
                          <textarea
                            value={ex.estrategiaPedagogica || ''}
                            onChange={(e) => updateEx(idx, 'estrategiaPedagogica', e.target.value)}
                            placeholder="Métodos e exercícios sugeridos pela IA..."
                            className="w-full h-32 p-5 rounded-2xl bg-slate-900 text-amber-200 text-xs outline-none border-none shadow-2xl leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </section>

                {/* Fichas de Colegas */}
                <section className="bg-emerald-600 rounded-[2.5rem] shadow-2xl overflow-hidden mb-20 text-white">
                  <div className="p-8 bg-black/10 border-b border-white/10 flex items-center gap-4">
                    <ClipboardCheck size={28} />
                    <h4 className="font-black text-xl uppercase tracking-tighter">Resumo das Fichas</h4>
                  </div>
                  <div className="p-10">
                    <textarea
                      value={db[activeFilm]?.peerSummary || ''}
                      onChange={(e) => updateFilmData('peerSummary', e.target.value)}
                      placeholder="Consolide aqui o relato dos colegas..."
                      className="w-full h-48 p-8 rounded-[2rem] bg-white/10 border border-white/20 outline-none placeholder:text-white/30 text-sm leading-relaxed"
                    />
                  </div>
                </section>
              </>
            )}

          </div>
        </div>

        {/* FOOTER */}
        <div className="fixed bottom-0 right-0 left-80 bg-white/80 backdrop-blur-md p-4 px-10 border-t flex justify-between items-center z-30">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sincronização Ativa ✨</span>
          </div>
          <button onClick={() => {
            if (confirm("ATENÇÃO: Limpar base de dados?")) {
              localStorage.removeItem('tcc_horn_pro_final_v2');
              window.location.reload();
            }
          }} className="text-[10px] font-bold text-red-400 uppercase hover:underline">Limpar Base</button>
        </div>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
