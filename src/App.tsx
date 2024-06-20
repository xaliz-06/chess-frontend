import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-slate-900 min-h-[100vh] flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default App;
