export default function getSeoProperties ({title, description}) {
  return {
    title,
    description,
    meta: [
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: description
      }
    ]
  }
}
