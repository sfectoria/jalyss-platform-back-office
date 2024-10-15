import React from "react";
import { Route } from "react-router-dom";
import AuthorModule from "../../modules/authors/AuthorModule";
import AuthorsList from "../../modules/authors/views/AuthorsList";
import AuthorDetails from "../../modules/authors/views/AuthorDetails";
import AddAuthors from "../../modules/authors/views/AddAuthors";
import UpdateAuthor from "../../modules/authors/components/UpdateAuthor";




function AuthorRoutes() {
  return [
    <Route path="author" key="author-module" element={<AuthorModule />}>
      <Route index key="All-Authors" element={<AuthorsList />} />
      <Route path="add-author" key="add-author" element={<AddAuthors />} />
      <Route path=":id" key="author-details" element={<AuthorDetails/>} />
      <Route path="patch/:id" key="update-author" element={<UpdateAuthor />} />
    </Route>,
  ];
}

export default AuthorRoutes;
