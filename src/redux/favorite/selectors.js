export const selectFavorites = (state) => state.favorites || [];

export const selectIsFavorite = (id) => (state) =>
  state.favorites.some((item) => item.id === id);
