import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./NewsCard.module.css";
import { removeFromFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";

function NewsCard(props) {
  // Extragerea dispatch-ul care modifica state-ul aferent stirilor favorite.
  const { favoritesDispatch } = useContext(FavoritesContext);
  // Extragerea prop-urilor componentei.
  const { newsId, imgSrc, title, description, hasCloseButton } = props;

  function handleRemoveFromFavorites(id) {
    // Apelarea actiunei de stergere de la favorite.
    const actionResult = removeFromFavorites(id);
    // Trimiterea rezultatul actiunii catre reducer.
    favoritesDispatch(actionResult);
  }

  return (
    <Card
      className={`${styles.newsCard} h-100 d-flex flex-column justify-content-between align-items-center`}
    >
      {/* La click pe continutul card-ului, se redirectioneaza catre pagina cu detalii. */}
      {/* Caracterul / din id il deruteaza pe React Router, asa ca trebuie codificat. */}
      <Link to={`/news/${encodeURIComponent(newsId)}`}>
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Link>
      {/* Daca este buton de eliminare la favorite, se afiseaza. */}
      {hasCloseButton && (
        <Button
          variant="light"
          className={styles.newsCardButton}
          onClick={() => {
            // Pasarea id-ului corespunzator functiei care actualizeaza lista de favorite.
            handleRemoveFromFavorites(newsId);
          }}
        >
          <span className="material-icons text-dark">close</span>
        </Button>
      )}
    </Card>
  );
}

export default NewsCard;
