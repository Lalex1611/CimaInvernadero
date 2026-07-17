import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function Configuracion() {
  const [zonas, setZonas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [dato, setDato] = useState([]);

  useEffect(() => {
    fetch("/api/catalogos/zonas")
      .then((res) => res.json())
      .then((datos) => setZonas(datos));

    fetch("/api/catalogos/tipos-dispositivo")
      .then((res) => res.json())
      .then((datos) => setTipos(datos));

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
            </ul>
          </Col>
          <Col className="catalogos-display">
            <Container className="single-display card-component" id="zonas">
              <div className="single-display-title">
                <h2>Zonas</h2>
                <button className="single-display-add">+</button>
              </div>
              <div className="catalogos-table-section catalogos-zonas-section">
                {zonas.map((z) => (
                  <div className="single-display-config">
                    <span className="single-display-info">{z.zona}</span>
                    <div className="single-display-buttons">
                      <button className="single-display-edit">
                        <AiFillEdit />
                      </button>
                      <button className="single-display-delete">
                        <AiFillDelete />
                      </button>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </Container>
            <Container
              className="single-display card-component"
              id="dispositivos"
            >
              <div className="single-display-title">
                <h2>Tipos de dispositivo</h2>
                <button className="single-display-add">+</button>
              </div>
              <div className="catalogos-table-section catalogos-dispositivos-section">
                {tipos.map((t) => (
                  <div className="single-display-config">
                    <span className="single-display-info">{t.nombre}</span>
                    <div className="single-display-buttons">
                      <button className="single-display-edit">
                        <AiFillEdit />
                      </button>
                      <button className="single-display-delete">
                        <AiFillDelete />
                      </button>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </Container>
            <Container className="single-display card-component" id="datos">
              <div className="single-display-title">
                <h2>Tipos de dato</h2>
                <button className="single-display-add">+</button>
              </div>
              <div className="catalogos-table-section catalogos-datos-section">
                {dato.map((d) => (
                  <div className="single-display-config">
                    <span className="single-display-info">
                      {d.nombre} ({d.unidad})
                    </span>
                    <div className="single-display-buttons">
                      <button className="single-display-edit">
                        <AiFillEdit />
                      </button>
                      <button className="single-display-delete">
                        <AiFillDelete />
                      </button>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

//TODO: Crear funciones de botonones

export default Configuracion;
