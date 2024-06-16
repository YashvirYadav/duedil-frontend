import { Outlet } from "react-router-dom";

// function Company
export const Podoc = () => {
  return (
    <div>
      <main className="content" style={{ flex: 2 }}>
        <Outlet />
      </main>
    </div>
  );
};
