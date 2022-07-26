import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { getNewsDetails } from "../api/adaptors";
import Button from "react-bootstrap/Button";
import styles from "./NewsDetails.module.css";
import { getFormattedDate } from "../utils/date";
import { addToFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";
import Alert from "react-bootstrap/Alert";

function NewsDetails() {
  // Extragerea functiei care modifica state-ul global.
  const { favoritesDispatch } = useContext(FavoritesContext);
  // Extragerea parametrului venit din URL.
  let { newsId } = useParams();
  // id-ul extras din URL se decodeaza.
  newsId = decodeURIComponent(newsId);
  // Generarea endpointului pentru detaliile stirii.
  const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);
  // Cererea datelor de la server.
  const newsDetails = useFetch(newsDetailsEndpoint);
  // Adaptarea datelor de la server la datele de care au nevoie componentele de react.
  const adaptedNewsDetails = getNewsDetails(newsDetails);
  const [alert, setAlert] = useState(false);

  // Extragerea campurilor de interes din datele adaptate.
  const { title, description, image, date, author, content, thumbnail } =
    adaptedNewsDetails;
  // Formatarea datei.
  const formattedDate = getFormattedDate(date);

  function handleAddToFavorites(product) {
    // Apelarea actiunei de adaugare la favorite.
    const actionResult = addToFavorites(product);
    // Trimiterea rezultatului actiunii catre reducer.
    favoritesDispatch(actionResult);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  return (
    <Layout>
      <Container className={`${styles.newsDetails} my-5`}>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5">{title}</h1>
            <p className="fw-bold">{description}</p>
            <div
              // Pentru a afisa html pe ecran, trebuie prop-ul dangerouslySetInnerHTML.
              dangerouslySetInnerHTML={{ __html: image }}
              className="mb-4"
            ></div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>
              <Button
                onClick={() => {
                  // Construirea payload-ul actiunii si apelarea functiei care trimite actiunea catre reducer.
                  handleAddToFavorites({
                    id: newsId,
                    thumbnail,
                    title,
                    description,
                    hasCloseButton: true,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
      {alert && (
        <Alert variant="info" id={styles.alert}>
          Știrea a fost adăugată cu succes la Favorite!
        </Alert>
      )}
    </Layout>
  );
}

export default NewsDetails;
