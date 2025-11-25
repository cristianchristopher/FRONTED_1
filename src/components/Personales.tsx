import { useEffect, useState } from "react";
import { listarPersonales } from "../api/personal";

function Personales() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarPersonales()
      .then((res) => {
        console.log("Respuesta del backend:", res.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener personal:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (data.length === 0) return <p>No hay datos disponibles.</p>;

  const columnas = Object.keys(data[0]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Personal</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            {columnas.map((col) => (
              <th
                key={col}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#f4f4f4",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {col.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((p, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              {columnas.map((col) => (
                <td key={col} style={{ padding: "8px" }}>
                  {p[col] != null ? p[col].toString() : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Personales;