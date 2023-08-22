import styles from '../../../../styles/animes.module.scss';
import { Button, Form } from 'reactstrap';
import { FormEvent } from 'react';

interface CommentComponentProps {
  userPhoto: string;
  userId: number | undefined;
  userName: string;
  handleCreateComment: (e: FormEvent<HTMLFormElement>) => void;
  auth: boolean;
  episodeId: number | undefined;
  anime?: number;
}

const CommentsLogin: React.FC<CommentComponentProps> = ({ userPhoto, userName, handleCreateComment, episodeId, anime }) => {
  return (
    <div className={styles.container_comments}>
      <div className={styles.containerPhoto}>
        {userPhoto ? (
          <img src={userPhoto} alt={userName} className={styles.profile} />
        ) : (
          <img src={'/assets/catwelcome.png'} alt={userName} className={styles.profile_false} />
        )}
      </div>
      <div className={styles.container_textarea}>
        <div className={styles.title}>
          <p>Comentar como {userName}</p>
        </div>
        <Form className={styles.form} onSubmit={handleCreateComment}>
          <input type='hidden' id='animeId' name='animeId' value={episodeId} />
          <input type='hidden' id='episodeId' name='episodeId' value={anime} />
          <input type='hidden' id='userPhoto' name='userPhoto' value={userPhoto} />
          <input type='hidden' id='userName' name='userName' value={userName} />
          <textarea className={styles.comment} id='content' maxLength={180} name='content' placeholder='Deixe um comentário...'></textarea>
          <div className={styles.container_btn}>
            <Button type='submit' className={styles.btn}>
              Comentar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CommentsLogin;
