export default (state={movies: [], movie: {}, credits: [], searchTitle: '', genre: ''}, action) => {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        movies: action.data.data.results,
        searchTitle: action.data.searchTitle,
        genre: action.data.genre,
      };
    case 'DETAILS_PAGE_LOADED':
      return {
        ...state,
        movie: action.data.data,
      };
    case 'CREDITS_LOADED':
      return {
        ...state,
        credits: action.data.data.cast.slice(0,8),
      };
    default:
      return state;
  }
};
