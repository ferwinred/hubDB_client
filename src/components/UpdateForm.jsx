import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate} from "react-router-dom";
import { updateRow, getRowById } from "../redux/actions";

//importamos sweetalert para las alertas personalizadas
import Sweet from "sweetalert2";

//importamos los estilos adicionales del formulario
import "../css/form.scss";

//componente del formulario controlado
const UpdateForm = () => {
  //creamos dos variables en el estado, data y error; data tendrá la información que el usuario ingrese en el formulario actualizada y en error se guardará el error especifico que hay en el formulario.

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const row = useSelector((state) => state.row);
  console.log(row);

  const [data, setData] = useState({
    name: "",
    lastname: "",
    document: ""
  });
  

  useEffect(() => {
    dispatch(getRowById(id));
    console.log("pasé por aquí!");
    return
  }, [id, dispatch]);

  //esta función manejará el evento onChange de los imput y modificará las variables data y error del estado
  const handleChange = (e) => {
    //esta dunción modifica en el estado la variable data
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  //esta función maneja el evento onSubmit para controlar lo que el usuario esta enviando, se verifica que todos los campos esten llenos y sin errores; si identifica algun error no permite el envío; si hay algún campo vacío lanza una alerta para que el usuario llene los datos
  const handleSubmit = (e) => {
    e.preventDefault();

    //si pasa el if quiere decir que hay campos vacíos por lo tanto lanza la alerta personalizada
    let datos= {}

    if(data.name !== "") datos.name=data.name
    if(data.lastname !== "") datos.last_name=data.lastname
    if(data.document !== "") datos.document_id=data.document

    dispatch(updateRow({id, datos}));

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
      document: "",
    });
    navigate('/', {replace:true})
  };

  return (
    <div className="wrapper">
      <h2 className="text-dark fw-bold w-100 bg-light text-center opacity-100">
        FORM TO UPDATE DATA
      </h2>
      <p>
        Hello, if you want to add information to the Database fill the following
        form:
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
            className="form-control"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder={row.values?.name}
          />
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
            className="form-control"
            name="lastname"
            value={data.lastname}
            id="lastname"
            onChange={handleChange}
            placeholder={row.values?.last_name}
          />
          
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
            className="form-control"
            name="document"
            id="document"
            value={data.document}
            onChange={handleChange}
            placeholder={row.values?.document_id}
          />
          
        </div>
        <div className="mb-3 w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary isDisable m-1"
          >
            Send
          </button>

          <Link to="/">
            <button className="btn btn-light m-1">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
