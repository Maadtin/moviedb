export default function ($axios) {
  return {
    list () {
      return $axios.$get('/genre/movie/list', {
        params: {
          api_key: '66b8dde58cb99f13da4cc65cc00e7229'
        }
      });
    }
  }
}
