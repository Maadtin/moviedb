export function state () {
  return {
    movies: []
  }
}

export const mutations = {
  addMovie (state, movie) {
    state.movies.push({
      id: movie.id,
      title: movie.original_title,
      poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    });
  },
  removeMovie (state, movieId) {
    state.movies = state.movies.filter(movie => movie.id !== movieId);
  }
}
