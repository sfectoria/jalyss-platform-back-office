import React from "react";
import { Route } from "react-router-dom";
import ArticleModule from "../../modules/articles/ArticleModule";
import ArticleDetails from "../../modules/articles/views/ArticleDetails";
import ArticlesList from "../../modules/articles/views/ArticlesList";
import AddArticle from "../../modules/articles/views/AddArticle";
import ArticleHistory from "../../modules/articles/component/ArticleHistory";
import PublishingHouse from "../../modules/articles/views/PublishingHouse";
import Authors from "../../modules/articles/views/Authors";
import UpdateArticle from "../../modules/articles/views/UpdateArticle";

export default function ArticleRoutes() {
  return [
    <Route path="articles" key="articles-module" element={<ArticleModule />}>
      <Route index key="articles-list" element={<ArticlesList />} />
      <Route path="new-article" key="new-article" element={<AddArticle />} />
      <Route path=":id" key="article-details" element={<ArticleDetails />} />
      <Route path=":id" key="article-update" element={<UpdateArticle />} />
      <Route key="index" path=":articleId/stocks/:stocksIds/full-history" element={<ArticleHistory />} />
      <Route path="publishingHouses" key="publishing-houses" element={<PublishingHouse />} />
      <Route path="authors" key="authors" element={<Authors />} />

    </Route>,
  ];
}
