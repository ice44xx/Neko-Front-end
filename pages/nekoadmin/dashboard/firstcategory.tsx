import FooterAdmin from '@/components/dashboard/footerAdmin';
import HeaderAdmin from '@/components/dashboard/headerAdmin';
import DashBoardCategories from '@/components/dashboard/sectionsCategories/dashboardCategories';
import withProtectAdmin from '@/components/withAdminAuth';

const FirstCategory = () => {
  return (
    <div>
      <HeaderAdmin />
      <DashBoardCategories />
      <FooterAdmin />
    </div>
  );
};
export default withProtectAdmin(FirstCategory);
