import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const withProtectAdmin = (WrappedComponent: React.ComponentType) => {
  const ProtectedRouteAdmin = (props: any) => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      if (token) {
        setIsAdmin(true);
      } else {
        router.push('/nekoadmin/login');
      }
    }, [router]);

    if (!isAdmin) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  return ProtectedRouteAdmin;
};
export default withProtectAdmin;
