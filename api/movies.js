export default function ($axios) {
  return {
    listByCategory ({category, page}) {
      return $axios.$get('/discover/movie', {
        params: {
          api_key: '66b8dde58cb99f13da4cc65cc00e7229',
          with_genres: category,
          page: page,
        }
      })
    },
    find (id) {
      return $axios.$get(`/movie/${id}`, {
        params: {
          api_key: '66b8dde58cb99f13da4cc65cc00e7229',
        }
      });
    },
    getCast (id) {
      return $axios.$get(`/movie/${id}/credits`, {
        params: {
          api_key: '66b8dde58cb99f13da4cc65cc00e7229',
        }
      });
    }
  }
}
