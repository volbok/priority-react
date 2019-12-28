import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../images/logo.svg';
import useInterval from '@use-it/interval';

function Login() {
  
  var html = 'https://priority-server.herokuapp.com/login/';
  const changeState = useDispatch();

  const viewLogin = useSelector(state => state.login);
  const [dataLogin, setDataLogin] = useState([]);

  var login = null;
  var senha = null;

  useInterval(() => {
    // eslint-disable-next-line
    if (viewLogin == 1) {
      updateDados();
    }
  }, 1000);

  // função que busca um registro de login válido no servidor.
  const updateDados = () => {
    login = document.getElementById('inputLogin').value;
    senha = document.getElementById('inputSenha').value;
    var quotes = "'";
    axios
      .get(html + quotes + login + quotes + '/' + quotes + senha + quotes)
      .then(res => {
        setDataLogin(res.data);
        console.log(dataLogin);
      });
  };

  // mapeando os dados do usuário logado (usuário, unidade e setor).
  const loginUsuario = dataLogin.map(login => login.usuario);
  const loginUnidade = dataLogin.map(login => login.unidade);
  const loginSetor = dataLogin.map(login => login.setor);
  console.log('VALIDANDO LOGIN...');

  // função para realização do login.
  const sendData = () => {
    updateDados();
    setTimeout(function() {
      if (dataLogin.length === 1) {
        console.log('LOGIN EFETUADO COM SUCESSO');
        // gatilho para abertura do componente 'List' e atualização das listas.
        changeState({
          type: 'TRIGGER_OFF',
          payloadUnidade: loginUnidade,
          payloadUsuario: loginUsuario,
          payloadSetor: loginSetor
        });
      } else {
        console.log('FALHA DE LOGIN');
        // alerta de erro.
        swal({
          title: 'ERRO',
          text: 'Login ou senha incorretos. Repita a operação.',
          icon: 'warning',
          dangerMode: true
        });
        changeState({ type: 'LOGIN_OFF' });
        changeState({ type: 'LOGIN_ON' });
      }
    }, 4000);
  };

  // eslint-disable-next-line
  if (viewLogin == 1) {
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
        <img alt="" src={logo} style={{ width: 300, height: 300 }}></img>
        <h2 style={{ marginBottom: 5 }}>PRIORITY</h2>
        <h3 style={{ fontSize: 16, color: 'green' }}>
          A SOLUÇÃO EM CLASSIFICAÇÃO DE RISCOS
        </h3>
        <div>
          <div>
            <label
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 5
              }}
            >
              LOGIN
            </label>
          </div>
          <div>
            <input
              onChange={() => updateDados()}
              autoComplete="off"
              style={{
                marginBottom: 20,
                width: 200,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9',
                transition: '0.3s all'
              }}
              type="text"
              id="inputLogin"
            ></input>
          </div>
          <div>
            <label
              style={{
                marginBottom: 5,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              SENHA
            </label>
          </div>
          <div>
            <input
              onChange={() => updateDados()}
              autoComplete="off"
              style={{
                width: 200,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9',
                transition: '0.3s all'
              }}
              type="password"
              id="inputSenha"
            ></input>
          </div>
        </div>
        <div>
          <Button
            onClick={() => sendData()}
            variant="secondary"
            style={{
              marginLeft: 5,
              marginTop: 20,
              marginBottom: 5
            }}
          >
            OK
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default Login;
