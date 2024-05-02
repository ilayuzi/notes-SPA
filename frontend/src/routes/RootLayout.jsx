import { Outlet } from 'react-router-dom';

import MainHeader from '../components/MainHeader';

function RootLayout() {
  // Outlet is a place holder where the nested routes can render their content
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;
