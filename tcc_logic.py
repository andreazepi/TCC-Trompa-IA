from datetime import datetime


def executar_logica(dados: dict) -> dict:
    """Ponto unico para colar a logica principal do TCC.

    Substitua o corpo desta funcao pela logica gerada no Gemini.
    A interface Streamlit em app.py envia um dicionario e espera um dicionario de volta.
    """
    tema = str(dados.get("tema", "")).strip()
    objetivo = str(dados.get("objetivo", "")).strip()
    prioridade = str(dados.get("prioridade", "Media")).strip() or "Media"
    andamento = dados.get("andamento", 0)

    if not tema:
        tema = "Tema nao informado"

    if not objetivo:
        objetivo = "Objetivo nao informado"

    return {
        "status": "ok",
        "mensagem": "Logica de exemplo executada. Troque esta funcao pela sua logica real.",
        "entrada_normalizada": {
            "tema": tema,
            "objetivo": objetivo,
            "prioridade": prioridade,
            "andamento": andamento,
        },
        "metadata": {
            "executado_em": datetime.now().isoformat(timespec="seconds"),
            "versao": "v1-base",
        },
    }
