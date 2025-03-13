import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layouts/StoreNavComponent/Layout/Layout';
import routes from './Layouts/StoreNavComponent/routes';

const App: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>}>
          {route.children?.map((child, childIndex) => (
            <Route key={childIndex} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default App;
