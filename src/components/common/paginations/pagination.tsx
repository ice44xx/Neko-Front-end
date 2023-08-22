import styles from '../../../../styles/animes.module.scss';
import { CommentsForGet } from '@/services/commentService';
import { Button } from 'reactstrap';

interface PaginationProps {
  comments: CommentsForGet[] | null;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  indexOfLastComment: number;
}

const Pagination: React.FC<PaginationProps> = ({ comments, handlePreviousPage, handleNextPage, currentPage, indexOfLastComment }) => {
  return (
    <div className={styles.pagination}>
      {comments && comments.length >= 6 ? (
        <>
          <Button onClick={handlePreviousPage} className={styles.btn} disabled={currentPage === 1}>
            Página Anterior
          </Button>
          <Button onClick={handleNextPage} className={styles.btn} disabled={indexOfLastComment >= comments?.length}>
            Próxima Página
          </Button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Pagination;
