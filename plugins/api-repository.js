import movies from "../api/movies";
import categories from "../api/categories";

export default ({$axios}, inject) => {
  inject('categoriesRepository', categories($axios));
  inject('moviesRepository', movies($axios));
}
