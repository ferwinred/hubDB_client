//Esta función sera el controlador del formulario para no recibir datos vacíos e información en formato incorrecto
const validateForm = (data) => {
    let error = {};
  
    //if para verificar si nombre esta vacío o si esta incorrecto el formato; si alguna de las dos se cumple agregara una propiedad nombre al objeto error con el detalle del error
    if (!data.name) {
      error.name = "name is required";
    } else if (!/[^0-9]/.test(data.name)) {
      error.name = "name shouldn't have numbers";
    }
  
     //if para verificar si email esta vacío o si esta incorrecto el formato; si alguna de las dos se cumple agregara una propiedad email al objeto error con el detalle del error
    if (!data.lastname) {
      error.lastname = "lastname is required";
    } else if (!/[^0-9]/.test(data.lastname)) {
      error.lastname = "lastname shouldn't have numbers";
    }
  
    //if para verificar si email esta vacío o si esta incorrecto el formato; si alguna de las dos se cumple agregara una propiedad email al objeto error con el detalle del error
    if (!data.document) {
      error.document = "document id is required";
    }
  
  
    //al final retornamos el objeto error
    return error;
  };
  
  //exportamos el controlador para ser usado en el componente form
  export default validateForm;
  