import { Toast, ToastBody } from "reactstrap"
import styles from './styles.module.scss'

interface props {
    isOpen: boolean
    message: string
}

const ToastError = ({isOpen, message}: props) => {
    return(
        <>
            <Toast className={styles.toast} isOpen={isOpen} >
                <ToastBody className={styles.toastBody}>{message}<img src="/assets/toast_error.webp" alt="" className={styles.img} /></ToastBody>
            </Toast>
        </>
    )
}

export default ToastError