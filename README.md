# TCC Trompa AI - Workstation de Pesquisa

Plataforma completa para catalogação e análise de técnicas de interpretação da trompa em trilhas sonoras de cinema.

## 📋 Status do Projeto

✅ **Backend Python (Streamlit)** – Configurado e pronto  
✅ **Frontend React (Vite)** – Compilado com sucesso  
✅ **Painel Retrátil** – Otimizado para economizar espaço de tela  
✅ **LocalStorage** – Sincronização automática de dados  
✅ **Integração Gemini AI** – Pronta (aguarda chave de API)

---

## 🚀 Início Rápido

### 1️⃣ Clonar o Repositório
```bash
git clone <seu-repositorio>
cd TCC-Trompa-AI
```

### 2️⃣ Opção A: Frontend React (Recomendado)

**Instalação:**
```bash
cd web
npm install
cp .env.example .env
```

**Adicionar chave Gemini (opcional):**
Edite `web/.env` e cole:
```
VITE_GEMINI_API_KEY=seu_api_key_aqui
```

**Rodar localmente:**
```bash
npm run dev
# Servidor iniciará em http://localhost:5173
```

**Build para produção:**
```bash
npm run build
# Saída em dist/ pronta para deploy
```

---

### 2️⃣ Opção B: Backend Python (Streamlit)

**Instalação:**
```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows
source .venv/bin/activate     # macOS/Linux
pip install -r requirements.txt
```

**Rodar localmente:**
```bash
streamlit run app.py
# Servidor iniciará em http://localhost:8501
```

---

## 🌐 Deploy

### Frontend (Recomendado: Vercel)

1. Faça push do repositório para GitHub
2. Acesse https://vercel.com/new
3. Importe o repositório
4. Configure:
   - **Root Directory:** `web`
   - **Environment Variables:** Adicione `VITE_GEMINI_API_KEY`
5. Deploy automático ✨

### Backend (Streamlit Community Cloud)

1. Faça push para GitHub
2. Acesse https://share.streamlit.io
3. Conecte seu repositório
4. Configure:
   - **Main file path:** `app.py`
   - **Environment:** Adicione `STREAMLIT_PYTHON_EXECUTABLE` se necessário
5. Deploy automático ✨

---

## 📁 Estrutura do Projeto

```
TCC-Trompa-AI/
├── web/
│   ├── src/
│   │   ├── App.jsx           # Interface React principal
│   │   ├── main.jsx          # Ponto de entrada
│   │   └── index.css         # Estilos globais
│   ├── index.html            # Template HTML
│   ├── package.json          # Dependências npm
│   ├── vite.config.js        # Configuração Vite
│   ├── .env                  # Variáveis de ambiente (gitignored)
│   ├── .env.example          # Template .env
│   └── dist/                 # Build de produção
├── app.py                    # Interface Streamlit
├── tcc_logic.py              # Lógica da aplicação
├── requirements.txt          # Dependências Python
├── COMO_PUBLICAR_TCC.md      # Guia detalhado de publicação
└── README.md                 # Este arquivo
```

---

## ⚙️ Funcionalidades

- 📅 **Protocolo de 14 dias**: Estrutura de pesquisa em filme da trompa
- 🎬 **6 filmes principais**: Star Wars, E.T., Jurassic Park, LOTR, Piratas, O Rei Leão
- 📊 **Catálogo técnico**: Tessitura, interpretação, estratégias pedagógicas
- 🤖 **Assistente IA**: Análises personalizadas via Gemini
- 💾 **Sincronização Local**: Dados persistidos em localStorage
- 📱 **Design responsivo**: Otimizado para desktop e tablet
- 🎯 **Painel retrátil**: Maximize espaço de conteúdo conforme necessário

---

## 🔧 Configuração Avançada

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_GEMINI_API_KEY` | Chave de API do Google Gemini | `AIzaSy...` |

### Adquirir Chave Gemini

1. Acesse https://aistudio.google.com/app/apikey
2. Crie uma nova chave de API
3. Copie e cole em `web/.env`
4. Reinicie o servidor

---

## 🐛 Troubleshooting

**Frontend não abre?**
- Verifique se `npm install` completou sem erros
- Limpe cache: `rm -rf node_modules package-lock.json && npm install`
- Tente porta alternativa: `npm run dev -- --port 3000`

**Erro "Cannot find module 'react'"?**
- Execute `npm install` novamente na pasta `web/`

**Streamlit não inicia?**
- Ative o ambiente: `.\.venv\Scripts\Activate.ps1` (Windows)
- Reinstale dependências: `pip install -r requirements.txt`

---

## 📚 Documentação Adicional

- [Como Publicar o TCC](./COMO_PUBLICAR_TCC.md) – Guia completo de deploy
- [Protocolo 14 Dias](./web/src/App.jsx) – Estrutura de pesquisa incorporada
- [Lógica da Aplicação](./tcc_logic.py) – Funções de processamento

---

## 📝 Próximos Passos

1. **Adicionar Chave Gemini** – Habilitar assistente IA
2. **Preencher Protocolo** – Seguir os 14 dias de pesquisa
3. **Exportar Relatório** – Gerar documento final (TXT)
4. **Deploy Público** – Escolher Vercel (React) ou Streamlit Cloud
5. **Compartilhar Link** – Apresentar ao Professor Igor

---

## 👨‍💻 Autor
André Pinto | 2026 | Orientador: Professor Igor

Criado com ❤️ para a conclusão de curso em Trompa
