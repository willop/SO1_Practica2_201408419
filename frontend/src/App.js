import {ProgressBar, Table} from 'react-bootstrap';
import './app.css'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const porcent = 50;
  return (
    <div id="app"><center>
      <h1>Practica 2</h1>
      <br/>
      <div id="contenido">
        <h3>RAM</h3>
        <ProgressBar variant="success" now={porcent} />
        <br/>
        <br/>
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
