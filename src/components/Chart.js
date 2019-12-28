import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import swal from 'sweetalert';

function Chart() {
  var html = 'https://priority-server.herokuapp.com';
  const changeState = useDispatch();
  const viewChart = useSelector(state => state.chart);

  const loginUnidade = useSelector(state => state.loginUnidade);
  const loginSetor = useSelector(state => state.loginSetor);
  const loginUsuario = useSelector(state => state.loginUsuario);

  const [lenghtVerde, setLenghtVerde] = useState([]);
  const [lenghtAmarelo, setLenghtAmarelo] = useState([]);
  const [lenghtVermelho, setLenghtVermelho] = useState([]);

  // variáveis e função (mountGraphic) que preparam os dados utilizados no gráfico tipo torta/pizza.
  var vermelho = 0;
  var amarelo = 0;
  var verde = 0;

  var dia1 = '';
  var mes1 = '';
  var ano1 = '';

  var dia2 = '';
  var mes2 = '';
  var ano2 = '';

  var data1 = '';
  var data2 = '';

  const mountGraphic = () => {
    dia1 = document.getElementById('dia1').value;
    mes1 = document.getElementById('mes1').value;
    ano1 = document.getElementById('ano1').value;
    dia2 = document.getElementById('dia2').value;
    mes2 = document.getElementById('mes2').value;
    ano2 = document.getElementById('ano2').value;
    data1 = '"' + ano1 + '-' + mes1 + '-' + dia1 + '"';
    data2 = '"' + ano2 + '-' + mes2 + '-' + dia2 + '"';
    // obtendo o número de pacientes verdes no período determinado.
    axios
      .get(html + '/listpacientesverdesgrafico/' + data1 + '/' + data2)
      .then(res => {
        setLenghtVerde(res.data);
      });
    verde = lenghtVerde.length;
    // obtendo o número de pacientes amarelos no período determinado.
    axios
      .get(html + 'listpacientesamarelosgrafico/' + data1 + '/' + data2)
      .then(res => {
        setLenghtAmarelo(res.data);
      });
    amarelo = lenghtAmarelo.length;
    // obtendo o número de pacientes vermelhos no período determinado.
    axios
      .get(html + '/listpacientesvermelhosgrafico/' + data1 + '/' + data2)
      .then(res => {
        setLenghtVermelho(res.data);
      });
    vermelho = lenghtVermelho.length;
  };

  // função que renderiza o componente 'Graphic'.
  const showGraphic = () => {
    mountGraphic();
    if (
      // eslint-disable-next-line
      dia1 != '' &&
      // eslint-disable-next-line
      mes1 != '' &&
      // eslint-disable-next-line
      ano1 != '' &&
      // eslint-disable-next-line
      dia2 != '' &&
      // eslint-disable-next-line
      mes2 != '' &&
      // eslint-disable-next-line
      ano2 != ''
    ) {
      setTimeout(function() {
        changeState({
          type: 'GRAPH_ON',
          payloadUnidade: loginUnidade,
          payloadSetor: loginSetor,
          payloadUsuario: loginUsuario,
          payloadVerde: verde,
          payloadAmarelo: amarelo,
          payloadVermelho: vermelho,
          payloadData1: data1,
          payloadData2: data2,
          payloadAno: ano2
        });
      }, 2000);
    } else {
      swal(
        'CAMPOS EM BRANCO!',
        'Por favor, preencha corretamente os campos.',
        'warning'
      );
    }
  };

  // eslint-disable-next-line
  if (viewChart == 1) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh'
        }}
      >
        <div>
          <h3 style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>
            DISTRIBUIÇÃO DE PACIENTES SEGUNDO A CLASSIFICAÇÃO DE RISCO EM UM
            DADO PERÍODO.
          </h3>
          <h3
            style={{
              fontSize: 16,
              color: 'red',
              marginTop: 5,
              marginBottom: 20
            }}
          >
            POR FAVOR, PREENCHA OS CAMPOS ABAIXO.
          </h3>
          <div>DATA INICIAL</div>
          <div>
            <input
              onChange={() => mountGraphic()}
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                width: 50,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9'
              }}
              autoComplete="off"
              type="number"
              id="dia1"
              placeholder="DIA"
            ></input>
            <label>/</label>
            <input
              onChange={() => mountGraphic()}
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                width: 50,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9'
              }}
              autoComplete="off"
              type="number"
              id="mes1"
              placeholder="MÊS"
            ></input>
            <label>/</label>
            <input
              onChange={() => mountGraphic()}
              style={{
                marginTop: 5,
                marginBottom: 20,
                marginLeft: 5,
                marginRight: 5,
                width: 100,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9'
              }}
              autoComplete="off"
              type="number"
              id="ano1"
              placeholder="ANO"
            ></input>
          </div>
          <div>DATA FINAL</div>
          <div>
            <input
              onChange={() => mountGraphic()}
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                width: 50,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9'
              }}
              autoComplete="off"
              type="number"
              id="dia2"
              placeholder="DIA"
            ></input>
            <label>/</label>
            <input
              onChange={() => mountGraphic()}
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                width: 50,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9'
              }}
              autoComplete="off"
              type="number"
              id="mes2"
              placeholder="MÊS"
            ></input>
            <label>/</label>
            <input
              onChange={() => mountGraphic()}
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                width: 100,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9'
              }}
              autoComplete="off"
              type="number"
              id="ano2"
              placeholder="ANO"
            ></input>
          </div>
          <div>
            <Button
              onClick={() => showGraphic()}
              variant="success"
              style={{
                marginLeft: 5,
                marginTop: 20,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default Chart;
