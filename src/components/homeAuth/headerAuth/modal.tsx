import Link from 'next/link';
import styles from './styles.module.scss';

interface ModalProps {
  modalOpen: boolean;
  randomName: string;
  handleLogout: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, randomName, handleLogout }) => {
  return (
    <div className={`${styles.modal} ${modalOpen ? styles.activeModal : ''}`}>
      <Link href={'/profile'} className={styles.link}>
        <p className={styles.modalLink}>
          Meus Dados <img src='/assets/user.png' alt='user' className={styles.img} />
        </p>
      </Link>
      <Link href={'/donates'} className={styles.link}>
        <p className={styles.modalLink}>
          Doações <img src='/assets/donates.png' alt='donates' className={styles.img} />
        </p>
      </Link>
      <Link href={'/order'} className={styles.link}>
        <p className={styles.modalLink}>
          Pedidos <img src='/assets/order.png' alt='donates' className={styles.img} />
        </p>
      </Link>
      <Link href={`/animes/${randomName}`} className={styles.link}>
        <p className={styles.modalLink}>
          Anime aleatório <img src='/assets/dados.png' alt='anime aleatório' className={styles.img} />
        </p>
      </Link>
      <Link href={'/'} className={styles.link}>
        <p className={styles.modalLink} onClick={handleLogout}>
          <span>
            Sair <img src='/assets/logout.png' alt='logout' className={styles.img} />
          </span>
        </p>
      </Link>
    </div>
  );
};
export default Modal;
