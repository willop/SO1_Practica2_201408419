import { ProgressBar, Table } from 'react-bootstrap';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Procc } from './components/Procc';
import { Child } from './components/Child';

function App() {
  const [inforam, setinforam] = useState(
    {
      RAM: 16000,
      FREE: 10000,
      USADA: 80
    }
  );
  const [infocpu, setinfocpu] = useState([]);
  const [infocpu2, setinfocpu2] = useState([]);

  const getRam = async (event) => {
    var result;
    console.log("get ram")
    try {
      let configuracion = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      let respuesta = await fetch('http://localhost:4000/sistema/ram', configuracion)
      let json = await respuesta.json();
      //.log('valor de la respuesta json')
      //.log(json)
      //console.log(json)
      setinforam(json)
      //validacion si es true  o false
      //realizar la redireccion de pagina
    } catch (error) {
      console.log("Error " + error)
    }
  }


  const getCPU = async (event) => {
    var result;
    console.log("get cpu")
    try {
      let configuracion = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      let respuesta = await fetch('http://localhost:4000/sistema/cpu', configuracion)
      let json = await respuesta.json();
      //.log('valor de la respuesta json')
      //.log(json)
      //console.log(json.Procesos)
      setinfocpu(json.Procesos)
      setinfocpu2(json.Procesos)
      //validacion si es true  o false
      //realizar la redireccion de pagina
    } catch (error) {
      console.log("Error cpu" + error)
    }
  }



  useEffect(function () {
    //console.log("Hola al iniciar la app")
    //setTimeout(getRam,5000)
    setTimeout(getCPU, 10000)
  })

  const porcent = inforam.USADA;
  return (
    <div id="app"><center>
      <h1>Practica 2</h1>
      <br />
      <div id="contenido">
        <h3>RAM</h3>
        <ProgressBar variant="success" now={inforam.USADA} />
        <h1>{porcent}%</h1>
        <br /><br />
        <h3>CPU</h3>
        <ProgressBar variant="info" now={porcent} />
        <h1>{porcent - 8}%</h1>
      </div>
      <br />
      <br />
      <br />
      <div id="cuadrotexto">
        <h1>Procesos principales</h1>
        <br/>
        <Table striped bordered hover size="sm" variant="dark">
          <thead id="cabeza_datos">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {
              infocpu.map((procesoss,keyy) => {
                //console.log(procesoss)
                return (
                  <Procc idp={procesoss.idp} nproceso={procesoss.nproceso} hijos={procesoss.hijos} key={keyy} />
                )
              })
            }
          </tbody>
        </Table>
        <h1>Procesos hijos</h1>
        {
          infocpu.map((procesoss) => {
            if (procesoss.hijos != "") {
              return (
                <div>
                  <br />
                  <h1>{procesoss.idp} -- {procesoss.nproceso}</h1>
                  <Table striped bordered hover size="sm" >
                    <thead id="cabeza_datos2">
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        procesoss.hijos.map((hijohijos,indexx) => {
                          return (
                            <tr>
                              <td>{hijohijos.hid}</td>
                              <td>{hijohijos.hnombre}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </div>
              )
            } else {

            }
            
          })
        }
      </div>
    </center>
    </div>
  );
}

export default App;
