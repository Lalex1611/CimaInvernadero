import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const estadoClases = {
  OPERATIVO: "estado-operativo",
  INACTIVO: "estado-inactivo",
  "EN MANTENIMIENTO": "estado-mantenimiento",
  FALLANDO: "estado-fallando",
};

function Dispositivos() {
  const [display, setDisplay] = useState();
  const [dispositivos, setDispositivos] = useState([]);

  useEffect(() => {
    fetch("/api/dispositivos")
      .then((res) => res.json())
      .then((datos) => {
        setDispositivos(datos);
        setDisplay(datos[0]);
      });
  }, []);

  return (
    <section>
      <Container className="dispositivos-page">
        <Container className="dispositivos-title dispositivos-section">
          <Row className="align-items-center">
            <Col>
              <h1>Dispositivos del invernadero</h1>
              <p>
                En esta sección se muestran los dispositivos registrados para el
                monitoreo y control del invernadero
              </p>
            </Col>
            <Col xs="auto" className="text-end">
              <button>+ Registrar dispositivo</button>
            </Col>
          </Row>
        </Container>
        <Container className="actual-display dispositivos-section card-component">
          {display ? (
            <div>
              <span className={`estado-badge ${estadoClases[display?.estado]}`}>
                {display?.estado}
              </span>
              <h2>{display?.nombre}</h2>
            </div>
          ) : (
            <p>Cargando dispositivo...</p>
          )}
        </Container>
      </Container>
    </section>
  );
}

export default Dispositivos;
