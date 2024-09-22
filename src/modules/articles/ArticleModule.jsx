import React from "react";
import { Outlet } from "react-router-dom";

export default function ArticleModule() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
