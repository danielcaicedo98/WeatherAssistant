import { Routes, Route } from "react-router-dom";
import routes from "@/routes";
import PrivateRoute from "./PrivateRoute"; // Importa el componente de ruta protegida

export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(({ layout, pages }) =>
          layout === "auth" ? (
        // Rutas accesibles solo si no hay usuario logueado (login y registro)
            pages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))
          ) : (
            // Rutas protegidas que requieren login
            pages.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute>
                    {element}
                  </PrivateRoute>
                }
              />
            ))
          )
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
