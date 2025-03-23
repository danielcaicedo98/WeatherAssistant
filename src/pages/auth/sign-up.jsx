import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../configs/firebase/users";
import { useState } from "react";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar los errores
  const navigate = useNavigate(); // Para redirigir después de crear cuenta

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, email); // Crea la cuenta
      navigate("/auth/sign-in"); // Redirige al login después de registro exitoso
    } catch (err) {
      setError("Error al crear la cuenta. Verifica tu correo y contraseña."); // Muestra mensaje de error
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Únete Hoy</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tu correo y contraseña para registrarte.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu correo
            </Typography>
            <Input
              size="lg"
              placeholder="nombre@correo.com"
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

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                Acepto los&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Términos y Condiciones
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Crear Cuenta
          </Button>



          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            ¿Ya tienes cuenta?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Iniciar sesión</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
