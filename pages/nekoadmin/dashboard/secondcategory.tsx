import withProtectAdmin from '@/components/withAdminAuth';
import styles from '../styles.module.scss';
const SecondCategory = () => {
  return (
    <div>
      <h1>SecondCategory</h1>
    </div>
  );
};
export default withProtectAdmin(SecondCategory);
