import { Login } from '@/page-components/Auth';
import DashboardPage from '@/page-components/dashboard/dashboard';
import Head from 'next/head';


const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <DashboardPage />
    </>
  );
};

export default Dashboard;
