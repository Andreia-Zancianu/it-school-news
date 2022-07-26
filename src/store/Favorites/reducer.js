// Initializarea state-ului.
export const initialState = {
  products: [],
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      // Cautarea produsului adaugat in produsele care sunt in state.
      const isInList = state.products.find((product) => {
        return product.id === action.payload.id;
      });
      // Daca produsul este deja in state, se returneaza state-ul.
      if (isInList) {
        return state;
      } else {
        // Daca produsul nu este in state, se adauga la inceputul listei de produse.
        const newState = {
          products: [action.payload, ...state.products],
        };
        return newState;
      }
    }
    case "REMOVE_FROM_FAVORITES": {
      // Filtrarea produselor din state, eliminandu-l pe cel care are id-ul venit din payload.
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload;
      });
      const newState = {
        products: filteredProducts,
      };
      return newState;
    }
    // Returnarea state-ul pe cazul default.
    default: {
      return state;
    }
  }
}
