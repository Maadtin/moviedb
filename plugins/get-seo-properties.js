import getSeoProperties from "../utils/getSeoProperties";

export default function (ctx, inject) {
  inject('getSeoProperties', getSeoProperties);
}
