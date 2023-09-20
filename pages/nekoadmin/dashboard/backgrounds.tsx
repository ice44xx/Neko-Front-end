import FooterAdmin from '@/components/dashboard/footerAdmin';
import HeaderAdmin from '@/components/dashboard/headerAdmin';
import DashBoardBackgrounds from '@/components/dashboard/sectionsBackgrounds/dashboardBackgrounds';
import withProtectAdmin from '@/components/withAdminAuth';

const Backgrounds = () => {
  return (
    <div>
      <HeaderAdmin />
      <DashBoardBackgrounds />
      <FooterAdmin />
    </div>
  );
};
export default withProtectAdmin(Backgrounds);
