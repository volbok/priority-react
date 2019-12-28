import React from 'react';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';

function Insert() {
  const changeState = useDispatch();

  const viewComponent = useSelector(state => state.inserir);
  const loginUnidade = useSelector(state => state.loginUnidade);
  const loginSetor = useSelector(state => state.loginSetor);
  const loginUsuario = useSelector(state => state.loginUsuario);
  
  var n = '';
  var d = '';
  var e = moment().format('DD/MM/YYYY - HH:mm:ss'); // retorna a data atual formatada.
  var s = 'PRÉ-TRIADO';

  // função que prepara os dados de identificação do paciente e ativa o componente 'IsertOptions'.
  const clickConfirmarDados = () => {
    n = document.getElementById('inputName').value.toUpperCase();
    d = document.getElementById('inputDoc').value.toUpperCase();
    // eslint-disable-next-line
    if (n == '' || d == '') {
      insertError();
    } else {
      changeState({
        type: 'INSERT_OPTIONS_ON',
        payloadName: n,
        payloadDoc: d,
        payloadEntrada: e,
        payloadStatus: s,
        payloadUnidade: loginUnidade,
        payloadSetor: loginSetor,
        payloadUsuario: loginUsuario
      });
    }
  };

  // alerta de erro.
  const insertError = () => {
    swal({
      title: 'ERRO',
      text: 'Favor preencher campo(s) em branco.',
      icon: 'warning',
      dangerMode: true
    });
  };

  // eslint-disable-next-line
  if (viewComponent == 1) {
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
        <h2 style={{ marginBottom: 20 }}>ADICIONAR PACIENTE</h2>
        <div>
          <div>
            <label
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 5
              }}
            >
              NOME COMPLETO
            </label>
          </div>
          <div>
            <input
              style={{
                marginBottom: 20,
                width: 400,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#E5E7E9',
                transition: '0.3s all'
              }}
              autoComplete="off"
              type="text"
              id="inputName"
              placeholder="NOME COMPLETO"
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
              DOCUMENTO
            </label>
          </div>
          <div>
            <input
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
              autoComplete="off"
              type="text"
              id="inputDoc"
              placeholder="DOCUMENTO"
            ></input>
          </div>
        </div>
        <div>
          <Button
            onClick={() => clickConfirmarDados()}
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
export default Insert;
