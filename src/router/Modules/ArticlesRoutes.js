import React from "react";
import { Route } from "react-router-dom";
import ArticleModule from "../../modules/articles/ArticleModule";
import ArticleDetails from "../../modules/articles/views/ArticleDetails";
import ArticlesList from "../../modules/articles/views/ArticlesList";
import AddArticle from "../../modules/articles/views/AddArticle";

export default function ArticleRoutes() {
    return[
        <Route path="articles" key='articles-module' element={<ArticleModule />}>
              <Route index key='articles-list' element={<ArticlesList />} />
              <Route path="new-article" key='new-article' element={<AddArticle />} />
              <Route path=":id" key='article-details' element={<ArticleDetails />} />

            </Route>
    ]
}
