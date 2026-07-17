import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Configuracion() {
  const [zonas, setZonas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [dato, setDato] = useState([]);
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    fetch("/api/catalogos/zonas")
      .then((res) => res.json())
      .then((datos) => setZonas(datos));

    fetch("/api/catalogos/tipos-dispositivo")
      .then((res) => res.json())
      .then((datos) => setTipos(datos));

    fetch("/api/catalogos/especificaciones")
      .then((res) => res.json())
      .then((datos) => setSpecs(datos));

    fetch("/api/catalogos/tipos-dato")
      .then((res) => res.json())
      .then((datos) => setDato(datos));
  }, []);

  return (
    <section>
      <Container className="catalogos-section">
        <Row>
          <Col lg={2} className="catalogos-navbar card-component">
            <ul>
              <li>
                <a href="#zonas">Zonas</a>
              </li>
              <li>
                <a href="#dispositivos">Tipos de dispositivo</a>
              </li>
              <li>
                <a href="#datos">Tipos de dato</a>
              </li>
              <li>
                <a href="#especificaciones">Especificaciones</a>
              </li>
            </ul>
          </Col>
          <Col className="catalogos-display">
            <Container className="card-component" id="zonas">
              <h2>Zonas</h2>
              {zonas.map((z) => (
                <p>{z.zona}</p>
              ))}
            </Container>
            <Container className="card-component" id="dispositivos">
              <h2>Tipos de dispositivo</h2>
              {tipos.map((t) => (
                <p>{t.nombre}</p>
              ))}
            </Container>
            <Container className="card-component" id="datos">
              <h2>Tipos de dato</h2>
              {dato.map((d) => (
                <p>{d.nombre}</p>
              ))}
            </Container>
            <Container className="card-component" id="especificaciones">
              <h2>Especificaciones</h2>
              {specs.map((s) => (
                <p>{s.largo}</p>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Configuracion;
