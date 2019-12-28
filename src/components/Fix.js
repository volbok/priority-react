import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';

function Fix() {
  var html = 'https://priority-server.herokuapp.com';
  const changeState = useDispatch();
  const viewCorrigir = useSelector(state => state.corrigir);

  const i = useSelector(state => state.itemId);
  var n = useSelector(state => state.itemName);
  var d = useSelector(state => state.itemDoc);
  var c = useSelector(state => state.itemColor);
  var g = useSelector(state => state.itemGrupo);
  var q = useSelector(state => state.itemQueixa);
  var e = useSelector(state => state.itemEntrada);
  var s = useSelector(state => state.itemStatus);

  const loginUnidade = useSelector(state => state.loginUnidade);
  const loginUsuario = useSelector(state => state.loginUsuario);
  const loginSetor = useSelector(state => state.loginSetor);

  // função que atualiza os dados.
  const clickConfirmarDados = () => {
    n = document.getElementById('inputName').value;
    d = document.getElementById('inputDoc').value;
    // eslint-disable-next-line
    if (n == '' || d == '') {
      insertError();
    } else {
      deleteItemList(i);
      sendData();
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

  // função que deleta o registro incorreto.
  const deleteItemList = id => {
    axios
      .get(html + '/deletepacientes/' + id)
      .then(res => console.log(res.data));
  };

  // função que insere o registro correto.
  const sendData = () => {
    var obj = {
      name: n,
      doc: d,
      color: c,
      grupo: g,
      queixa: q,
      entrada: e,
      status: s,
      unidade: loginUnidade,
      usuario: loginUsuario
    };
    axios
      .post(html + '/insertpacientes', obj)
      .then(res => console.log(res.data));
    setTimeout(function() {
      changeState({
        type: 'TRIGGER_ON',
        payloadUnidade: loginUnidade,
        payloadSetor: loginSetor,
        payloadUsuario: loginUsuario
      });
    }, 1000);
  };

  // eslint-disable-next-line
  if (viewCorrigir == 1) {
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
        <h2 style={{ marginBottom: 20 }}>CORRIGIR DADOS DE IDENTIFICAÇÃO</h2>
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
                border: '1px solid #B2BABB',
                outline: 'none',
                backgroundColor: '#F8F9F9',
                transition: '0.3s all'
              }}
              autoComplete="off"
              type="text"
              id="inputName"
              placeholder="NOME"
              defaultValue={n}
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
                border: '1px solid #B2BABB',
                outline: 'none',
                backgroundColor: '#F8F9F9',
                transition: '0.3s all'
              }}
              autoComplete="off"
              type="text"
              id="inputDoc"
              placeholder="DOC"
              defaultValue={d}
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
export default Fix;
