import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withProtect = (WrappedComponent: React.ComponentType) => {
  const ProtectedRoute = (props: any) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        setIsAuth(true);
      } else {
        router.replace('/login');
      }
    }, [router]);

    if (!isAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
};

export default withProtect;
