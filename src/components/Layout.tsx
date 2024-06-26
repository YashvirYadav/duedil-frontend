// Layout.tsx
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '250px', flexShrink: 0 }}> {/* Sidebar fixed width */}
        {/* Sidebar content */}
      </div>
      <div style={{ flexGrow: 1 }}>
        <Outlet /> {/* Main content area where nested routes render */}
      </div>
    </div>
  );
};

export default Layout;