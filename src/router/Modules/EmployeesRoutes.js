import React from "react";
import EmployeeModule from "../../modules/employers/EmployerModule";
import EmployeesList from "../../modules/employers/views/EmployersList";
import AddEmployee from "../../modules/employers/views/AddEmployer";
import { Route } from "react-router-dom";

function EmployeesRoutes() {
  return [
    <Route path="employees" key="employees-module" element={<EmployeeModule />}>
      <Route index key="employees-list" element={<EmployeesList />} />
      <Route path="add-employee" key="add-employee" element={<AddEmployee />} />
    </Route>,
  ];
}

export default EmployeesRoutes;
