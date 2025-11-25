import { useState } from "react";
import { loginRequest } from "../api/auth";

function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginRequest(correo, contrasena);
      const token = res.data.data.token;

      localStorage.setItem("token", token);

      alert("Inicio de sesión exitoso");

      window.location.href = "/dashboard"; // Redirigir a Personal o dashboard
    } catch (err: any) {
      console.error(err);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Ingresar</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;