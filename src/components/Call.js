import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UIfx from 'uifx';
import beep from '../sounds/ding.mp3';
import useInterval from '@use-it/interval';

function Call() {
  const viewCall = useSelector(state => state.call);
  var html = 'https://priority-server.herokuapp.com';

  const [lastCall, setLastCall] = useState([]);
  const [listCall, setListCall] = useState([]);
  const [listCall3, setListCall3] = useState([]);

  // preparando o audio.
  const audio = new UIfx(beep, {
    volume: 1.0
  });

  // intervalo que atualiza periodicamente os registros de chamada.
  useInterval(() => {
    // eslint-disable-next-line
    if (viewCall == 1) {
      axios.get(html + '/lastcall').then(response => {
        setLastCall(response.data);
      });
      // lista que lida com as operações lógicas (quando aumenta para 4 registros, dispara o som).
      axios.get(html + '/call').then(response => {
        setListCall(response.data);
      });
      // lista fixa em 3 registros, para exibição no componente Call.
      axios.get(html + '/calllast3').then(response => {
        setListCall3(response.data);
      });
    }
  }, 3000);

  // intervalo que dispara o som quando existem mais de 3 registros de chamada.
  useInterval(() => {
    // eslint-disable-next-line
    if (viewCall == 1 && listCall.length > 3) {
      audio.play();
      deleteCall();
    }
  }, 5000);

  // função que deleta o registro de chamada mais antigo, mantendo a lista com 3 registros.
  const deleteCall = () => {
    axios.get(html + '/deletecall');
  };

  // função que exibe o último paciente chamado.
  function ShowLastCalled() {
    return (
      <div>
        <h3
          style={{
            marginBottom: 10,
            fontSize: 30,
            color: '#000000',
            fontWieght: 'bold'
          }}
        >
          CHAMADA ATUAL:
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 5,
            marginRight: 5,
            backgroundColor: '#E5E7E9',
            borderRadius: 5,
            width: 1200
          }}
        >
          {lastCall.map(item => (
            <div key={item.id}>
              <h1 style={{ marginTop: 5, fontSize: 40, color: '#000000' }}>
                NOME:
              </h1>
              <h1 style={{ fontSize: 80, color: 'red' }}>{item.nome}</h1>
              <h1 style={{ marginTop: 20, fontSize: 40, color: '#000000' }}>
                DOCUMENTO:
              </h1>
              <h1 style={{ fontSize: 60, color: 'red' }}>{item.doc}</h1>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // função que exibe uma lista com os 3 últimos pacientes chamados para acolhimento.
  function ShowCalls() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5
        }}
      >
        <h3
          style={{
            marginBottom: 10,
            fontSize: 30,
            color: '#000000',
            fontWieght: 'bold'
          }}
        >
          CHAMADAS ANTERIORES:
        </h3>
        {listCall3.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#AED6F1',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5,
              width: 1200
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 'bold',
                backgroundColor: '#5DADE2',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.chamada}
            </Button>
            <Button
              style={{
                color: '#000000',
                fontSize: 20,
                fontWeight: 'bold',
                backgroundColor: '#AED6F1',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left',
                width: 800
              }}
            >
              {item.nome}
            </Button>
          </p>
        ))}
      </div>
    );
  }

  // eslint-disable-next-line
  if (viewCall == 1) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <ShowLastCalled></ShowLastCalled>
        <ShowCalls></ShowCalls>
      </div>
    );
  } else {
    return null;
  }
}
export default Call;
