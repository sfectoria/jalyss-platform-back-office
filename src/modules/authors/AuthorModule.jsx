import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthorModule() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
