import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { getNewsList } from "../api/adaptors";
import NewsCardList from "../components/NewsCardList";
import Pagination from "../components/Pagination";

function NewsCategory() {
  // Extragerea parametrul venit din URL.
  const { categoryId } = useParams();
  // Extragerea query (search) param-ul page din URL.
  let [queryParams] = useSearchParams();
  let currentPage = queryParams.get("page");
  if (!currentPage) {
    currentPage = 1;
  }
  // Generarea endpoint-ului pentru categoria curenta.
  const newsCategoryEndpoint = getNewsCategoriesEndpoint(
    categoryId,
    currentPage
  );
  // Fetch-uirea stirilor categoriei.
  const news = useFetch(newsCategoryEndpoint);
  // Adaptarea datelor venite de la server pentru componentele de react.
  const adaptedNewsList = getNewsList(news);

  // In functie de parametrul primit in url, se afiseaza titlul categoriei.
  let title = "";
  switch (categoryId) {
    case "technology":
      title = "Tech";
      break;
    case "football":
      title = "Football";
      break;
    case "fashion":
      title = "Fashion";
      break;
    case "business":
      title = "Business";
      break;
    default:
      break;
  }

  return (
    <Layout>
      <Container className="my-5">
        <h1 className="mb-5 pt-3">{title}</h1>
        {/* Afisarea listei stirilor. */}
        <NewsCardList newsList={adaptedNewsList} />
        {/* Afisarea paginatiei. */}
        <Pagination active={currentPage} baseUrl={`/category/${categoryId}`} />
      </Container>
    </Layout>
  );
}

export default NewsCategory;
