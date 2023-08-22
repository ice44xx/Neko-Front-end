import { CommentsForGet } from '@/services/commentService';
import styles from '../../../../styles/animes.module.scss';
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';

interface CommentComponentProps {
  comment: any;
  currentComments: CommentsForGet[] | null | undefined;
  userId: number | undefined;
  auth: boolean;
  liked: any;
  handleLike: (commentId: number) => void;
  handleDeleteComment: (commentId: number) => void;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ comment, currentComments, userId, auth, liked, handleLike, handleDeleteComment }) => {
  const router = useRouter();

  return (
    <>
      {currentComments?.map(comment => (
        <div key={comment.id} className={styles.container_comments_all}>
          <div className={styles.container_textarea}>
            <div className={styles.container_title}>
              <div className={styles.container_photo}>
                {comment.userPhoto ? (
                  <img src={comment.userPhoto} alt={comment.userName} className={styles.profile} />
                ) : (
                  <img src={`/assets/catwelcome.png`} alt={comment.userName} className={styles.profile_false} />
                )}
              </div>
              <p className={styles.title}>{comment.userName}</p>
              {comment.userId === Number(userId) && (
                <img src='/assets/trash.png' alt='lixeira' className={styles.trash} onClick={() => handleDeleteComment(comment.id)} />
              )}
            </div>
            <p className={styles.comment}>{comment.content}</p>

            <div className={styles.date}>
              <div className={styles.like}>
                {auth ? (
                  <>
                    <Button
                      className={`${styles.like_btn} ${liked[comment.id] ? styles.liked : styles.notLiked}`}
                      onClick={() => handleLike(comment.id)}
                    ></Button>
                    <p>{comment.likeComments.length}</p>
                  </>
                ) : (
                  <>
                    <Button className={`${styles.like_btn} ${styles.notLiked}`} onClick={() => router.push('/login')}></Button>
                    <p>{comment.likeComments.length}</p>
                  </>
                )}
              </div>
              <p>{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default CommentComponent;
