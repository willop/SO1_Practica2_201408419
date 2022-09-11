import {ProgressBar, Table} from 'react-bootstrap';
import './app.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

function App() {

  const getRam = async(event)=>{
    console.log("get ram")
    var result;
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
        result = JSON.parse(json)
        
        //validacion si es true  o false
        //realizar la redireccion de pagina
    } catch (error) {
      console.log("Error "+error)
    }
    console.log(result)
  }


  useEffect(function (){
      window.setInterval(getRam,5000)
  })

  const porcent = 50;
  return (
    <div id="app"><center>
      <h1>Practica 2</h1>
      <br/>
      <div id="contenido">
        <h3>RAM</h3>
        <ProgressBar variant="success" now={porcent} />
        <br/><br/>
        <h3>CPU</h3>
        <ProgressBar variant="info" now={porcent} />
      </div>
      <br/>
      <br/>
      <br/>
      <div id="cuadrotexto">
      <Table striped bordered hover size="sm" onClick={''}>
            <thead id="cabeza_datos">
              <tr>
                <th>Nombre</th>
                <th>ID proceso</th>
              </tr>
            </thead>
          </Table>
      </div>
      </center>
    </div>
  );
}

export default App;
