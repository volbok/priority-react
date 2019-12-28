import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

function UpdateOptions() {
  var html = 'https://priority-server.herokuapp.com';
  const changeState = useDispatch();

  const viewUpdateOptions = useSelector(state => state.editarOptions);
  const e = useSelector(state => state.itemEntrada);
  const i = useSelector(state => state.itemId);
  const n = useSelector(state => state.itemName);
  const d = useSelector(state => state.itemDoc);

  const loginUnidade = useSelector(state => state.loginUnidade);
  const loginSetor = useSelector(state => state.loginSetor);
  const loginUsuario = useSelector(state => state.loginUsuario);

  const [dataOptionsVerdes, setDataOptionsVerdes] = useState([]);
  const [dataOptionsAmarelas, setDataOptionsAmarelas] = useState([]);
  const [dataOptionsVermelhas, setDataOptionsVermelhas] = useState([]);
  const [dataOptionsLeigos, setDataOptionsLeigos] = useState([]);

  var c = useSelector(state => state.itemColor);
  var g = useSelector(state => state.itemGrupo);
  var q = useSelector(state => state.itemQueixa);
  var s = useSelector(state => state.itemStatus);
  var dc = useSelector(state => state.dadosClinicos);
  var inputText = '';

  // funções que modificam a cor de um registro de triagem na avaliação dos dados clínicos.
  const changeRisktoYellow = () => {
    c = 'AMARELO';
    sendData(i);
  };

  const changeRisktoRed = () => {
    c = 'VERMELHO';
    sendData(i);
  };

  const mantainRisk = () => {
    sendData(i);
  };

  // funções deflagradas com a seleção de uma opção do fluxograma.
  const selectOption = item => {
    c = item.cor;
    g = item.grupo;
    q = document.getElementById('inputQueixa').value.toUpperCase();
    // eslint-disable-next-line
    if (q != '') {
      prepareData();
    } else {
      swal(
        'CAMPO EM BRANCO!',
        'Por favor, descreva a queixa do paciente.',
        'warning'
      );
    }
  };

  const selectOutros = () => {
    c = 'CINZA';
    g = 'OUTROS';
    q = document.getElementById('inputQueixa').value.toUpperCase();
    // eslint-disable-next-line
    if (q != '') {
      prepareData();
    } else {
      swal(
        'CAMPO EM BRANCO!',
        'Por favor, descreva a queixa do paciente.',
        'warning'
      );
    }
  };

  // função que prepara um registro de triagem para ser salvo ou abre a tela de dados clínicos.
  const prepareData = () => {
    // eslint-disable-next-line
    if (loginSetor == 0) {
      s = 'PRÉ-TRIADO';
      sendData(i);
      // eslint-disable-next-line
    } else if (loginSetor == 1 && c != 'VERMELHO') {
      s = 'TRIADO';
      changeState({
        type: 'DADOS_CLINICOS_UPDATE_ON',
        payloadId: i,
        payloadEntrada: e,
        payloadName: n,
        payloadDoc: d,
        payloadColor: c,
        payloadQueixa: q,
        payloadGrupo: g,
        payloadStatus: s,
        payloadUnidade: loginUnidade,
        payloadSetor: loginSetor,
        payloadUsuario: loginUsuario
      });
      // eslint-disable-next-line
    } else if (loginSetor == 1 && c == 'VERMELHO') {
      s = 'TRIADO';
      sendData(i);
    }
  };

  // função que salva o registro de triagem.
  const sendData = id => {
    var obj = {
      entrada: e,
      name: n,
      doc: d,
      color: c,
      grupo: g,
      queixa: q,
      status: s,
      unidade: loginUnidade,
      usuario: loginUsuario
    };
    axios
      .post(html + '/updatepacientes/' + id, obj)
      .then(res => console.log(res.data));
    setTimeout(function() {
      // eslint-disable-next-line
      if (loginSetor == 1) {
        changeState({
          type: 'PDF_ON',
          payloadName: n,
          payloadDoc: d,
          payloadColor: c,
          payloadUnidade: loginUnidade,
          payloadSetor: loginSetor,
          payloadUsuario: loginUsuario
        });
      } else {
        // gatilho para abertura do componente LIST e atualização das listas.
        changeState({
          type: 'TRIGGER_ON',
          payloadUnidade: loginUnidade,
          payloadSetor: loginSetor,
          payloadUsuario: loginUsuario
        });
        setTimeout(function() {
          changeState({
            type: 'TRIGGER_OFF',
            payloadUnidade: loginUnidade,
            payloadSetor: loginSetor,
            payloadUsuario: loginUsuario
          });
        }, 1000);
      }
    }, 3000);
  };

  // função que monta a lista de opções do fluxograma.
  const searchData = () => {
    inputText = document.getElementById('inputSearch').value;
    var quote1 = "'%25";
    var quote2 = "%25'";
    axios
      .get(html + '/options/enf/verdes/' + quote1 + inputText + quote2)
      .then(response => {
        setDataOptionsVerdes(response.data);
      });
    axios
      .get(html + '/options/enf/amarelas/' + quote1 + inputText + quote2)
      .then(response => {
        setDataOptionsAmarelas(response.data);
      });
    axios
      .get(html + '/options/enf/vermelhas/' + quote1 + inputText + quote2)
      .then(response => {
        setDataOptionsVermelhas(response.data);
      });
    axios
      .get(html + '/options/leigos/' + quote1 + inputText + quote2)
      .then(response => {
        setDataOptionsLeigos(response.data);
      });

    // ação tomada para atualização dos elementos do fluxograma.
    changeState({
      type: 'UPDATE_OPTIONS_ON',
      payloadId: i,
      payloadName: n,
      payloadDoc: d,
      payloadEntrada: e,
      payloadStatus: s,
      payloadUnidade: loginUnidade,
      payloadSetor: loginSetor,
      payloadUsuario: loginUsuario
    });
  };

  // funções que exibem as opções de classificação de risco.
  function ShowListaOptionsVerdes() {
    // eslint-disable-next-line
    if (loginSetor == 1) {
      return (
        <div>
          {dataOptionsVerdes.map(item => (
            <p
              key={item.id}
              style={{
                backgroundColor: '#E5E7E9',
                borderRadius: 5,
                textAlign: 'center',
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5
              }}
            >
              <Button
                className="float-none"
                onClick={() => selectOption(item)}
                variant="success"
                style={{
                  height: 100,
                  width: 250,
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 5
                }}
              >
                {item.texto}
              </Button>
            </p>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }

  function ShowListaOptionsAmarelas() {
    // eslint-disable-next-line
    if (loginSetor == 1) {
      return (
        <div>
          {dataOptionsAmarelas.map(item => (
            <p
              key={item.id}
              style={{
                backgroundColor: '#E5E7E9',
                borderRadius: 5,
                textAlign: 'center',
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5
              }}
            >
              <Button
                className="float-none"
                onClick={() => selectOption(item)}
                variant="warning"
                style={{
                  height: 100,
                  width: 250,
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 5
                }}
              >
                {item.texto}
              </Button>
            </p>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }

  function ShowListaOptionsVermelhas() {
    // eslint-disable-next-line
    if (loginSetor == 1) {
      return (
        <div>
          {dataOptionsVermelhas.map(item => (
            <p
              key={item.id}
              style={{
                backgroundColor: '#E5E7E9',
                borderRadius: 5,
                textAlign: 'center',
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5
              }}
            >
              <Button
                className="float-none"
                onClick={() => selectOption(item)}
                variant="danger"
                style={{
                  height: 100,
                  width: 250,
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 5
                }}
              >
                {item.texto}
              </Button>
            </p>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }

  function ShowListaOptionsLeigos() {
    // eslint-disable-next-line
    if (loginSetor == 0) {
      return (
        <div>
          <div>
            {dataOptionsLeigos.map(item => (
              <p
                key={item.id}
                style={{
                  backgroundColor: '#E5E7E9',
                  borderRadius: 5,
                  textAlign: 'center',
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                  marginBottom: 5
                }}
              >
                <Button
                  className="float-none"
                  onClick={() => selectOption(item)}
                  variant="danger"
                  style={{
                    height: 100,
                    width: 250,
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5
                  }}
                >
                  {item.texto}
                </Button>
              </p>
            ))}
          </div>
          <div>
            <Button
              className="float-none"
              onClick={() => selectOutros()}
              variant="secondary"
              style={{
                height: 100,
                width: 250,
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5
              }}
            >
              OUTROS
            </Button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  // função que exibe as opções de classificação de risco ("fluxogramas do Manchester").
  function ShowFluxograma() {
    return (
      <div>
        <h3 style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>
          SELECIONE UMA DAS OPÇÕES ABAIXO:
        </h3>
        <div
          style={{
            height: '40vh',
            width: 500,
            backgroundColor: '#E5E7E9',
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 5,
            marginBottom: 5,
            overflowY: 'scroll'
          }}
        >
          <ShowListaOptionsVermelhas></ShowListaOptionsVermelhas>
          <ShowListaOptionsAmarelas></ShowListaOptionsAmarelas>
          <ShowListaOptionsVerdes></ShowListaOptionsVerdes>
          <ShowListaOptionsLeigos></ShowListaOptionsLeigos>
        </div>
      </div>
    );
  }

  // função que exibe as opções dos dados clínicos.
  function ShowDadosClinicos() {
    return (
      <div
        style={{
          height: '40vh',
          marginTop: 20,
          marginBottom: 0
        }}
      >
        <h3>DADOS OBJETIVOS:</h3>
        <div>
          <Button
            onClick={() => changeRisktoRed()}
            variant="danger"
            style={{ height: 100, width: 200, marginRight: 5 }}
          >
            {'GLASGOW < 13'}
          </Button>
          <Button
            onClick={() => changeRisktoRed()}
            variant="danger"
            style={{ height: 100, width: 200 }}
          >
            {'SAO2 < 90%'}
          </Button>
          <Button
            onClick={() => changeRisktoRed()}
            variant="danger"
            style={{ height: 100, width: 200, marginLeft: 5 }}
          >
            {'PULSO < 40BPM OU > 130BPM'}
          </Button>
        </div>
        <div>
          <Button
            onClick={() => changeRisktoYellow()}
            variant="warning"
            style={{ height: 100, width: 200, marginTop: 5, marginBottom: 5 }}
          >
            {'TAX > 38.5ºC'}
          </Button>
        </div>
        <div>
          <Button
            onClick={() => mantainRisk()}
            variant="success"
            style={{ height: 100, width: 200 }}
          >
            DADOS CLÍNICOS NORMAIS
          </Button>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line
  if (viewUpdateOptions == 1 && dc == 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h3 style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>
          QUEIXA PRINCIPAL:
        </h3>
        <input
          style={{
            maginTop: 5,
            marginBottom: 5,
            width: 500,
            height: 50,
            textAlign: 'center',
            textTransform: 'uppercase',
            borderRadius: 5,
            border: 'none',
            outline: 'none',
            backgroundColor: '#E5E7E9'
          }}
          type="text"
          title="DESCREVA SUMARIAMENTE AS QUEIXAS DO PACIENTE."
          id="inputQueixa"
          placeholder=""
          autoComplete="off"
        ></input>
        <h3 style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>
          BUSCAR FLUXOGRAMA:
        </h3>
        <input
          style={{
            maginTop: 5,
            marginBottom: 5,
            width: 500,
            height: 50,
            textAlign: 'center',
            textTransform: 'uppercase',
            borderRadius: 5,
            border: 'none',
            outline: 'none',
            backgroundColor: '#E5E7E9'
          }}
          onChange={() => searchData()}
          type="text"
          title="ESCREVA A PRINCIPAL QUEIXA DO PACIENTE, E O SISTEMA BUSCARÁ AS MELHORES SUGESTÕES DE CLASSIFICAÇÃO."
          id="inputSearch"
          placeholder=""
          autoComplete="off"
        ></input>
        <ShowFluxograma></ShowFluxograma>
      </div>
    );
    // eslint-disable-next-line
  } else if (viewUpdateOptions == 1 && dc == 1) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <ShowDadosClinicos></ShowDadosClinicos>
      </div>
    );
  } else {
    return null;
  }
}
export default UpdateOptions;
