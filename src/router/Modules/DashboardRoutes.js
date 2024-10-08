import React from "react";
import { Route } from "react-router-dom";
import DashboardModule from "../../modules/dashboard/DashboardModule";
import MyResponsiveBump from "../../modules/dashboard/views/BumpChart";
import MyResponsiveCalendar from "../../modules/dashboard/views/CalendarChart";
import MyResponsiveLine from "../../modules/dashboard/views/LineChart";

function DashboardRoutes() {
  return [
    <Route path="/" key="dashboard-module" element={<DashboardModule />}>
      <Route index key="dashboard-line" element={<MyResponsiveLine />} />
      <Route path="bump" key="dashboard-bump" element={<MyResponsiveBump />} />
      <Route
        path="calendar"
        key="dashboard-calendar"
        element={<MyResponsiveCalendar />}
      />
    </Route>,
  ];
}

export default DashboardRoutes;
