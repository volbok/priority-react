import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';

function Panel() {
  var html = 'https://priority-server.herokuapp.com';
  const changeState = useDispatch();

  const [lenghtPreTriados, setLenghtPreTriados] = useState([]);
  const [lenghtVermelhoPreTriados, setLenghtVermelhoPreTriados] = useState([]);

  const [lenghtTriados, setLenghtTriados] = useState([]);
  const [lenghtVerdeTriados, setLenghtVerdeTriados] = useState([]);
  const [lenghtAmareloTriados, setLenghtAmareloTriados] = useState([]);
  const [lenghtVermelhoTriados, setLenghtVermelhoTriados] = useState([]);

  const viewPanel = useSelector(state => state.panel);
  const viewSearch = useSelector(state => state.search);

  const loginUnidade = useSelector(state => state.loginUnidade);
  const loginUsuario = useSelector(state => state.loginUsuario);
  const loginSetor = useSelector(state => state.loginSetor);

  const [dataPreTriadosSearch, setDataPreTriadosSearch] = useState([]);
  const [dataVerdeSearch, setDataVerdeSearch] = useState([]);
  const [dataAmareloSearch, setDataAmareloSearch] = useState([]);
  const [dataVermelhoSearch, setDataVermelhoSearch] = useState([]);

  // estados que tratam das cores dos botões do painel.
  const [pretriadosColor, setPretriadosColor] = useState([]);
  const [triadosColor, setTriadosColor] = useState([]);
  const [greenColor, setGreenColor] = useState([]);
  const [yellowColor, setYellowColor] = useState([]);
  const [redColor, setRedColor] = useState([]);

  useEffect(() => {
    // atualizando as cores dos botões do painel (não selecionados)...
    setPretriadosColor('primary');
    setTriadosColor('secondary');
    setGreenColor('secondary');
    setYellowColor('secondary');
    setRedColor('secondary');
    // carregamento inicial das listas.
    axios.get(html + '/listpacientestriados').then(responseTriados => {
      setLenghtTriados(responseTriados.data);
    });
    axios
      .get(html + '/listpacientes/verdestriados')
      .then(responseVerdeTriados => {
        setLenghtVerdeTriados(responseVerdeTriados.data);
      });
    axios
      .get(html + '/listpacientes/amarelostriados')
      .then(responseAmareloTriados => {
        setLenghtAmareloTriados(responseAmareloTriados.data);
      });
    axios
      .get(html + '/listpacientes/vermelhostriados')
      .then(responseVermelhoTriados => {
        setLenghtVermelhoTriados(responseVermelhoTriados.data);
      });
    axios
      .get(html + '/listpacientespretriados')
      .then(responseListaPreTriados => {
        setLenghtPreTriados(responseListaPreTriados.data);
      });
    axios
      .get(html + '/listpacientes/vermelhospretriados')
      .then(responseVermelhoPreTriados => {
        setLenghtVermelhoPreTriados(responseVermelhoPreTriados.data);
      });
  }, []);

  // gatilho para atualização das listas (deflagra a função 'refreshPanel').
  const refreshPanel = () => {
    axios.get(html + '/listpacientestriados').then(responseTriados => {
      setLenghtTriados(responseTriados.data);
    });
    axios
      .get(html + '/listpacientes/verdestriados')
      .then(responseVerdeTriados => {
        setLenghtVerdeTriados(responseVerdeTriados.data);
      });
    axios
      .get(html + '/listpacientes/amarelostriados')
      .then(responseAmareloTriados => {
        setLenghtAmareloTriados(responseAmareloTriados.data);
      });
    axios
      .get(html + '/listpacientes/vermelhostriados')
      .then(responseVermelhoTriados => {
        setLenghtVermelhoTriados(responseVermelhoTriados.data);
      });
    axios
      .get(html + '/listpacientespretriados')
      .then(responseListaPreTriados => {
        setLenghtPreTriados(responseListaPreTriados.data);
      });
    axios
      .get(html + '/listpacientes/vermelhospretriados')
      .then(responseVermelhoPreTriados => {
        setLenghtVermelhoPreTriados(responseVermelhoPreTriados.data);
      });
  };

  const trigger = useSelector(state => state.trigger);
  if (trigger === 1) {
    refreshPanel();
  }

  // função que cria o botão para inserir um paciente.
  function NewButton() {
    return (
      <Button
        style={{
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 50
        }}
        className="float-left"
        variant="secondary"
        onClick={() =>
          changeState({
            type: 'INSERT_ON',
            payloadUnidade: loginUnidade,
            payloadSetor: loginSetor,
            payloadUsuario: loginUsuario
          })
        }
      >
        NOVO PACIENTE
      </Button>
    );
  }

  // funções que renderizam os botões do painel e determinam suas ações.
  function GreenButton() {
    return (
      <Button
        className="float-right"
        onClick={() => clickGreenButton()}
        variant={greenColor}
        style={{
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 0,
          opacity: 1
        }}
      >
        VERDES: {lenghtVerdeTriados.length}
      </Button>
    );
  }

  const clickGreenButton = () => {
    // mudando as cores dos botões...
    setPretriadosColor('secondary');
    setTriadosColor('secondary');
    setGreenColor('success');
    setYellowColor('secondary');
    setRedColor('secondary');
    refreshPanel();
    changeState({
      type: 'LISTA_VERDE_TRIADOS',
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario,
      payloadSetor: loginSetor
    });
  };

  function YellowButton() {
    return (
      <Button
        className="float-right"
        onClick={() => clickYellowButton()}
        variant={yellowColor}
        style={{
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 0,
          opacity: 1
        }}
      >
        AMARELOS: {lenghtAmareloTriados.length}
      </Button>
    );
  }

  const clickYellowButton = () => {
    // mudando as cores dos botões...
    setPretriadosColor('secondary');
    setTriadosColor('secondary');
    setGreenColor('secondary');
    setYellowColor('warning');
    setRedColor('secondary');
    refreshPanel();
    changeState({
      type: 'LISTA_AMARELA_TRIADOS',
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario,
      payloadSetor: loginSetor
    });
  };

  function RedButton() {
    return (
      <Button
        className="float-right"
        onClick={() => clickRedButton()}
        variant={redColor}
        style={{
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 0
        }}
      >
        VERMELHOS: {lenghtVermelhoTriados.length}
      </Button>
    );
  }

  const clickRedButton = () => {
    // mudando as cores dos botões...
    setPretriadosColor('secondary');
    setTriadosColor('secondary');
    setGreenColor('secondary');
    setYellowColor('secondary');
    setRedColor('danger');
    refreshPanel();
    changeState({
      type: 'LISTA_VERMELHA_TRIADOS',
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario,
      payloadSetor: loginSetor
    });
  };

  function PreTriadosButton() {
    return (
      <Button
        className="float-right"
        onClick={() => clickPreTriadosButton()}
        variant={pretriadosColor}
        style={{
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 0
        }}
      >
        TOTAL PRÉ-TRIADOS:{' '}
        {lenghtPreTriados.length + lenghtVermelhoPreTriados.length}
      </Button>
    );
  }

  const clickPreTriadosButton = () => {
    // mudando as cores dos botões...
    setPretriadosColor('primary');
    setTriadosColor('secondary');
    setGreenColor('secondary');
    setYellowColor('secondary');
    setRedColor('secondary');
    refreshPanel();
    changeState({
      type: 'LISTA_PRE-TRIADOS',
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario,
      payloadSetor: loginSetor
    });
  };

  function TriadosButton() {
    return (
      <Button
        className="float-right"
        onClick={() => clickTriadosButton()}
        variant={triadosColor}
        style={{
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 0
        }}
      >
        TOTAL TRIADOS: {lenghtTriados.length}
      </Button>
    );
  }

  const clickTriadosButton = () => {
    // mudando as cores dos botões...
    setPretriadosColor('secondary');
    setTriadosColor('primary');
    setGreenColor('secondary');
    setYellowColor('secondary');
    setRedColor('secondary');
    refreshPanel();
    changeState({
      type: 'LISTA_TRIADOS',
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario,
      payloadSetor: loginSetor
    });
  };

  // funções que renderizam listas controladas pelos botões do painel.
  function SearchPreTriados() {
    return (
      <div>
        {dataPreTriadosSearch.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#AAB7B8',
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'left'
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

  // função que filtra registros de paciente pelo nome.
  var inputSearch = null;
  const searchData = () => {
    setPretriadosColor('secondary');
    setTriadosColor('secondary');
    setGreenColor('secondary');
    setYellowColor('secondary');
    setRedColor('secondary');
    changeState({
      type: 'SELECTED_ON',
      payloadUnidade: loginUnidade,
      payloadUsuario: loginUsuario,
      payloadSetor: loginSetor
    });
    inputSearch = document.getElementById('inputSearch').value;
    var quote1 = "'%25";
    var quote2 = "%25'";
    axios
      .get(html + '/searchpretriados/' + quote1 + inputSearch + quote2)
      .then(res => setDataPreTriadosSearch(res.data));
    axios
      .get(html + '/searchverdes/' + quote1 + inputSearch + quote2)
      .then(res => setDataVerdeSearch(res.data));
    axios
      .get(html + '/searchamarelos/' + quote1 + inputSearch + quote2)
      .then(res => setDataAmareloSearch(res.data));
    axios
      .get(html + '/searchvermelhos/' + quote1 + inputSearch + quote2)
      .then(res => setDataVermelhoSearch(res.data));
  };

  // listas obtidas do filtro de registros (opções disponíveis para a enfermeira).
  function SearchVerdes() {
    return (
      <div>
        {dataVerdeSearch.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#82E0AA',
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'left'
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

  function SearchAmarelos() {
    return (
      <div>
        {dataAmareloSearch.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F7DC6F',
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'left'
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

  function SearchVermelhos() {
    return (
      <div>
        {dataVermelhoSearch.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F1948A',
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'left'
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

  // listas obtidas do filtro de registros (opções disponíveis para a recepção).
  function SearchPreTriadosBlock() {
    return (
      <div>
        {dataPreTriadosSearch.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#AAB7B8',
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'left'
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

  function SearchVerdesBlock() {
    return (
      <div>
        {dataVerdeSearch.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#82E0AA',
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'left'
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

  function SearchAmarelosBlock() {
    return (
      <div>
        {dataAmareloSearch.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F7DC6F',
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'left'
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

  function SearchVermelhosBlock() {
    return (
      <div>
        {dataVermelhoSearch.map(item => (
          <p
            key={item.id}
            style={{
              backgroundColor: '#F1948A',
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: 'left'
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

  // funções que tratam da deleção de um registro.
  const deleteConfirm = item => {
    swal({
      title: 'EXCLUIR PACIENTE?',
      text: 'Confirmar exclusão do paciente ' + item.name + '?',
      icon: 'warning',
      dangerMode: true
    }).then(deleteItem => {
      // eslint-disable-next-line
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

  // eslint-disable-next-line
  if (viewSearch == 0 && viewPanel == 1) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#AED6F1',
          height: '10vh',
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5,
          borderRadius: 5
        }}
      >
        <div>
          <input
            style={{
              marginRight: 20,
              width: 300,
              height: 50,
              textAlign: 'center',
              textTransform: 'uppercase',
              borderRadius: 5,
              border: 'none',
              outline: 'none',
              backgroundColor: '#FFFFFF'
            }}
            onMouseOver={() => searchData()}
            onChange={() => searchData()}
            type="text"
            id="inputSearch"
            placeholder="BUSCAR"
            autoComplete="off"
          ></input>
        </div>
        <div>
          <NewButton></NewButton>
          <RedButton />
          <YellowButton />
          <GreenButton />
          <TriadosButton />
          <PreTriadosButton></PreTriadosButton>
        </div>
      </div>
    );
    // eslint-disable-next-line
  } else if (viewSearch == 1 && viewPanel == 1 && loginSetor == 1) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#AED6F1',
            height: '10vh',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 5
          }}
        >
          <div>
            <input
              style={{
                marginRight: 20,
                width: 300,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
              onMouseOver={() => searchData()}
              onChange={() => searchData()}
              type="text"
              id="inputSearch"
              placeholder="BUSCAR"
              autoComplete="off"
            ></input>
          </div>
          <div>
            <NewButton></NewButton>
            <RedButton />
            <YellowButton />
            <GreenButton />
            <TriadosButton />
            <PreTriadosButton></PreTriadosButton>
          </div>
        </div>
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 5,
            marginBottom: 5,
            maxHeight: '70vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <SearchPreTriados></SearchPreTriados>
          <SearchVerdes></SearchVerdes>
          <SearchAmarelos></SearchAmarelos>
          <SearchVermelhos></SearchVermelhos>
        </div>
      </div>
    );
    // eslint-disable-next-line
  } else if (viewSearch == 1 && viewPanel == 1 && loginSetor == 0) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#AED6F1',
            height: '10vh',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 5
          }}
        >
          <div>
            <input
              style={{
                marginRight: 20,
                width: 300,
                height: 50,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 5,
                border: 'none',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
              onMouseOver={() => searchData()}
              onChange={() => searchData()}
              type="text"
              id="inputSearch"
              placeholder="BUSCAR"
              autoComplete="off"
            ></input>
          </div>
          <div>
            <NewButton></NewButton>
            <RedButton />
            <YellowButton />
            <GreenButton />
            <TriadosButton />
            <PreTriadosButton></PreTriadosButton>
          </div>
        </div>
        <div
          style={{
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 5,
            marginBottom: 5,
            maxHeight: '70vh',
            overflowY: 'scroll',
            backgroundColor: '#E5E7E9'
          }}
        >
          <SearchPreTriadosBlock></SearchPreTriadosBlock>
          <SearchVerdesBlock></SearchVerdesBlock>
          <SearchAmarelosBlock></SearchAmarelosBlock>
          <SearchVermelhosBlock></SearchVermelhosBlock>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default Panel;
