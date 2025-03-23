import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../configs/firebase/users";
import { useState } from "react";

export function SignIn() {
  // Estado para manejar los campos de correo y contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar errores
  const navigate = useNavigate(); // Para redirigir después de iniciar sesión

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
      navigate("/dashboard/assistant"); // Redirige al dashboard después del login exitoso
    } catch (err) {
      setError("Correo o contraseña incorrectos"); // Muestra error si falla el login
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Iniciar Sesión</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tu correo y contraseña</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu correo
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Contraseña
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {error && (
            <Typography variant="small" color="red" className="text-center mb-4">
              {error}
            </Typography>
          )}

          <Button type="submit" className="mt-6" fullWidth>
            Iniciar Sesión
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            No estás registrado?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Crear cuenta</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
