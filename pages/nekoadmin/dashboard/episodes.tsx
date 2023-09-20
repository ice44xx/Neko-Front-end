import withProtectAdmin from '@/components/withAdminAuth';

const Episodes = () => {
  return (
    <div>
      <h1>Episodes</h1>
    </div>
  );
};
export default withProtectAdmin(Episodes);
