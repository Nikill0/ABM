import { Route, Routes } from "react-router-dom"
import * as React from 'react'

const Administración = React.lazy(() => import('../pages/Administración'));
const Empleados = React.lazy(() => import('../pages/Empleados'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const Login = React.lazy(() => import('../pages/Login'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute'));

const AppRoutes: React.FC = () => (
    <Routes>
        <Route element ={<HomePage/>} path="/" />
        <Route element={<PrivateRoute element={<Administración/>} />} path="/administración"/>
        <Route element={<PrivateRoute element={<Empleados/>} />} path="/empleados"/>
        <Route element={<Login/>} path="/login" />
    </Routes>
);

export default AppRoutes