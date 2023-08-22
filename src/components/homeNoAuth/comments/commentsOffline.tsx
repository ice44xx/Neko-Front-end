import styles from '../../../../styles/animes.module.scss';
import Link from 'next/link';
import { Button } from 'reactstrap';

const CommentsOffline = () => {
  return (
    <div className={styles.container_comments_login}>
      <p className={styles.title}>Comentários</p>
      <p className={styles.subtitle}>Quer ajudar a impulsionar nossa comunidade?</p>

      <div className={styles.container_btn}>
        <Link href={'/login'}>
          <Button className={styles.btn}>Fazer login</Button>
        </Link>
        <Link href={'/register'}>
          <Button className={styles.btn}>Criar conta</Button>
        </Link>
      </div>
    </div>
  );
};
export default CommentsOffline;
