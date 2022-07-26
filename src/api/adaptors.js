export function getNewsList(apiResponse) {
  if (!apiResponse || !apiResponse.response) {
    return [];
  }

  // Extragerea datelor din raspunsul api-ului.
  const rawNewsList = apiResponse.response.results;
  // Maparea prin date si transformarea in formatul necesar.
  const adaptedNewsList = rawNewsList.map((news) => {
    return {
      id: news.id,
      thumbnail: news.fields.thumbnail,
      title: news.fields.headline,
      description: news.fields.trailText,
    };
  });

  // Returnarea datelor adaptate.
  return adaptedNewsList;
}

export function getNewsDetails(apiResponse) {
  // Daca raspunsul api-ului nu contine date, se returneaza un array gol.
  if (!apiResponse || !apiResponse.response) {
    return {};
  }

  // Extragerea datelor din raspunsul api-ului.
  const rawNewsDetails = apiResponse.response.content;
  // Extragerea din raspuns a campurilor de interes si salvarea in cheile corespunzatoare.
  const adaptedNewsDetails = {
    date: rawNewsDetails.webPublicationDate,
    title: rawNewsDetails.fields.headline,
    description: rawNewsDetails.fields.trailText,
    image: rawNewsDetails.fields.main,
    content: rawNewsDetails.fields.body,
    author: rawNewsDetails.fields.byline,
    thumbnail: rawNewsDetails.fields.thumbnail,
  };

  // Returnarea datelor adaptate
  return adaptedNewsDetails;
}
