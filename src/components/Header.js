import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import call from '../images/call.png';
import chart from '../images/chart.png';
import logo from '../images/logo.svg';

function Header() {
  const changeState = useDispatch();

  const loginUnidade = useSelector(state => state.loginUnidade);
  const loginSetor = useSelector(state => state.loginSetor);
  const loginUsuario = useSelector(state => state.loginUsuario);
  const viewHeader = useSelector(state => state.header);

  // função para retornar ao componente 'Login'.
  const clickLogin = () => {
    changeState({ type: 'LOGIN_ON' });
  };

  // função para retornar ao componente 'Lista'.
  const clickVoltar = () => {
    changeState({
      type: 'TRIGGER_OFF',
      payloadUnidade: loginUnidade,
      payloadSetor: loginSetor,
      payloadUsuario: loginUsuario
    });
  };

  // função para ativação do componente 'Chart'.
  const clickChartButton = () => {
    changeState({
      type: 'CHART_ON',
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario,
      payloadSetor: loginSetor
    });
  };

  // função para ativação do componente 'Call'.
  const openCall = () => {
    changeState({
      type: 'CALL_ON'
    });
  };

  // eslint-disable-next-line
  if (viewHeader == 1) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '20vh'
        }}
      >
        <div>
          <h1
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EBEDEF',
              color: '#000000',
              height: 100,
              paddingRight: 40,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5,
              borderRadius: 5
            }}
          >
            <img alt="" src={logo} style={{ width: 150, height: 150 }}></img>{' '}
            PRIORITY: {loginUnidade}
          </h1>
        </div>
        <div
          style={{
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 5,
            marginRight: 5
          }}
        >
          <Button disabled={true} variant="primary">
            USUÁRIO: {loginUsuario}
          </Button>
          <div>
            <Button
              style={{ marginTop: 5 }}
              variant="primary"
              title="RETORNAR À LISTA DE PACIENTES."
              onClick={() => clickVoltar()}
            >
              VOLTAR
            </Button>
            <Button
              style={{ marginTop: 5, marginLeft: 5 }}
              variant="primary"
              title="FAZER LOGOFF."
              onClick={() => clickLogin()}
            >
              SAIR
            </Button>
          </div>
        </div>
        <div>
          <img
            onClick={() => clickChartButton()}
            alt=""
            src={chart}
            style={{ width: 70, height: 70 }}
          ></img>
          <img
            onClick={() => openCall()}
            alt=""
            src={call}
            style={{ width: 70, height: 70 }}
          ></img>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default Header;
