import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import AddEmployee from "./views/AddEmployee"
import Dashboard from "./views/Dashboard"
import Login from "./views/Login"


function AppRouter() {
  

  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addEmployee" element={<AddEmployee />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
