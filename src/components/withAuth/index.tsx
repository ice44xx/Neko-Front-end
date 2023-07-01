import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withProtect = (WrappedComponent: React.ComponentType) => {
    
  const ProtectedRoute = (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const token = sessionStorage.getItem("nekoanimes-token");
          if (token) {
            setIsAuthenticated(!!token);
          } else {
            router.replace("/login");
          }
        } catch (error) {
          router.replace("/login");
        }
      };

      checkAuthStatus();
    }, [router]);

    return <>{isAuthenticated && <WrappedComponent {...props} />}</>;
  };

  return ProtectedRoute;
};

export default withProtect;
