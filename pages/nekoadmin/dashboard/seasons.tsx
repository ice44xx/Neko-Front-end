import withProtectAdmin from '@/components/withAdminAuth';
import styles from '../styles.module.scss';
const Seasons = () => {
  return (
    <div>
      <h1>Seasons</h1>
    </div>
  );
};
export default withProtectAdmin(Seasons);
