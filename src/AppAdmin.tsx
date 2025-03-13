import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminLayoutComponent from "./Layouts/AdminNavComponent/AdminLayoutComponent/AdminLayoutComponent";
import routes from "./Layouts/AdminNavComponent/AdminRoutes";


const AppAdmin: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
              <AdminLayoutComponent>{route.element}</AdminLayoutComponent>
          }
        >
          {route.children?.map((child, childIndex) => (
            <Route key={childIndex} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppAdmin;
