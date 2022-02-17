//se importa el componente Card con los estilos
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sweet from "sweetalert2";
import { getRows, deleteRow, getRowById } from '../redux/actions';
import logo from '../assets/hubspot.png';

//se importan los estilos adicionales del home
import "../css/home.scss";

const Home = () => {

  const hubData = useSelector((state) => state.hubData);
  const [view, setView] = useState(false)

  console.log(hubData)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleView = (e) => {
    dispatch(getRows());
    console.log('aquí entré')
    setView(true)
  }

  const handleUpdate = (e) =>{
    dispatch(getRowById(e.target.id))
    navigate(`/update/${e.target.id}`, {replace: true})
  }
  
  const handleClick = async (e) => {
    const response = await Sweet.fire({
      title: "Wait!",
      text: "Do you want permanently delete this data from the database?",
      showCancelButton: true,
      confirmButtonText: 'delete',
    })
    if(response.isConfirmed){
      dispatch(deleteRow(e.target.id))
      Sweet.fire({
        title: "HubSpot App",
        text: "missing data in the form",
        icon: "success",
        timer: 4000,
        confirmButtonText: "Agree",
      })
    }
  }

  return (
    <div className="w-100 home d-flex flex-column">
      <h2 className="text-dark fw-bold w-100 bg-light text-center opacity-100">
        Bienvenido a Tu Vuelo Ya
      </h2>

      <div className="container align-content-center justify-content-center">
        <Card id="1" style={{ width: "18rem", margin: "2%" }}>
          <Card.Img variant="top" src={logo} />
          <Card.Body>
            <Card.Title>Data from HubdSpot DB</Card.Title>
            <Card.Text>If you want to check the information saved in the database, please click the button!</Card.Text>
            <Button variant="primary" onClick={handleView}>View Data</Button>
          </Card.Body>
        </Card>
      </div>
      <div className="content d-flex flex-row flex-wrap">
        { view ? hubData.map((row) => {
          return <Card id={row.id} key={row.id} style={{ width: "18rem", margin: "2%" }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{`${row.values.name} ${row.values.last_name}`}</Card.Title>
            <Card.Text>{row.values.document_id}</Card.Text>
            <Button variant="primary" onClick={handleUpdate} id={row.id} >Update</Button>
            <Button variant="warning" onClick={handleClick} id={row.id}>Delete</Button>
          </Card.Body>
        </Card>
        }) : (<div></div>)}
      </div>
    </div>
  );
};

export default Home;
