import React from "react";
import { Route } from "react-router-dom";
import ArticleModule from "../../modules/articles/ArticleModule";
import ArticleDetails from "../../modules/articles/views/ArticleDetails";
import ArticlesList from "../../modules/articles/views/ArticlesList";
import AddArticle from "../../modules/articles/views/AddArticle";
import ArticleHistory from "../../modules/articles/component/ArticleHistory";
import PublishingHouse from "../../modules/articles/views/PublishingHouse";
import UpdateArticle from "../../modules/articles/views/UpdateArticle";
import PublishingHouseDetails from "../../modules/articles/views/PublishingHouseDetail";
import AuthorsList from "../../modules/articles/views/Authors";
import AuthorDetails from "../../modules/authors/components/AuthorInfo";
import UpdateAuthor from "../../modules/authors/components/UpdateAuthor";
import AddAuthors from "../../modules/articles/views/AddAuthors";


export default function ArticleRoutes() {
  return [
    <Route path="articles" key="articles-module" element={<ArticleModule />}>
      <Route index key="articles-list" element={<ArticlesList />} />
      <Route path="new-article" key="new-article" element={<AddArticle />} />
      <Route path=":id" key="article-details" element={<ArticleDetails />} />
      <Route key="index" path=":articleId/stocks/:stocksIds/full-history" element={<ArticleHistory />} />
      <Route path="publishingHouses" key="publishing-houses" element={<PublishingHouse />} />
      <Route path="publishingHouses/:id" key="publishing-houses-details"element={<PublishingHouseDetails />}/>
      <Route path="authors" key="authors" element={<AuthorsList />} />
      <Route path="add-author" key="add-author" element={<AddAuthors/>} />
      <Route path="authors/:id" key="author-details" element={<AuthorDetails/>} />

    </Route>,
  ];
}
