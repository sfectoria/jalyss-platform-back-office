import React from "react";
import { Outlet } from "react-router-dom";

export default function StockModule() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
