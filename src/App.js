import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

// importando os componentes (onvertidos em funções para uso do react-hooks).
import Header from './components/Header';
import Login from './components/Login';
import List from './components/List';
import Insert from './components/Insert';
import InsertOptions from './components/InsertOptions';
import Fix from './components/Fix';
import UpdateOptions from './components/UpdateOptions';
import Panel from './components/Panel';
import Chart from './components/Chart';
import Graphic from './components/Graphic';
import Call from './components/Call';
import Pdf from './components/Pdf';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Login></Login>
      <Panel></Panel>
      <Chart></Chart>
      <Graphic></Graphic>
      <List></List>
      <Insert></Insert>
      <InsertOptions></InsertOptions>
      <Fix></Fix>
      <UpdateOptions></UpdateOptions>
      <Call></Call>
      <Pdf></Pdf>
    </div>
  );
}

export default App;
