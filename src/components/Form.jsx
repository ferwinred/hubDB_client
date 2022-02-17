//importamos los hooks que vamos a necesitar
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createRow } from '../redux/actions';


//importamos sweetalert para las alertas personalizadas
import Sweet from "sweetalert2";

//importamos la función que hará las validaciones del formulario para controlarlo
import validator from "./form.controllers";

//importamos los estilos adicionales del formulario
import "../css/form.scss";

//componente del formulario controlado
const Form = () => {
  //creamos dos variables en el estado, data y error; data tendrá la información que el usuario ingrese en el formulario actualizada y en error se guardará el error especifico que hay en el formulario.
  const [data, setData] = useState({
    name: "",
    lastname: "",
    document: ""
  });
  const [error, setError] = useState({});
  
  const dispatch = useDispatch()

  //esta función manejará el evento onChange de los imput y modificará las variables data y error del estado
  const handleChange = (e) => {
    //esta dunción modifica en el estado la variable data
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    //esta dunción modifica en el estado la variable data
    setError(
      validator({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };

  //esta función maneja el evento onSubmit para controlar lo que el usuario esta enviando, se verifica que todos los campos esten llenos y sin errores; si identifica algun error no permite el envío; si hay algún campo vacío lanza una alerta para que el usuario llene los datos
  const handleSubmit = (e) => {
    e.preventDefault();

    //si pasa el if quiere decir que hay campos vacíos por lo tanto lanza la alerta personalizada
    if (!(data.name || data.lastname || data.document)) {
      setError(validator(data));
      Sweet.fire({
        title: "HubSpot App",
        text: "missing data in the form",
        icon: "error",
        timer: 4000,
        confirmButtonText: "Agree",
      });
      return
    }
    
    dispatch(createRow(data));

    Sweet.fire({
      title: "HubSpot App",
      text: "the data was successfully added to the database",
      icon: "success",
      timer: 4000,
      confirmButtonText: "Agree",
    });
    setData({
      name: "",
      lastname: "",
      document: ""
    });
  };

  return (
    <div className="wrapper">
      <h2 className="text-dark fw-bold w-100 bg-light text-center opacity-100">
        FORM TO ADD DATA
      </h2>
      <p>
        Hello, if you want to add information to the Database fill the following form:
      </p>
      <form className="form-control bg-brown" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            name="name"
            className="form-label w-100 text-white text-center"
          >
            NOMBRE
          </label>
          <input
            type="text"
            className={error.name ? "form-control danger" : "form-control"}
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {error.name ? <span className="error">{error.name}</span> : ""}
        </div>
        <div className="mb-3">
          <label
            name="lastname"
            className="form-label w-100 text-white text-center"
          >
            LASTNAME
          </label>
          <input
            type="text"
            className={error.lastname ? "form-control danger" : "form-control"}
            name="lastname"
            value={data.lastname}
            id="lastname"
            onChange={handleChange}
            placeholder="Enter your lastname"
          />
          {error.lastname ? <span className="error">{error.lastname}</span> : ""}
        </div>
        <div className="mb-3">
          <label
            name="document"
            className="form-label w-100 text-white text-center"
          >
            DOCUMENT ID
          </label>
          <input
            type="text"
            className={error.document ? "form-control danger" : "form-control"}
            name="document"
            id="document"
            value={data.document}
            onChange={handleChange}
            placeholder="Enter your document id"
          />
          {error.document ? <span className="error">{error.document}</span> : ""}
        </div>
        <div className="mb-3 w-100 d-flex justify-content-center">
          <button
            disabled={
              error.name || error.lastname || error.document 
                ? true
                : false
            }
            type="submit"
            className="btn btn-light isDisable"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;