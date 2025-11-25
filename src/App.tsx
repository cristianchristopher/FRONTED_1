/*import Personales from "./components/Personales";

function App() {
  return (
    <div>
      <Personales />
    </div>
  );
}

export default App;*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardHomePage from "./pages/DashboardHomePage";
import PersonalListPage from "./pages/PersonalListPage";
import PersonalCreatePage from "./pages/PersonalCreatePage";
import CustomerListPage from "./pages/CustomerListPage";
import ImageUploadPage from "./pages/ImageUploadPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* PANEL ADMIN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* PAGINA PRINCIPAL DEL DASHBOARD */}
          <Route path="" element={<DashboardHomePage />} />

          {/* PERSONAL */}
          <Route path="personal" element={<PersonalListPage />} />
          <Route path="personal/create" element={<PersonalCreatePage />} />

          {/* CLIENTES */}
          <Route path="customers" element={<CustomerListPage />} />

          {/* IMÁGENES */}
          <Route path="images" element={<ImageUploadPage />} />

        </Route>

        {/* CUALQUIER OTRA RUTA → LOGIN */}
        <Route path="*" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;