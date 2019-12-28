import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

function Pdf() {
  const changeState = useDispatch();
  const viewPdf = useSelector(state => state.pdf);

  const nome = useSelector(state => state.itemName);
  const doc = useSelector(state => state.itemDoc);
  const cor = useSelector(state => state.itemColor);
  const loginUnidade = useSelector(state => state.loginUnidade);
  const loginUsuario = useSelector(state => state.loginUsuario);
  const loginSetor = useSelector(state => state.loginSetor);

  const [colorRisk, setColorRisk] = useState([]);

  // função que renderiza a cor do paciente triado no PDF.
  const selectColor = () => {
    if (cor === 'VERDE') {
      setColorRisk('VERDE');
    } else if (cor === 'AMARELO') {
      setColorRisk('AMARELO');
    } else if (cor === 'VERMELHO') {
      setColorRisk('VERMELHO');
    }
  };

  // função que retorna para o componente 'List'.
  const showList = () => {
    changeState({
      type: 'TRIGGER_ON',
      payloadUnidade: loginUnidade,
      payloadSetor: loginSetor,
      payloadUsuario: loginUsuario
    });
  };

  // função que compõe o elemento identificador da cor triada no PDF.
  function ColorText() {
    // eslint-disable-next-line
    if (colorRisk == 'VERDE') {
      return (
        <View
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            textAlign: 'center',
            backgroundColor: 'green',
            borderRadius: 5
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            CLASSIFICAÇÃO DE RISCO:
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            {cor}
          </Text>
        </View>
      );
      // eslint-disable-next-line
    } else if (colorRisk == 'AMARELO') {
      return (
        <View
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            textAlign: 'center',
            backgroundColor: 'yellow',
            borderRadius: 5
          }}
        >
          <Text
            style={{
              color: '#000000',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            CLASSIFICAÇÃO DE RISCO:
          </Text>
          <Text
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            {cor}
          </Text>
        </View>
      );
      // eslint-disable-next-line
    } else if (colorRisk == 'VERMELHO') {
      return (
        <View
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            textAlign: 'center',
            backgroundColor: 'red',
            borderRadius: 5
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            CLASSIFICAÇÃO DE RISCO:
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            {cor}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  // função que cria o documento PDF.
  const MyDocument = () => (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          width: '100%',
          height: '100%',
          orientation: 'portrait'
        }}
      >
        <View
          style={{
            marginTop: 50,
            marginLeft: 50,
            marginRight: 50,
            textAlign: 'center',
            backgroundColor: '#E5E7E9',
            borderRadius: 5
          }}
        >
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            NOME DO PACIENTE:
          </Text>
          <Text
            style={{
              color: 'red',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            {nome}
          </Text>
          <Text
            style={{
              fontSize: 10,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            DOCUMENTO:
          </Text>
          <Text
            style={{
              color: 'red',
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5
            }}
          >
            {doc}
          </Text>
          <ColorText></ColorText>
        </View>
      </Page>
    </Document>
  );

  // função que renderiza o PDF..
  function PrintPdf() {
    selectColor();
    return (
      <div
        style={{
          height: '100vh',
          width: '100%'
        }}
      >
        <PDFViewer
          style={{
            position: 'absolute',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%'
          }}
        >
          <MyDocument></MyDocument>
        </PDFViewer>
        <Button
          onClick={() => showList()}
          variant="success"
          style={{
            position: 'absolute',
            top: 50,
            left: 50,
            marginLeft: 5,
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
          }}
        >
          VOLTAR
        </Button>
      </div>
    );
  }

  // eslint-disable-next-line
  if (viewPdf == 1) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PrintPdf></PrintPdf>
      </div>
    );
  } else {
    return <div></div>;
  }
}
export default Pdf;
