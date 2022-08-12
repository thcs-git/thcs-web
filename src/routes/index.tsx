import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../store";
// permissions
import { checkViewPermission } from "../utils/permissions";

// import GuestRoute from "./guest";
// import Route from "./private";

import NotFound from "../pages/errors/not-found";

import Dashboard from "../pages/dashboard";
import Dashboard_user from "../pages/dashboard_user";

import CareList from "../pages/care/list";
import CareOverview from "../pages/care/overview";
import CareSchedule from "../pages/care/overview/schedule";

import CompanyList from "../pages/company/list";
import CompanyForm from "../pages/company/form";

import CustomerList from "../pages/customer/list";
import CustomerForm from "../pages/customer/form";
import ClientForm from "../pages/client/form";

import SpecialtyList from "../pages/specialty/list";
import SpecialtyForm from "../pages/specialty/form";

import CouncilList from "../pages/council/list";
import CouncilForm from "../pages/council/form";

import AreaList from "../pages/area/list";
import AreaForm from "../pages/area/form";

import UserList from "../pages/user/list";
import UserForm from "../pages/user/form";

import UserClientList from "../pages/userclient/list/index";
import UserClientForm from "../pages/userclient/form/index";
import UserDisengaged from "../pages/user_disengaged/list/index";
import UserConfiguration from "../pages/userconfiguration/form/index";
import ClientConfiguration from "../pages/clientconfiguration/form/index";
import PatientList from "../pages/patient/list";
import PatientForm from "../pages/patient/form";
import PatientCaptureCreate from "../pages/patient/capture/form";
import PatientCaptureOverview from "../pages/patient/capture/overview";
import PatientCaptureNead from "../pages/patient/capture/nead";
import PatientCaptureSocioAmbiental from "../pages/patient/capture/socioambiental";
import PatientCaptureAbemid from "../pages/patient/capture/abemid";
import PrintDocument from "../pages/care/medical-records/documents/print";

import ConfirmEmail from "../pages/confirmEmail/form/index";
import VerifyEmail from "../pages/confirmEmail/verifyEmail/index";
import RecoveryPassword from "../pages/recoverypassword/form/index";
import ForgotPassword from "../pages/forgotpassword/form/index";

import AvaliationList from "../pages/avaliation/list";
import RecoveryPassMenu from "../pages/recoverypassmenu";
import QrCode from "../pages/qrcode/";
// import PatientForm from '../pages/patient/form';
// import CareOverview from '../pages/patient/overview';

import ProfessionForm from "../pages/profession/form/index";

import Login from "../pages/login";
//import Register from '../pages/register';
import ProtectedRoute from "./protectRoute";
import LOCALSTORAGE from "../helpers/constants/localStorage";

const hasToken = !!localStorage.getItem(LOCALSTORAGE.TOKEN);

export default function SwitchRoutes() {
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* <GuestRoute path="/" element={Login} exact /> */}
        {/* <GuestRoute path="/register" element={Register} /> */}
        {/* <Route path="/" element={Login} exact /> */}
        <Route
          path="/login"
          element={hasToken ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/:email/confirmemail"
          element={hasToken ? <Navigate to={"/"} /> : <ConfirmEmail />}
        />
        <Route
          path="/confirmemail/:token"
          element={hasToken ? <Navigate to={"/"} /> : <VerifyEmail />}
        />
        <Route
          path="/recoverypass/:token"
          element={hasToken ? <Navigate to={"/"} /> : <RecoveryPassword />}
        />
        <Route
          path="/forgotpassword"
          element={hasToken ? <Navigate to={"/"} /> : <ForgotPassword />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              {checkViewPermission(
                "care",
                JSON.stringify(rightsOfLayoutState)
              ) ? (
                <CareList />
              ) : (
                <UserConfiguration />
              )}
            </ProtectedRoute>
          }
        />

        <Route path="/recoverypassmenu" element={<RecoveryPassMenu />} />
        {/* <Route
          path="/"
          element={
            checkViewPermission("care", JSON.stringify(rightsOfLayoutState))
              ? CareList
              : UserConfiguration
          }
          exact
        /> */}
        <Route
          path="/dashboard_user"
          element={
            <ProtectedRoute>
              <Dashboard_user />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Configuration */}
        <Route
          path="/userconfiguration"
          element={
            <ProtectedRoute>
              <UserConfiguration />
            </ProtectedRoute>
          }
        />
        <Route path="/clientconfiguration" element={<ClientConfiguration />} />

        {/* Clientes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/:id/:mode/edit"
          element={
            <ProtectedRoute>
              <CustomerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/create"
          element={
            <ProtectedRoute>
              <CustomerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/:id/:mode"
          element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          }
        />

        {/* Empresas */}
        <Route
          path="/company"
          element={
            <ProtectedRoute>
              <CompanyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:id/:mode"
          element={
            <ProtectedRoute>
              <CompanyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/create"
          element={
            <ProtectedRoute>
              <CompanyForm />
            </ProtectedRoute>
          }
        />

        {/* Especialidades */}
        <Route
          path="/specialty"
          element={
            <ProtectedRoute>
              <SpecialtyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/specialty/:id/edit"
          element={
            <ProtectedRoute>
              <SpecialtyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/specialty/create"
          element={
            <ProtectedRoute>
              <SpecialtyForm />
            </ProtectedRoute>
          }
        />

        {/* Conselhos */}
        <Route
          path="/council"
          element={
            <ProtectedRoute>
              <CouncilList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/council/:id/edit"
          element={
            <ProtectedRoute>
              <CouncilForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/council/create"
          element={
            <ProtectedRoute>
              <CouncilForm />
            </ProtectedRoute>
          }
        />

        {/* Areas */}
        <Route
          path="/area"
          element={
            <ProtectedRoute>
              <AreaList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/area/:id/:mode/edit"
          element={
            <ProtectedRoute>
              <AreaForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/area/create"
          element={
            <ProtectedRoute>
              <AreaForm />
            </ProtectedRoute>
          }
        />

        {/* Usuário */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id/:mode/edit"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:mode/create"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdesengaged"
          element={
            <ProtectedRoute>
              <UserDisengaged />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userclient"
          element={
            <ProtectedRoute>
              <UserClientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userclient/:id/:mode/:callback"
          element={
            <ProtectedRoute>
              <UserClientForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userclient/:id/:mode"
          element={
            <ProtectedRoute>
              <UserClientForm />
            </ProtectedRoute>
          }
        />

        {/* Patient */}
        <Route
          path="/patient/capture/create"
          element={
            <ProtectedRoute>
              <PatientCaptureCreate />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/patient/capture/:id/overview"
          element={
            <ProtectedRoute>
              <PatientCaptureOverview />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <PatientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/create"
          element={
            <ProtectedRoute>
              <PatientForm />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/patient/capture/:id/nead"
          element={
            <ProtectedRoute>
              <PatientCaptureNead />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/capture/:id/nead/:documentId"
          element={
            <ProtectedRoute>
              <PatientCaptureNead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/capture/:id/abemid"
          element={
            <ProtectedRoute>
              <PatientCaptureAbemid />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/capture/:id/abemid/:documentId"
          element={
            <ProtectedRoute>
              <PatientCaptureAbemid />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/capture/:id/socioambiental"
          element={
            <ProtectedRoute>
              <PatientCaptureSocioAmbiental />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/capture/:id/socioambiental/:documentId"
          element={
            <ProtectedRoute>
              <PatientCaptureSocioAmbiental />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/patient/:id/:mode/:callback/:callback_id"
          element={
            <ProtectedRoute>
              <PatientForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/:id/:mode"
          element={
            <ProtectedRoute>
              <PatientForm />
            </ProtectedRoute>
          }
        />

        {/* Care */}
        <Route
          path="/care"
          element={
            <ProtectedRoute>
              <CareList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/care/:id/overview"
          element={
            <ProtectedRoute>
              <CareOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/care/:id/overview/schedule"
          element={
            <ProtectedRoute>
              <CareSchedule />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/care/:id/medical-records/document/:documentId/print"
          element={<ProtectedRoute><PrintDocument/></ProtectedRoute>}
        /> */}

        {/* Register */}
        {/* avaliation */}
        <Route
          path="/avaliation"
          element={
            <ProtectedRoute>
              <AvaliationList />
            </ProtectedRoute>
          }
        />
        {/* qrcode */}
        <Route
          path="/qrcode"
          element={
            <ProtectedRoute>
              <QrCode />
            </ProtectedRoute>
          }
        ></Route>
        {/* <Route path="/avaliation/:id/edit" element={<ProtectedRoute><CareForm/></ProtectedRoute>} /> */}
        {/* <Route path="/avaliation/create" element={<ProtectedRoute><CareForm/></ProtectedRoute>} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
