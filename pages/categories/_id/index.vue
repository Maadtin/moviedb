<template>
  <CBox>
    <CStack isInline justify="space-between">
      <CIconButton icon="chevron-left" as="nuxt-link" to="/" mb="20px" variantColor="vue" />
      <CInput
        v-model="search"
        w="fit-content"
        color="white"
        border="1px solid rgba(255, 255, 255, 0.3)"
        bg="transparent"
        placeholder="Search movies..."
      />
    </CStack>
    <CHeading v-if="genre" color="white" mb="20px">{{  genre.name  }} Movies</CHeading>
    <CSimpleGrid :columns="[2, 3 , 5]" :spacing="['5px', null, '10px']">
      <GridCard
        v-for="movie in searchableMovies"
        :image="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`"
        :title="movie.original_title"
        as="nuxt-link"
        :to="`/movies/${movie.id}`"
      />
    </CSimpleGrid>
    <infinite-loading @infinite="fetchMovies"></infinite-loading>
  </CBox>
</template>

<script>

import Fuse from 'fuse.js'
import {CBox, CSimpleGrid, CStack, CButton, CIconButton, CImage, CHeading, CText, CLink, CIcon, CInput, CInputGroup, CInputLeftElement} from '@chakra-ui/vue'
import GridCard from "../../../components/GridCard";

export default {
  name: "MoviesByCategory",
  components: {
    GridCard,
    CBox,
    CSimpleGrid,
    CStack,
    CButton,
    CIconButton,
    CImage,
    CHeading,
    CText,
    CLink,
    CIcon,
    CInput,
    CInputGroup,
    CInputLeftElement
  },
  data () {
    return {
      search: '',
      movies: [],
      page: 1
    }
  },
  computed: {
    searchableMovies () {
      if (this.search) {
        const fuse = new Fuse(this.movies, {
          keys: ['original_title', 'overview'],
          threshold: 0.4,
        })
        return fuse.search(this.search).map(r => r.item);
      }
      return this.movies;
    }
  },
  methods: {
    fetchMovies ($state) {
      this.$moviesRepository.listByCategory({
        category: this.$route.params.id,
        page: this.page
      })
        .then(response => {
          if (response.results.length) {
            this.page += 1;
            this.searchableMovies.push(...response.results.filter(movie => movie.poster_path))
            $state.loaded();
          } else {
            $state.complete();
          }
        })
    }
  },
  head () {
    return this.$getSeoProperties({
      title: `${this.genre.name} movies`,
      description: `Search movies about the ${this.genre.name} genre.`
    })
  },
  async asyncData({app, params}) {
    const categories = await app.$categoriesRepository.list();
    return {
      genre: categories.genres.find(genre => genre.id == params.id)
    }
  }
}
</script>

<style scoped>

</style>
