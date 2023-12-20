import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const PrivateRoute = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return;
      
        if (!session) {
          router.replace('/');
        } 
        
        if (session && router.pathname === '/') {
          router.replace('/dashboard');
        }
      
      }, [session, status, router]);

    return <WrappedComponent {...props} />;
  };

  const Page = (props) => {
    return (
      <SessionProvider>
        <WithAuth {...props} />
      </SessionProvider>
    );
  };

  return Page;
};

export default PrivateRoute;
