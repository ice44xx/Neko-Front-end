import HeaderAdmin from '@/components/dashboard/headerAdmin';
import styles from '../styles.module.scss';

import FooterAdmin from '@/components/dashboard/footerAdmin';
import DashBoardHome from '@/components/dashboard/dashboardHome';
import withProtectAdmin from '@/components/withAdminAuth';
const Home = () => {
  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <DashBoardHome />
      <FooterAdmin />
    </div>
  );
};
export default withProtectAdmin(Home);
