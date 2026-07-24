import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { fetchAuth } from "../../utils/fetchAuth";
import { API_URL } from "../../utils/api";

function PropositosForm({ show, onHide, onGuardado, componente }) {
  const esEdicion = !!componente;
  const [proposito, setProposito] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!show) return;

    if (componente) {
      setProposito(componente.nombre || "");
    } else {
      limpiarForm();
    }
  }, [show, componente]);

  async function handleGuardar() {
    if (!proposito) {
      setError("El proposito es obligatorio");
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      const res = await fetchAuth(
        esEdicion
          ? `${API_URL}/api/catalogos/propositos/${componente.id}`
          : `${API_URL}/api/catalogos/propositos`,
        {
          method: esEdicion ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proposito,
          }),
        },
      );

      if (!res.ok) {
        const datos = await res.json();
        setError(datos.error);
        return;
      }

      limpiarForm();
      onGuardado(esEdicion ? componente.id : null);
      onHide();
    } catch (error) {
      setError("Error al guardar el proposito");
    } finally {
      setGuardando(false);
    }
  }

  function limpiarForm() {
    setProposito("");
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {esEdicion ? "Editar proposito" : "Registrar proposito"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group mb-3">
          <label className="form-label fw-bold">Nombre de proposito*</label>
          <input
            type="text"
            className="form-control"
            value={proposito}
            onChange={(e) => setProposito(e.target.value)}
            placeholder="Ej: General"
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => {
            limpiarForm();
            onHide();
          }}
          disabled={guardando}
        >
          Cancelar
        </button>
        <button
          className="btn btn-success"
          onClick={handleGuardar}
          disabled={guardando}
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default PropositosForm;
