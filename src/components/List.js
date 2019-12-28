import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import call from '../images/call.png';
import moment from 'moment';

function List() {
  var html = 'https://priority-server.herokuapp.com';
  const changeState = useDispatch();

  const loginUnidade = useSelector(state => state.loginUnidade);
  const loginSetor = useSelector(state => state.loginSetor);
  const loginUsuario = useSelector(state => state.loginUsuario);

  const viewListaPreTriados = useSelector(state => state.listaPreTriados);

  const viewListaTriados = useSelector(state => state.listaTriados);
  const viewListaVerdeTriados = useSelector(state => state.listaVerdeTriados);
  const viewListaAmarelaTriados = useSelector(
    state => state.listaAmarelaTriados
  );
  const viewListaVermelhaTriados = useSelector(
    state => state.listaVermelhaTriados
  );

  const [dataPreTriados, setDataPreTriados] = useState([]);
  const [dataVermelhoPreTriados, setDataVermelhoPreTriados] = useState([]);
  const [dataVerdeTriados, setDataVerdeTriados] = useState([]);
  const [dataAmareloTriados, setDataAmareloTriados] = useState([]);
  const [dataVermelhoTriados, setDataVermelhoTriados] = useState([]);

  // função que ativa o componente 'UpdateOptions'.
  const selectItemList = item => {
    changeState({
      type: 'UPDATE_OPTIONS_ON',
      payloadId: item.id,
      payloadName: item.name,
      payloadDoc: item.doc,
      payloadColor: item.color,
      payloadEntrada: item.entrada,
      payloadStatus: item.status,
      payloadSetor: loginSetor,
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario
    });
  };

  // função que ativa o componente 'Fix'.
  const corrigirItemList = item => {
    changeState({
      type: 'FIX_ON',
      payloadId: item.id,
      payloadName: item.name,
      payloadDoc: item.doc,
      payloadColor: item.color,
      payloadGrupo: item.grupo,
      payloadQueixa: item.queixa,
      payloadEntrada: item.entrada,
      payloadStatus: item.status,
      payloadSetor: loginSetor,
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario
    });
  };

  // funções que tratam da deleção de um registro.
  const deleteConfirm = item => {
    swal({
      title: 'EXCLUIR PACIENTE?',
      text: 'Confirmar exclusão do paciente ' + item.name + '?',
      icon: 'warning',
      dangerMode: true
    }).then(deleteItem => {
      if (deleteItem) {
        deleteItemList(item.id);
        swal('EXCLUIDO!', 'Paciente excluído com sucesso!', 'success');
      }
    });
  };

  const deleteItemList = id => {
    console.log('id selecionado: ' + id);
    fetch(html + '/deletepacientes/' + id)
      .then(console.log('id deletado: ' + id))
      .catch(err => console.log(err));
    changeState({
      type: 'TRIGGER_ON',
      payloadUnidade: loginUnidade,
      payloadSetor: loginSetor,
      payloadUsuario: loginUsuario
    });
  };

  // carregamento inicial das listas.
  useEffect(() => {
    axios.get(html + '/listpacientespretriados').then(response => {
      setDataPreTriados(response.data);
    });
    axios.get(html + '/listpacientes/vermelhospretriados').then(response => {
      setDataVermelhoPreTriados(response.data);
    });
    axios.get(html + '/listpacientes/verdestriados').then(response => {
      setDataVerdeTriados(response.data);
    });
    axios.get(html + '/listpacientes/amarelostriados').then(response => {
      setDataAmareloTriados(response.data);
    });
    axios.get(html + '/listpacientes/vermelhostriados').then(response => {
      setDataVermelhoTriados(response.data);
    });
  }, []);

  // gatilho para atualização das listas (deflagra a função 'refreshPanel').
  const refreshLista = () => {
    axios.get(html + '/listpacientespretriados').then(response => {
      setDataPreTriados(response.data);
    });
    axios.get(html + '/listpacientes/vermelhospretriados').then(response => {
      setDataVermelhoPreTriados(response.data);
    });
    axios.get(html + '/listpacientes/verdestriados').then(response => {
      setDataVerdeTriados(response.data);
    });
    axios.get(html + '/listpacientes/amarelostriados').then(response => {
      setDataAmareloTriados(response.data);
    });
    axios.get(html + '/listpacientes/vermelhostriados').then(response => {
      setDataVermelhoTriados(response.data);
    });
    changeState({
      type: 'TRIGGER_OFF',
      payloadUnidade: loginUnidade,
      payloadSetor: loginSetor,
      payloadUsuario: loginUsuario
    });
    console.log('LISTAS ATUALIZADAS');
  };

  const trigger = useSelector(state => state.trigger);
  if (trigger === 1) {
    refreshLista();
  }

  // insere o registro selecionado na lista de chamadas do componente 'Call'.
  const sendCall = item => {
    var timecall = moment().format('DD/MM/YYYY - HH:mm:ss');
    var obj = {
      chamada: timecall,
      nome: item.name,
      doc: item.doc
    };
    axios.post(html + '/insertcall', obj).then(res => console.log(res.data));
    swal(
      'CHAMADA EFETUADA',
      'O paciente ' + item.name + ' foi chamado para acolhimento.'
    );
  };

  // listas que permitem classificar os pacientes (exibem o botão 'classificar')
  // funções que renderizam as listas de pacientes pré-triados.
  function ShowListaPreTriados() {
    return (
      <div>
        {dataPreTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#AAB7B8',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#839192',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#EC7063',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#AAB7B8',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <img
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                width: 30,
                height: 30,
                textAlign: 'right'
              }}
              alt=""
              src={call}
              onClick={() => sendCall(item)}
            ></img>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
            <Button
              className="float-right"
              onClick={() => selectItemList(item)}
              variant="success"
              style={{
                marginLeft: 5,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              CLASSIFICAR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  function ShowListaVermelhaPreTriados() {
    return (
      <div>
        {dataVermelhoPreTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F1948A',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#EC7063',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#EC7063',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#F1948A',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <img
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                width: 30,
                height: 30,
                textAlign: 'right'
              }}
              alt=""
              src={call}
              onClick={() => sendCall(item)}
            ></img>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
            <Button
              className="float-right"
              onClick={() => selectItemList(item)}
              variant="success"
              style={{
                marginLeft: 5,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              CLASSIFICAR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  // listas que permitem reclassificar os pacientes (exibem o botão 'reclassificar').
  // funções que renderizam as listas de pacientes triados.
  function ShowListaVerdeTriados() {
    return (
      <div>
        {dataVerdeTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#82E0AA',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#58D68D',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#82E0AA',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#82E0AA',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
            <Button
              className="float-right"
              onClick={() => selectItemList(item)}
              variant="success"
              style={{
                marginLeft: 5,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              RECLASSIFICAR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  function ShowListaAmarelaTriados() {
    return (
      <div>
        {dataAmareloTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F7DC6F',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#F4D03F',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#82E0AA',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#F7DC6F',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
            <Button
              className="float-right"
              onClick={() => selectItemList(item)}
              variant="success"
              style={{
                marginLeft: 5,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              RECLASSIFICAR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  function ShowListaVermelhaTriados() {
    return (
      <div>
        {dataVermelhoTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F1948A',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#EC7063',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#82E0AA',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#F1948A',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
            <Button
              className="float-right"
              onClick={() => selectItemList(item)}
              variant="success"
              style={{
                marginLeft: 5,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              RECLASSIFICAR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  // listas que não permitem classificar os pacientes (não exibem o botão 'classificar').
  // listas de pacientes pré-triados.
  function ShowListaPreTriadosBlock() {
    return (
      <div>
        {dataPreTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#AAB7B8',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#839192',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#EC7063',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#AAB7B8',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  function ShowListaVermelhaPreTriadosBlock() {
    return (
      <div>
        {dataVermelhoPreTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F1948A',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#EC7063',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#EC7063',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#F1948A',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  // listas de pacientes triados.
  function ShowListaVerdeTriadosBlock() {
    return (
      <div>
        {dataVerdeTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#82E0AA',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#58D68D',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#82E0AA',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#82E0AA',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  function ShowListaAmarelaTriadosBlock() {
    return (
      <div>
        {dataAmareloTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F7DC6F',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#F4D03F',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#82E0AA',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#F7DC6F',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  function ShowListaVermelhaTriadosBlock() {
    return (
      <div>
        {dataVermelhoTriados.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F1948A',
              borderRadius: 5,
              textAlign: 'left',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <Button
              disabled
              style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                backgroundColor: '#EC7063',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.entrada}
            </Button>
            <Button
              disabled
              style={{
                color: '#82E0AA',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                borderColor: 'transparent',
                borderRadius: 5,
                width: 130,
                marginLeft: 0,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'center'
              }}
            >
              {item.status}
            </Button>
            <Button
              onClick={() => corrigirItemList(item)}
              style={{
                color: '#000000',
                fontWeight: 'bold',
                backgroundColor: '#F1948A',
                borderColor: 'transparent',
                borderRadius: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                textAlign: 'left'
              }}
            >
              {item.name}
            </Button>
            <Button
              className="float-right"
              onClick={() => deleteConfirm(item)}
              variant="danger"
              style={{
                marginLeft: 0,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5
              }}
            >
              EXCLUIR
            </Button>
          </p>
        ))}
      </div>
    );
  }

  // eslint-disable-next-line
  if (viewListaPreTriados == 1 && loginSetor == 1) {
    if (dataPreTriados.length > 0 || dataVermelhoPreTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVermelhaPreTriados></ShowListaVermelhaPreTriados>
          <ShowListaPreTriados></ShowListaPreTriados>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaVerdeTriados == 1 && loginSetor == 1) {
    if (dataVerdeTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVerdeTriados></ShowListaVerdeTriados>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaAmarelaTriados == 1 && loginSetor == 1) {
    if (dataAmareloTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaAmarelaTriados></ShowListaAmarelaTriados>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaVermelhaTriados == 1 && loginSetor == 1) {
    if (dataVermelhoTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVermelhaTriados></ShowListaVermelhaTriados>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaTriados == 1 && loginSetor == 1) {
    if (
      dataVerdeTriados.length > 0 ||
      dataAmareloTriados.length > 0 ||
      dataVermelhoTriados.length > 0
    ) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVermelhaTriados></ShowListaVermelhaTriados>
          <ShowListaAmarelaTriados></ShowListaAmarelaTriados>
          <ShowListaVerdeTriados></ShowListaVerdeTriados>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaPreTriados == 1 && loginSetor == 0) {
    if (dataPreTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVermelhaPreTriadosBlock></ShowListaVermelhaPreTriadosBlock>
          <ShowListaPreTriadosBlock></ShowListaPreTriadosBlock>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaPreTriados == 1 && loginSetor == 0) {
    if (dataPreTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVermelhaPreTriadosBlock></ShowListaVermelhaPreTriadosBlock>
          <ShowListaPreTriadosBlock></ShowListaPreTriadosBlock>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaVerdeTriados == 1 && loginSetor == 0) {
    if (dataVerdeTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVerdeTriadosBlock></ShowListaVerdeTriadosBlock>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaAmarelaTriados == 1 && loginSetor == 0) {
    if (dataAmareloTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaAmarelaTriadosBlock></ShowListaAmarelaTriadosBlock>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaVermelhaTriados == 1 && loginSetor == 0) {
    if (dataVermelhoTriados.length > 0) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxHeight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVermelhaTriadosBlock></ShowListaVermelhaTriadosBlock>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
    // eslint-disable-next-line
  } else if (viewListaTriados == 1 && loginSetor == 0) {
    if (
      dataVerdeTriados.length > 0 ||
      dataAmareloTriados.lenght > 0 ||
      dataVermelhoTriados.length > 0
    ) {
      return (
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            maxheight: '65vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <ShowListaVermelhaTriadosBlock></ShowListaVermelhaTriadosBlock>
          <ShowListaAmarelaTriadosBlock></ShowListaAmarelaTriadosBlock>
          <ShowListaVerdeTriadosBlock></ShowListaVerdeTriadosBlock>
        </div>
      );
    } else {
      return (
        <h3 style={{ fontSize: 16, color: 'red', marginTop: 5 }}>
          LISTA VAZIA.
        </h3>
      );
    }
  } else {
    return null;
  }
}
export default List;
