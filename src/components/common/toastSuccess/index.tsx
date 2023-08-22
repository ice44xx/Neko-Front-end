import { Toast, ToastBody } from 'reactstrap';
import styles from './styles.module.scss';

interface props {
  isOpen: boolean;
  message: string;
}

const ToastSuccess = ({ isOpen, message }: props) => {
  return (
    <>
      <Toast className={styles.toast} isOpen={isOpen}>
        <ToastBody className={styles.toastBody}>
          {message}
          <img src='/assets/toast_success.gif' className={styles.img} />
        </ToastBody>
      </Toast>
    </>
  );
};

export default ToastSuccess;
