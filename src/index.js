import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// importações necessárias.
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// definindo estado inicial.
const initialState = {
  trigger: 0,
  header: 0,
  login: 1,
  loginUsuario: 0,
  loginUnidade: 0,
  loginSetor: 0,

  inserir: 0,
  inserirOptions: 0,
  editar: 0, // pode ser retirado?
  editarOptions: 0,
  corrigir: 0,

  itemId: 0,
  itemName: null,
  itemDoc: null,
  itemColor: null,
  itemGrupo: null,
  itemQueixa: null,
  itemEntrada: null,
  itemStatus: null,
  itemUnidade: null,
  itemUsuario: null,

  listaPreTriados: 0, // lista que exibe pacientes pré-triados pelo app Mobile ou pela recepção, não classificados como vermelhos.
  listaVermelhaPreTriados: 0,
  listaTriados: 0,
  listaVerdeTriados: 0,
  listaAmarelaTriados: 0,
  listaVermelhaTriados: 0,

  panel: 0,
  search: 0,
  dadosClinicos: 0,
  chart: 0,
  graph: 0,
  verde: 0,
  amarelo: 0,
  vermelho: 0,
  data1: 0,
  data2: 0,
  ano: 0,

  call: 0,
  sound: 0,

  pdf: 0
};

// definindo reducer.
const reducerChangeInsert = function reducerChangeInsert(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'LOGIN_OFF':
      return {
        login: 0
      };
    case 'LOGIN_ON':
      return {
        login: 1
      };
    case 'TRIGGER_ON':
      return {
        trigger: 1,
        search: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'TRIGGER_OFF':
      return {
        trigger: 0,
        header: 1,
        panel: 1,
        listaPreTriados: 1,
        listaVermelhaPreTriados: 1,
        search: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'INSERT_ON':
      return {
        header: 1,
        inserir: 1,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        search: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'INSERT_OPTIONS_ON':
      return {
        header: 1,
        inserirOptions: 1,
        dadosClinicos: 0,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        search: 0,
        itemName: action.payloadName,
        itemDoc: action.payloadDoc,
        itemEntrada: action.payloadEntrada,
        itemStatus: action.payloadStatus,
        itemUnidade: action.payloadUnidade,
        itemUsuario: action.payloadUsuario,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'UPDATE_OPTIONS_ON':
      return {
        header: 1,
        editarOptions: 1,
        dadosClinicos: 0,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        search: 0,
        itemId: action.payloadId,
        itemName: action.payloadName,
        itemDoc: action.payloadDoc,
        itemEntrada: action.payloadEntrada,
        itemStatus: action.payloadStatus,
        itemUnidade: action.payloadUnidade,
        itemUsuario: action.payloadUsuario,
        itemGrupo: action.payloadGrupo,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'FIX_ON':
      return {
        header: 1,
        corrigir: 1,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        search: 0,
        itemId: action.payloadId,
        itemName: action.payloadName,
        itemDoc: action.payloadDoc,
        itemColor: action.payloadColor,
        itemEntrada: action.payloadEntrada,
        itemStatus: action.payloadStatus,
        itemUnidade: action.payloadUnidade,
        itemUsuario: action.payloadUsuario,
        itemGrupo: action.payloadGrupo,
        itemQueixa: action.payloadQueixa,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'LISTA_PRE-TRIADOS':
      return {
        search: 0,
        header: 1,
        panel: 1,
        listaPreTriados: 1,
        listaVermelhaPreTriados: 1,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'LISTA_TRIADOS':
      return {
        search: 0,
        header: 1,
        panel: 1,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 1,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'LISTA_VERDE_TRIADOS':
      return {
        search: 0,
        header: 1,
        panel: 1,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 1,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'LISTA_AMARELA_TRIADOS':
      return {
        search: 0,
        header: 1,
        panel: 1,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 1,
        listaVermelhaTriados: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'LISTA_VERMELHA_TRIADOS':
      return {
        search: 0,
        header: 1,
        panel: 1,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 1,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'SELECTED_ON':
      return {
        header: 1,
        panel: 1,
        search: 1,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'DADOS_CLINICOS_INSERT_ON':
      return {
        header: 1,
        inserirOptions: 1,
        dadosClinicos: 1,
        search: 0,
        itemName: action.payloadName,
        itemDoc: action.payloadDoc,
        itemColor: action.payloadColor,
        itemQueixa: action.payloadQueixa,
        itemGrupo: action.payloadGrupo,
        itemEntrada: action.payloadEntrada,
        itemStatus: action.payloadStatus,
        itemUnidade: action.payloadUnidade,
        itemUsuario: action.payloadUsuario,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'DADOS_CLINICOS_UPDATE_ON':
      return {
        header: 1,
        editarOptions: 1,
        dadosClinicos: 1,
        search: 0,
        itemId: action.payloadId,
        itemName: action.payloadName,
        itemDoc: action.payloadDoc,
        itemColor: action.payloadColor,
        itemQueixa: action.payloadQueixa,
        itemGrupo: action.payloadGrupo,
        itemEntrada: action.payloadEntrada,
        itemStatus: action.payloadStatus,
        itemUnidade: action.payloadUnidade,
        itemUsuario: action.payloadUsuario,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'CHART_ON':
      return {
        header: 1,
        panel: 1,
        chart: 1,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'GRAPH_ON':
      return {
        header: 1,
        panel: 1,
        graph: 1,
        verde: action.payloadVerde,
        amarelo: action.payloadAmarelo,
        vermelho: action.payloadVermelho,
        data1: action.payloadData1,
        data2: action.payloadData2,
        ano: action.payloadAno,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'CALL_ON':
      return {
        header: 0,
        panel: 0,
        graph: 0,
        call: 1,
        listaPreTriados: 0,
        listaVermelhaPreTriados: 0,
        listaTriados: 0,
        listaVerdeTriados: 0,
        listaAmarelaTriados: 0,
        listaVermelhaTriados: 0,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    case 'PDF_ON':
      return {
        pdf: 1,
        itemName: action.payloadName,
        itemDoc: action.payloadDoc,
        itemColor: action.payloadColor,
        loginUnidade: action.payloadUnidade,
        loginSetor: action.payloadSetor,
        loginUsuario: action.payloadUsuario
      };
    default:
      return state;
  }
};

// criando a store.
const store = createStore(
  reducerChangeInsert,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
