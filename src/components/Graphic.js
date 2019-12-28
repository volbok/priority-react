import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Pie, Line } from 'react-chartjs-2';
import axios from 'axios';

function Graphic() {
  var html = 'https://priority-server.herokuapp.com';
  const viewGraph = useSelector(state => state.graph);
  const [showGraphics, setShowGraphics] = useState([]);

  useEffect(() => {
    if (viewGraph === 1) {
      GetData();
      setTimeout(() => {
        setShowGraphics(1);
      }, 10000);
    } else {
      setShowGraphics(0);
    }
  }, [viewGraph]);

  // GRÁFICO EM TORTA/PIZZA //
  const data1 = useSelector(state => state.data1);
  const data2 = useSelector(state => state.data2);
  const verde = useSelector(state => state.verde);
  const amarelo = useSelector(state => state.amarelo);
  const vermelho = useSelector(state => state.vermelho);

  // constante que define os elementos componentes do gráfico do tipo torta/pizza.
  const dataPieGraphic = {
    labels: ['VERMELHO', 'AMARELO', 'VERDE'],
    datasets: [
      {
        data: [vermelho, amarelo, verde],
        backgroundColor: ['red', 'yellow', 'green']
      }
    ]
  };

  // função que renderiza o gráfico do tipo torta/pizza.
  function PieGraphic() {
    console.log(data1);
    console.log(data2);
    console.log('VERDES: ' + verde);
    console.log('AMARELOS: ' + amarelo);
    console.log('VERMELHOS: ' + vermelho);
    if (showGraphics === 1) {
      return (
        <Pie
          data={dataPieGraphic}
          width={300}
          height={300}
          options={{
            title: {
              display: false,
              text: 'DESCRITO EM ELEMENTO ACIMA'
            },
            legend: {
              display: false
            },
            maintainAspectRatio: false
          }}
        ></Pie>
      );
    } else {
      return (
        <h3
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 16,
            color: 'red'
          }}
        >
          PROCESSANDO...
        </h3>
      );
    }
  }

  // GRÁFICO EM LINHA //
  const ano = useSelector(state => state.ano);

  // rotas.
  var sqlVerde = html + '/listpacientesverdesgrafico/';
  var sqlAmarelo = html + '/listpacientesamarelosgrafico/';
  var sqlVermelho = html + '/listpacientesvermelhosgrafico/';

  // funções que produzem os dados para a linha verde do gráfico.
  const [dataVerdeJan, setDataVerdeJan] = useState([]);
  const getVerdeJan = () => {
    var data1 = '"' + ano + '-01-01"';
    var data2 = '"' + ano + '-01-31"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeJan(res.data);
    });
    console.log('dataVerdeJan : ' + dataVerdeJan.length);
  };

  const [dataVerdeFev, setDataVerdeFev] = useState([]);
  const getVerdeFev = () => {
    var data1 = '"' + ano + '-02-01"';
    var data2 = '"' + ano + '-02-28"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeFev(res.data);
    });
    console.log('dataVerdeFev : ' + dataVerdeFev.length);
  };

  const [dataVerdeMar, setDataVerdeMar] = useState([]);
  const getVerdeMar = () => {
    var data1 = '"' + ano + '-03-01"';
    var data2 = '"' + ano + '-03-31"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeMar(res.data);
    });
    console.log('dataVerdeMar : ' + dataVerdeMar.length);
  };

  const [dataVerdeAbr, setDataVerdeAbr] = useState([]);
  const getVerdeAbr = () => {
    var data1 = '"' + ano + '-04-01"';
    var data2 = '"' + ano + '-04-30"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeAbr(res.data);
    });
    console.log('dataVerdeAbr : ' + dataVerdeAbr.length);
  };

  const [dataVerdeMai, setDataVerdeMai] = useState([]);
  const getVerdeMai = () => {
    var data1 = '"' + ano + '-05-01"';
    var data2 = '"' + ano + '-05-31"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeMai(res.data);
    });
    console.log('dataVerdeMai : ' + dataVerdeMai.length);
  };

  const [dataVerdeJun, setDataVerdeJun] = useState([]);
  const getVerdeJun = () => {
    var data1 = '"' + ano + '-06-01"';
    var data2 = '"' + ano + '-06-30"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeJun(res.data);
    });
    console.log('dataVerdeJun : ' + dataVerdeJun.length);
  };

  const [dataVerdeJul, setDataVerdeJul] = useState([]);
  const getVerdeJul = () => {
    var data1 = '"' + ano + '-07-01"';
    var data2 = '"' + ano + '-07-31"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeJul(res.data);
    });
    console.log('dataVerdeJul : ' + dataVerdeJul.length);
  };

  const [dataVerdeAgo, setDataVerdeAgo] = useState([]);
  const getVerdeAgo = () => {
    var data1 = '"' + ano + '-08-01"';
    var data2 = '"' + ano + '-08-31"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeAgo(res.data);
    });
    console.log('dataVerdeAgo : ' + dataVerdeAgo.length);
  };

  const [dataVerdeSet, setDataVerdeSet] = useState([]);
  const getVerdeSet = () => {
    var data1 = '"' + ano + '-09-01"';
    var data2 = '"' + ano + '-09-30"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeSet(res.data);
    });
    console.log('dataVerdeSet : ' + dataVerdeSet.length);
  };

  const [dataVerdeOut, setDataVerdeOut] = useState([]);
  const getVerdeOut = () => {
    var data1 = '"' + ano + '-10-01"';
    var data2 = '"' + ano + '-10-31"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeOut(res.data);
    });
    console.log('dataVerdeOut : ' + dataVerdeOut.length);
  };

  const [dataVerdeNov, setDataVerdeNov] = useState([]);
  const getVerdeNov = () => {
    var data1 = '"' + ano + '-11-01"';
    var data2 = '"' + ano + '-11-30"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeNov(res.data);
    });
    console.log('dataVerdeNov : ' + dataVerdeNov.length);
  };

  const [dataVerdeDez, setDataVerdeDez] = useState([]);
  const getVerdeDez = () => {
    var data1 = '"' + ano + '-12-01"';
    var data2 = '"' + ano + '-12-31"';
    axios.get(sqlVerde + data1 + '/' + data2).then(res => {
      setDataVerdeDez(res.data);
    });
    console.log('dataVerdeDez : ' + dataVerdeDez.length);
  };

  // funções que produzem os dados para a linha amarela do gráfico.
  const [dataAmareloJan, setDataAmareloJan] = useState([]);
  const getAmareloJan = () => {
    var data1 = '"' + ano + '-01-01"';
    var data2 = '"' + ano + '-01-31"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloJan(res.data);
    });
    console.log('dataAmareloJan : ' + dataAmareloJan.length);
  };

  const [dataAmareloFev, setDataAmareloFev] = useState([]);
  const getAmareloFev = () => {
    var data1 = '"' + ano + '-02-01"';
    var data2 = '"' + ano + '-02-28"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloFev(res.data);
    });
    console.log('dataAmareloFev : ' + dataAmareloFev.length);
  };

  const [dataAmareloMar, setDataAmareloMar] = useState([]);
  const getAmareloMar = () => {
    var data1 = '"' + ano + '-03-01"';
    var data2 = '"' + ano + '-03-31"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloMar(res.data);
    });
    console.log('dataAmareloMar : ' + dataAmareloMar.length);
  };

  const [dataAmareloAbr, setDataAmareloAbr] = useState([]);
  const getAmareloAbr = () => {
    var data1 = '"' + ano + '-04-01"';
    var data2 = '"' + ano + '-04-30"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloAbr(res.data);
    });
    console.log('dataAmareloAbr : ' + dataAmareloAbr.length);
  };

  const [dataAmareloMai, setDataAmareloMai] = useState([]);
  const getAmareloMai = () => {
    var data1 = '"' + ano + '-05-01"';
    var data2 = '"' + ano + '-05-31"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloMai(res.data);
    });
    console.log('dataAmareloMai : ' + dataAmareloMai.length);
  };

  const [dataAmareloJun, setDataAmareloJun] = useState([]);
  const getAmareloJun = () => {
    var data1 = '"' + ano + '-06-01"';
    var data2 = '"' + ano + '-06-30"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloJun(res.data);
    });
    console.log('dataAmareloJun : ' + dataAmareloJun.length);
  };

  const [dataAmareloJul, setDataAmareloJul] = useState([]);
  const getAmareloJul = () => {
    var data1 = '"' + ano + '-07-01"';
    var data2 = '"' + ano + '-07-31"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloJul(res.data);
    });
    console.log('dataAmareloJul : ' + dataAmareloJul.length);
  };

  const [dataAmareloAgo, setDataAmareloAgo] = useState([]);
  const getAmareloAgo = () => {
    var data1 = '"' + ano + '-08-01"';
    var data2 = '"' + ano + '-08-31"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloAgo(res.data);
    });
    console.log('dataAmareloAgo : ' + dataAmareloAgo.length);
  };

  const [dataAmareloSet, setDataAmareloSet] = useState([]);
  const getAmareloSet = () => {
    var data1 = '"' + ano + '-09-01"';
    var data2 = '"' + ano + '-09-30"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloSet(res.data);
    });
    console.log('dataAmareloSet : ' + dataAmareloSet.length);
  };

  const [dataAmareloOut, setDataAmareloOut] = useState([]);
  const getAmareloOut = () => {
    var data1 = '"' + ano + '-10-01"';
    var data2 = '"' + ano + '-10-31"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloOut(res.data);
    });
    console.log('dataAmareloOut : ' + dataAmareloOut.length);
  };

  const [dataAmareloNov, setDataAmareloNov] = useState([]);
  const getAmareloNov = () => {
    var data1 = '"' + ano + '-11-01"';
    var data2 = '"' + ano + '-11-30"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloNov(res.data);
    });
    console.log('dataAmareloNov : ' + dataAmareloNov.length);
  };

  const [dataAmareloDez, setDataAmareloDez] = useState([]);
  const getAmareloDez = () => {
    var data1 = '"' + ano + '-12-01"';
    var data2 = '"' + ano + '-12-31"';
    axios.get(sqlAmarelo + data1 + '/' + data2).then(res => {
      setDataAmareloDez(res.data);
    });
    console.log('dataAmareloDez : ' + dataAmareloDez.length);
  };

  // funções que produzem os dados para a linha vermelha do gráfico.
  const [dataVermelhoJan, setDataVermelhoJan] = useState([]);
  const getVermelhoJan = () => {
    var data1 = '"' + ano + '-01-01"';
    var data2 = '"' + ano + '-01-31"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoJan(res.data);
    });
    console.log('dataVermelhoJan : ' + dataVermelhoJan.length);
  };

  const [dataVermelhoFev, setDataVermelhoFev] = useState([]);
  const getVermelhoFev = () => {
    var data1 = '"' + ano + '-02-01"';
    var data2 = '"' + ano + '-02-28"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoFev(res.data);
    });
    console.log('dataVermelhoFev : ' + dataVermelhoFev.length);
  };

  const [dataVermelhoMar, setDataVermelhoMar] = useState([]);
  const getVermelhoMar = () => {
    var data1 = '"' + ano + '-03-01"';
    var data2 = '"' + ano + '-03-31"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoMar(res.data);
    });
    console.log('dataVermelhoMar : ' + dataVermelhoMar.length);
  };

  const [dataVermelhoAbr, setDataVermelhoAbr] = useState([]);
  const getVermelhoAbr = () => {
    var data1 = '"' + ano + '-04-01"';
    var data2 = '"' + ano + '-04-30"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoAbr(res.data);
    });
    console.log('dataVermelhoAbr : ' + dataVermelhoAbr.length);
  };

  const [dataVermelhoMai, setDataVermelhoMai] = useState([]);
  const getVermelhoMai = () => {
    var data1 = '"' + ano + '-05-01"';
    var data2 = '"' + ano + '-05-31"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoMai(res.data);
    });
    console.log('dataVermelhoMai : ' + dataVermelhoMai.length);
  };

  const [dataVermelhoJun, setDataVermelhoJun] = useState([]);
  const getVermelhoJun = () => {
    var data1 = '"' + ano + '-06-01"';
    var data2 = '"' + ano + '-06-30"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoJun(res.data);
    });
    console.log('dataVermelhoJun : ' + dataVermelhoJun.length);
  };

  const [dataVermelhoJul, setDataVermelhoJul] = useState([]);
  const getVermelhoJul = () => {
    var data1 = '"' + ano + '-07-01"';
    var data2 = '"' + ano + '-07-31"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoJul(res.data);
    });
    console.log('dataVermelhoJul : ' + dataVermelhoJul.length);
  };

  const [dataVermelhoAgo, setDataVermelhoAgo] = useState([]);
  const getVermelhoAgo = () => {
    var data1 = '"' + ano + '-08-01"';
    var data2 = '"' + ano + '-08-31"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoAgo(res.data);
    });
    console.log('dataVermelhoAgo : ' + dataVermelhoAgo.length);
  };

  const [dataVermelhoSet, setDataVermelhoSet] = useState([]);
  const getVermelhoSet = () => {
    var data1 = '"' + ano + '-09-01"';
    var data2 = '"' + ano + '-09-30"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoSet(res.data);
    });
    console.log('dataVermelhoSet : ' + dataVermelhoSet.length);
  };

  const [dataVermelhoOut, setDataVermelhoOut] = useState([]);
  const getVermelhoOut = () => {
    var data1 = '"' + ano + '-10-01"';
    var data2 = '"' + ano + '-10-31"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoOut(res.data);
    });
    console.log('dataVermelhoOut : ' + dataVermelhoOut.length);
  };

  const [dataVermelhoNov, setDataVermelhoNov] = useState([]);
  const getVermelhoNov = () => {
    var data1 = '"' + ano + '-11-01"';
    var data2 = '"' + ano + '-11-30"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoNov(res.data);
    });
    console.log('dataVermelhoNov : ' + dataVermelhoNov.length);
  };

  const [dataVermelhoDez, setDataVermelhoDez] = useState([]);
  const getVermelhoDez = () => {
    var data1 = '"' + ano + '-12-01"';
    var data2 = '"' + ano + '-12-31"';
    axios.get(sqlVermelho + data1 + '/' + data2).then(res => {
      setDataVermelhoDez(res.data);
    });
    console.log('dataVermelhoDez : ' + dataVermelhoDez.length);
  };

  // função que agrupa as arrow functions acima (disparada pelo useEffect).
  function GetData() {
    console.log('PREPARANDO GRÁFICO LINEAR...');
    getVerdeJan();
    getVerdeFev();
    getVerdeMar();
    getVerdeAbr();
    getVerdeMai();
    getVerdeJun();
    getVerdeJul();
    getVerdeAgo();
    getVerdeSet();
    getVerdeOut();
    getVerdeNov();
    getVerdeDez();
    getAmareloJan();
    getAmareloFev();
    getAmareloMar();
    getAmareloAbr();
    getAmareloMai();
    getAmareloJun();
    getAmareloJul();
    getAmareloAgo();
    getAmareloSet();
    getAmareloOut();
    getAmareloNov();
    getAmareloDez();
    getVermelhoJan();
    getVermelhoFev();
    getVermelhoMar();
    getVermelhoAbr();
    getVermelhoMai();
    getVermelhoJun();
    getVermelhoJul();
    getVermelhoAgo();
    getVermelhoSet();
    getVermelhoOut();
    getVermelhoNov();
    getVermelhoDez();
  }

  // constante que define os elementos componentes do gráfico do tipo linha.
  const dataLineGraphic = {
    labels: [
      'JAN',
      'FEV',
      'MAR',
      'ABR',
      'MAI',
      'JUN',
      'JUL',
      'AGO',
      'SET',
      'OUT',
      'NOV',
      'DEZ'
    ],

    datasets: [
      {
        visible: true,
        label: 'VERDE',
        yAxisID: 'VERDE',
        borderColor: 'rgba(39, 174, 96, 1.0)',
        backgroundColor: 'rgba(39, 174, 96, 0.5)',
        opacity: 0.5,
        data: [
          dataVerdeJan.length,
          dataVerdeFev.length,
          dataVerdeMar.length,
          dataVerdeAbr.length,
          dataVerdeMai.length,
          dataVerdeJun.length,
          dataVerdeJul.length,
          dataVerdeAgo.length,
          dataVerdeSet.length,
          dataVerdeOut.length,
          dataVerdeNov.length,
          dataVerdeDez.length
        ]
      },
      {
        label: 'AMARELO',
        yAxisID: 'AMARELO',
        borderColor: 'rgba(241, 196, 15, 1.0)',
        backgroundColor: 'rgba(241, 196, 15, 0.5)',
        data: [
          dataAmareloJan.length,
          dataAmareloFev.length,
          dataAmareloMar.length,
          dataAmareloAbr.length,
          dataAmareloMai.length,
          dataAmareloJun.length,
          dataAmareloJul.length,
          dataAmareloAgo.length,
          dataAmareloSet.length,
          dataAmareloOut.length,
          dataAmareloNov.length,
          dataAmareloDez.length
        ]
      },
      {
        label: 'VERMELHO',
        yAxisID: 'VERMELHO',
        borderColor: 'rgba(231, 76, 60, 1.0)',
        backgroundColor: 'rgba(231, 76, 60, 0.5)',
        data: [
          dataVermelhoJan.length,
          dataVermelhoFev.length,
          dataVermelhoMar.length,
          dataVermelhoAbr.length,
          dataVermelhoMai.length,
          dataVermelhoJun.length,
          dataVermelhoJul.length,
          dataVermelhoAgo.length,
          dataVermelhoSet.length,
          dataVermelhoOut.length,
          dataVermelhoNov.length,
          dataVermelhoDez.length
        ]
      }
    ]
  };

  // função que renderiza o gráfico do tipo linha.
  function LineGraphic() {
    if (showGraphics === 1) {
      return (
        <Line
          type="line"
          data={dataLineGraphic}
          width={1000}
          height={300}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  id: 'VERDE',
                  type: 'linear',
                  position: 'left',
                  ticks: {
                    beginAtZero: true
                  }
                },
                {
                  id: 'AMARELO',
                  type: 'linear',
                  position: 'left',
                  ticks: {
                    beginAtZero: true,
                    display: false
                  },
                  gridLines: {
                    drawBorder: false,
                    display: false
                  }
                },
                {
                  id: 'VERMELHO',
                  type: 'linear',
                  position: 'left',
                  ticks: {
                    beginAtZero: true,
                    display: false
                  },
                  gridLines: {
                    drawBorder: false,
                    display: false
                  }
                }
              ]
            }
          }}
        ></Line>
      );
    } else {
      return (
        <h3
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 16,
            color: 'red'
          }}
        >
          PROCESSANDO...
        </h3>
      );
    }
  }

  // eslint-disable-next-line
  if (viewGraph == 1 && (verde > 0 || amarelo > 0 || vermelho > 0)) {
    // eslint-disable-next-line
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h3 style={{ fontSize: 16, marginTop: 5, marginBottom: 20 }}>
          DISTRIBUIÇÃO DE PACIENTES SEGUNDO A CLASSIFICAÇÃO DE RISCO NO PERÍODO
          DE {data1} A {data2}.
        </h3>
        <div>
          <PieGraphic></PieGraphic>
        </div>
        <h3 style={{ fontSize: 16, marginTop: 20, marginBottom: 20 }}>
          DISTRIBUIÇÃO DE PACIENTES SEGUNDO A CLASSIFICAÇÃO DE RISCO NO PERÍODO
          DE UM ANO.
        </h3>
        <div>
          <LineGraphic></LineGraphic>
        </div>
      </div>
    );
    // eslint-disable-next-line
  } else if (viewGraph == 1 && verde == 0 && amarelo == 0 && vermelho == 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h3 style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>
          DISTRIBUIÇÃO DE PACIENTES SEGUNDO A CLASSIFICAÇÃO DE RISCO EM UM DADO
          PERÍODO.
        </h3>
        <h3
          style={{
            marginTop: 5,
            marginBottom: 20,
            fontSize: 16,
            color: 'red'
          }}
        >
          SEM REGISTROS NO PERÍODO SELECIONADO PARA A GERAÇÃO DE GRÁFICO TORTA.
        </h3>
        <h3 style={{ fontSize: 16, marginTop: 5, marginBottom: 20 }}>
          DISTRIBUIÇÃO DE PACIENTES SEGUNDO A CLASSIFICAÇÃO DE RISCO NO PERÍODO
          DE UM ANO.
        </h3>
        <div>
          <LineGraphic></LineGraphic>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default Graphic;
