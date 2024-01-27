import styles from "../NavBar/styles.module.css";
import SearchBar from "../SearchBar";
import logo from "../../assets/icons/logo.svg";
import userIcon from "../../assets/icons/user-svgrepo-com.svg";
import listIcon from "../../assets/icons/list-ul-alt-svgrepo-com.svg";
import locationIcon from "../../assets/icons/location-pin-svgrepo-com.svg";
import { useState } from "react";
import UserRegisterModal from "../PerfilUsuario/UserRegisterModal";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import UserLoginModal from "../PerfilUsuario/UserLoginModal";

export default function NavBar() {
  const [logged, setLogged] = useState(true);
  const navigate = useNavigate();
  const [isPerfilUsuarioModalOpen, setIsPerfilUsuarioModalOpen] =
    useState(false);
  const [isUserRegisterModalOpen, setIsUserRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleUserModal = () => {
    console.log("Antes de cambiar:", isPerfilUsuarioModalOpen); // Muestra el estado antes de cambiarlo
    setIsPerfilUsuarioModalOpen((currentState) => !currentState);
    console.log("Después de cambiar:", !isPerfilUsuarioModalOpen); // Muestra el estado que se va a establecer
  };

  const handleRegisterModal = () => {
    setIsUserRegisterModalOpen((currentState) => !currentState);
  };

  console.log(
    "Estado actual de isPerfilUsuarioModalOpen:",
    isPerfilUsuarioModalOpen
  ); // Muestra el estado actual en cada renderización

  if (logged === true) {
    console.log("logged true");

    return (
      <>
        <nav className={styles.navBar}>
          <div onClick={() => navigate("/")} className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt="" />
          </div>
          <div className={styles.searchBarContainer}>
            <SearchBar />
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.locationContainer}>
              <img className={styles.locationIcon} src={locationIcon} alt="" />
              <p>Adress, 98, 3016. Barcelona</p>
            </div>
            <div className={styles.navBarButtons}>
              <button onClick={handleUserModal}>
                <img className={styles.userIcon} src={userIcon} alt="" />
              </button>
              <button>
                <img className={styles.listIcon} src={listIcon} alt="" />
              </button>
            </div>
          </div>
        </nav>

        {isPerfilUsuarioModalOpen && (
          <PerfilUsuario
            modalState={isPerfilUsuarioModalOpen}
            changeModalState={handleUserModal}
            setLogged={setLogged}
          />
        )}
      </>
    );
  } else {
    console.log("logged false");
    return (
      <>
        <nav className={styles.navBar}>
          <div
            onClick={() => navigate("/")}
            className={styles.logoContainerUnlogged}
          >
            <img className={styles.logo} src={logo} alt="" />
          </div>
          <div className={styles.getStartedContainer}>
            <button
              className={styles.getStartedButton}
              onClick={handleRegisterModal}
            >
              Empieza aquí
            </button>
          </div>
        </nav>
        {isUserRegisterModalOpen && (
          <UserRegisterModal
            modalState={isUserRegisterModalOpen}
            changeModalState={handleRegisterModal}
            setLogged={setLogged}
            setLoginModalOpen={setLoginModalOpen}
            setIsUserRegisterModalOpen={setIsUserRegisterModalOpen}
          />
        )}
        <UserLoginModal setLogged={setLogged} loginModalOpen={loginModalOpen} />
      </>
    );
  }
}
