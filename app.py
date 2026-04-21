import json

import streamlit as st

from tcc_logic import executar_logica

st.set_page_config(
    page_title="Painel TCC",
    page_icon="🎓",
    layout="wide",
)

st.title("Painel do TCC")
st.caption("Estrutura pronta para plugar sua logica do Gemini e publicar na nuvem.")

tab_form, tab_json = st.tabs(["Entrada manual", "Entrada JSON"])

with tab_form:
    col1, col2 = st.columns(2)

    with col1:
        st.subheader("Dados de entrada")
        tema = st.text_input("Tema do projeto", placeholder="Ex.: Sistema de recomendacao para estudos")
        objetivo = st.text_area(
            "Objetivo principal",
            placeholder="Descreva em 2 ou 3 linhas o objetivo do seu TCC.",
            height=120,
        )

    with col2:
        st.subheader("Parametros")
        nivel = st.selectbox("Nivel de prioridade", ["Baixa", "Media", "Alta"])
        nota = st.slider("Nota atual do andamento", min_value=0, max_value=10, value=5)

    dados_formulario = {
        "tema": tema,
        "objetivo": objetivo,
        "prioridade": nivel,
        "andamento": nota,
    }

    if st.button("Executar logica (formulario)", use_container_width=True):
        if not tema.strip() or not objetivo.strip():
            st.warning("Preencha tema e objetivo para continuar.")
        else:
            resultado = executar_logica(dados_formulario)
            st.success("Processamento concluido.")
            st.markdown("### Resultado")
            st.json(resultado)
            st.download_button(
                "Baixar resultado (.json)",
                data=json.dumps(resultado, ensure_ascii=False, indent=2),
                file_name="resultado_tcc.json",
                mime="application/json",
                use_container_width=True,
            )

with tab_json:
    st.subheader("Cole um JSON com os dados")
    texto_json = st.text_area(
        "Entrada JSON",
        value='{"tema": "", "objetivo": "", "prioridade": "Media", "andamento": 5}',
        height=220,
    )

    if st.button("Executar logica (JSON)", use_container_width=True):
        try:
            dados_json = json.loads(texto_json)
        except json.JSONDecodeError as erro:
            st.error(f"JSON invalido: {erro}")
        else:
            resultado = executar_logica(dados_json)
            st.success("Processamento concluido.")
            st.markdown("### Resultado")
            st.json(resultado)
            st.download_button(
                "Baixar resultado (.json)",
                data=json.dumps(resultado, ensure_ascii=False, indent=2),
                file_name="resultado_tcc.json",
                mime="application/json",
                use_container_width=True,
            )

st.divider()
st.info(
    "Cole sua logica do Gemini no arquivo tcc_logic.py, na funcao executar_logica. "
    "A interface Streamlit continua a mesma; o frontend React fica em web/src/App.jsx."
)
