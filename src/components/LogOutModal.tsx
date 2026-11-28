import styles from "../styles/log-out.module.scss"

const LogOutModal = () => {

    return(
        <div className={styles.log__out__container}>
<button>X</button>

 <div className={styles.btn__wrapper}>
          <button className={styles.yes__btn}>Так</button>
          <button className={styles.no__btn}>Ні</button>
        </div>
        </div>
    )
}

export default LogOutModal;