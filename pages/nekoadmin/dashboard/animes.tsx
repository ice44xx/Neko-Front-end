import styles from '../styles.module.scss';
import HeaderAdmin from '@/components/dashboard/headerAdmin';
import FooterAdmin from '@/components/dashboard/footerAdmin';
import DashBoardAnimes from '@/components/dashboard/sectionAnimes/dashboardAnimes';
import withProtectAdmin from '@/components/withAdminAuth';

const Animes = () => {
  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <DashBoardAnimes />
      <FooterAdmin />
    </div>
  );
};
export default withProtectAdmin(Animes);
