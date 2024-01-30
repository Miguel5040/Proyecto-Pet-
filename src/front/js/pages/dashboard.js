import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import PetList from "../component/petlist";
import logo from "../../img/logopetplus.png";
import "../../styles/dashboard.css";
import TestButton from "../component/testbutton";

const BACKEND_URL = process.env.BACKEND_URL;

const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [newPetData, setNewPetData] = useState({
    name: "",
    born_date: "",
    breed: "",
    gender: "",
    animal: "",
    photo: null,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    born_date: "",
    breed: "",
    gender: "",
    animal: "",
    photo: "",
  })

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    setErrorMessages({
      name: "",
      born_date: "",
      breed: "",
      gender: "",
      animal: "",
      photo: "",
    });
  };

  const handleInputChange = (e) => {
    setNewPetData({
      ...newPetData,
      [e.target.name]: e.target.value,
    });
    setErrorMessages({
      ...errorMessages,
      [e.target.name]: "",
    });
  };

  const handleFileChange = (e) => {
    setNewPetData({
      ...newPetData,
      photo: e.target.files[0],
    });
    setErrorMessages({
      ...errorMessages,
      photo: "",
    });
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(BACKEND_URL + `api/user/${user_id}/pets`)
        if (response.ok) {
          const responseData = await response.json();
          actions.setPets(responseData.pets);
        } else {
          console.error('Error al obtener las mascotas', response.status);
        }
      } catch (error) {
        console.error('Error al obtener las mascotas', error);
      }
    };

    fetchPets();
  }, [store.pets]);

  const handleAddPet = async () => {
    const validationErrors = {};

    if (!newPetData.name.trim()) {
      validationErrors.name = "El nombre de la mascota es requerido";
    }
    if (!newPetData.born_date.trim()) {
      validationErrors.born_date = "La fecha de nacimiento de la mascota es requerida";
    }

    if (!newPetData.gender.trim()) {
      validationErrors.gender = "El género de la mascota es requerido";
    }

    if (!newPetData.animal.trim()) {
      validationErrors.animal = "La especie de la mascota es requerida";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newPetData.name);
      formData.append("born_date", newPetData.born_date);
      formData.append("breed", newPetData.breed);
      formData.apeend("gender", newPetData.gender);
      formData.append("animal", newPetData.animal);
      formData.append("photo", newPetData.photo);

      const response = await fetch((BACKEND_URL + `api/user/${user_id}/pets`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPetData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        if (actions.addPet) {
          actions.addPet(responseData.pet);
        }
      } else {
        console.error('Error al agregar la mascota', response.status);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error al agregar la mascota', error);
    }
  };

  return (
    <div className="container dashboard-container text-center">
      <h1 className="bienvenida mt-5 mb-4">¡Bienvenido <span className='header-bienvenida'>Miguel </span>!</h1>
      <PetList pets={store.pets} handleOpenModal={handleOpenModal} />

      <TestButton />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agrega los datos de tu mascota 🐾 🐱 🐰</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="nombre">Nombre <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="name"
              onChange={handleInputChange}
              value={newPetData.name}
            />
            {errorMessages.name && <small className="text-danger">{errorMessages.name}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="fecha_de_nacimiento">Fecha de nacimiento <span className="text-danger">*</span></label>
            <input
              type="date"
              className="form-control"
              id="fecha_de_nacimiento"
              name="born_date"
              onChange={handleInputChange}
              value={newPetData.born_date}
            />
            {errorMessages.born_date && <small className="text-danger">{errorMessages.born_date}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="raza">Raza</label>
            <input
              type="text"
              className="form-control"
              id="raza"
              name="breed"
              onChange={handleInputChange}
              value={newPetData.breed}
            />
            {errorMessages.breed && <small className="text-danger">{errorMessages.breed}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Genero<span className="text-danger">*</span></label>
            <select
              className="form-select"
              name="gender"
              value={newPetData.gender}
              onChange={handleInputChange}
              style={{ color: newPetData.animal ? 'black' : '#999' }}

            ><option value="" disabled selected style={{ color: '#999' }}>Selecciona género</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
              <option value="Desconocido">Desconocido</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Especie<span className="text-danger">*</span></label>
            <select
              className="form-select"
              name="animal"
              value={newPetData.animal}
              onChange={handleInputChange}
              style={{ color: newPetData.animal ? 'black' : '#999' }}
            >
              <option value="" disabled selected style={{ color: '#999' }}>Selecciona especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
              <option value="Otros">Otros</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="foto">Foto</label>
            <input
              type="file"
              className="form-control"
              id="foto"
              name="photo"
              accept="image/*"
              lang="es"
              onChange={handleFileChange}
            />
            {errorMessages.photo && <small className="text-danger">{errorMessages.photo}</small>}
          </div>
        </Modal.Body>
        <div className="text-center">
          <small className="text-muted"><span className="text-danger">*</span>Campos obligatorios</small>
        </div>
        <Modal.Footer>
          <Button className="btn btn-light text-black rounded-3" variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button className="button btn text-white rounded-3" variant="primary" onClick={handleAddPet}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default Dashboard;