const API_KEY = "3dc403a0-cf86-4a23-8b87-21869744b388";

// Functie care returneaza endpoint-ul pentru o anumita categorie de stiri.
export function getNewsCategoriesEndpoint(
  category,
  pageNumber = 1,
  pageSize = 20
) {
  // Se construieste query string-ul. Va contine api-key-ul, sectiunea, optiunea de afisare a campurilor stirii, precum și numarul de elemente returnate si numarul paginii.
  const queryParams = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

  // Returnarea link-ului aferent API-ului The Guardian.
  return `https://content.guardianapis.com/search${queryParams}`;
}

// Functie care returneaza endpoint-ul pentru o anumita stire.
export function getNewsDetailsEndpoint(newsId) {
  // Se construieste query string-ul. Va contine api-key-ul si optiunea de afisare a campurilor stirii.
  const queryParams = `?api-key=${API_KEY}&show-fields=all`;

  // Returnarea link-ului aferent API-ului The Guardian.
  return `https://content.guardianapis.com/${newsId}${queryParams}`;
}
