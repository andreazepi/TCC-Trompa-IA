# Como publicar o app do TCC

## 1) Rodar localmente
No terminal, dentro da pasta do projeto:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
streamlit run app.py
```

Depois abra o endereco mostrado no terminal (normalmente http://localhost:8501).

## 2) Subir para o GitHub
Se ainda nao estiver versionado com os novos arquivos:

```powershell
git add .
git commit -m "feat: app web do tcc com streamlit"
git push
```

## 3) Publicar no Streamlit Community Cloud
1. Acesse https://share.streamlit.io
2. Entre com sua conta GitHub.
3. Clique em **New app**.
4. Selecione seu repositorio.
5. Em **Main file path**, informe: `app.py`.
6. Clique em **Deploy**.

Em poucos minutos voce recebe um link publico para usar e compartilhar.

## 4) Estrutura do codigo

- A interface Streamlit fica em `app.py`.
- A logica principal fica em `tcc_logic.py`.
- A interface React fica em `web/src/App.jsx`.

## 4) Atualizar com seu codigo real (Gemini)
1. Abra `tcc_logic.py`.
2. Substitua o corpo da funcao `executar_logica(dados: dict) -> dict` pela sua logica real.
3. Mantenha o retorno como dicionario Python (ele aparece como JSON no app).

Exemplo de estrutura esperada:

```python
def executar_logica(dados: dict) -> dict:
	# sua logica aqui
	return {"status": "ok", "resultado": "..."}
```

Com isso, voce nao precisa mexer em `app.py`. A interface e o deploy ja estao prontos.

## 5) Publicar versao React (arquivo App.jsx salvo)

Seu arquivo foi integrado no frontend em `web/src/App.jsx`.

### Rodar localmente

```powershell
cd web
npm install
copy .env.example .env
# edite o arquivo .env e preencha VITE_GEMINI_API_KEY
npm run dev
```

### Publicar na Vercel (mais simples para React)

1. Suba o repositorio no GitHub com a pasta `web`.
2. Acesse https://vercel.com/new e importe o repositorio.
3. Em Root Directory, selecione `web`.
4. Em Environment Variables, crie `VITE_GEMINI_API_KEY` com sua chave.
5. Clique em Deploy.

Depois do deploy, a Vercel gera uma URL publica do app.
