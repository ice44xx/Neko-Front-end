import FooterAdmin from '@/components/dashboard/footerAdmin';
import HeaderAdmin from '@/components/dashboard/headerAdmin';
import DashBoardUsers from '@/components/dashboard/sectionsUsers/dashboardUsers';

const Users = () => {
  return (
    <div>
      <HeaderAdmin />
      <DashBoardUsers />
      <FooterAdmin />
    </div>
  );
};
export default Users;
