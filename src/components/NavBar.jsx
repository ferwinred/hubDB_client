import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import "../css/navBar.scss";

const NavMenu = () => {
  //creamos los estado menuOpen y size para que cuando cambie el tamaño de la pantalla podamos modificar el menú según las medidas, de esta forma lo hacemos responsive.
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: "",
    height: "",
  });

  //Se agregan las medidas para identificar el tamaño de la pantalla que esta abriendo la APP
  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  //useEffect que mantiene en constante actualización las medidas del browser y actualiza el estado del size si hay cambios
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //useEffect que rerenderiza el componente en el momento que cambia estado del menú y el width; también actualiza el estado del menú si se cumple el if que verifica las medidas
  useEffect(() => {
    if (size.width > 920 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  //función para manejar el click que despliega el menú
  const menuToggleHandler = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        <div
          className="content pd-0 "
        >
          <Link to="/" className="logo">
            TU VUELO YA
          </Link>
          <nav
            //Este componente tiene una clase adicional que se activa cuando el menuOpen es true
            className={`nav ${menuOpen && size.width < 920 ? "isMenu" : ""}`}
          >
            <ul>
              <li>
                <Link to="/" onClick={menuToggleHandler}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/add" onClick={menuToggleHandler}>
                  Add Data
                </Link>
              </li>
            </ul>
          </nav>
          {/*manejamos los iconos para mostrar dependiendo del estado de la variable menuOpen*/}
          <div className="toggle">
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default NavMenu;
