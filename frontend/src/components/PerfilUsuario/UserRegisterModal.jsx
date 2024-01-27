import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useUserContext } from "../Context/UserContext";
import styles from "./styles.module.css";
import UserLoginModal from "./UserLoginModal";

function UserRegisterModal({
  closeModal,
  changeModalState,
  setLoginModalOpen,
  setIsUserRegisterModalOpen,
}) {
  const { register, handleSubmit } = useForm();
  const { handleRegister, isAuthenticated } = useUserContext();
  const [user, setLocalUser] = useState(null);

  const onSubmit = async (data) => {
    try {
      await handleRegister(data);
      closeModal();
    } catch (error) {
      console.error("Error en el registro inicial:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.everything}
      onClick={(e) => {
        if (e.target.className === "_everything_1q1ve_473") {
          changeModalState();
        }
      }}
    >
      <motion.form
        initial={{ translateY: 100 }}
        animate={{ translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registerForm}
      >
        <h2 className={styles.hola}>¡Hola!</h2>
        <p className={styles.registerP}>Introduce tus datos:</p>
        <div className={styles.inputContainer}>
          <div className={styles.inputPictureContainer}>
            <RxPerson className={styles.personIcon} />
            <input
              className={styles.firstInput}
              {...register("firstName")}
              placeholder="Nombre"
              required
            />
          </div>
          <div className={styles.inputPictureContainer}>
            {" "}
            <MdOutlineEmail className={styles.emailIcon} />
            <input
              className={styles.firstInput}
              {...register("email")}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.inputPictureContainer}>
            {" "}
            <MdOutlinePassword className={styles.passwordIcon} />
            <input
              className={styles.firstInput}
              {...register("password")}
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>
        </div>
        <button className={styles.guardarCambios} type="submit">
          Registrar
        </button>
        <p className={styles.loginLink}>
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => {
              setLoginModalOpen(true);
              setIsUserRegisterModalOpen(false);
            }}
          >
            Accede
          </span>
        </p>
      </motion.form>
    </motion.div>
  );
}

export default UserRegisterModal;
