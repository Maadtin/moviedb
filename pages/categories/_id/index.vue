<template>
  <CBox>
    <CStack isInline justify="space-between">
      <CButton leftIcon="chevron-left" as="nuxt-link" to="/" mb="20px" variantColor="vue">Go back to categories</CButton>
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
      <CLink v-for="movie in searchableMovies" pos="relative" d="block" border="1px" borderColor="rgba(255, 255, 255, 0.3)" as="nuxt-link" :to="`/movies/${movie.id}`">
        <CImage :src="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`" />
        <CBox pos="absolute" bottom="0" left="0" p="10px" w="full" boxShadow="inset 0px -25px 25px -5px #000">
          <CText color="white" textAlign="center">{{ movie.original_title }}</CText>
        </CBox>
      </CLink>
    </CSimpleGrid>
    <infinite-loading direction="bottom" @infinite="fetchMovies"></infinite-loading>
  </CBox>
</template>

<script>

import getSeoProperties from "../../../utils/getSeoProperties";
import Fuse from 'fuse.js'
import {CBox, CSimpleGrid, CStack, CButton, CImage, CHeading, CText, CLink, CIcon, CInput, CInputGroup, CInputLeftElement} from '@chakra-ui/vue'

export default {
  name: "MoviesByCategory",
  components: {
    CBox,
    CSimpleGrid,
    CStack,
    CButton,
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
      this.$axios.$get('/discover/movie', {
        params: {
          api_key: '66b8dde58cb99f13da4cc65cc00e7229',
          with_genres: this.$route.params.id,
          page: this.page,
        }
      })
      .then(response => {
        if (response.results.length) {
          this.page += 1;
          this.searchableMovies.push(...response.results)
          $state.loaded();
        } else {
          $state.complete();
        }
      })
    }
  },
  head () {
    return getSeoProperties({
      title: `${this.genre.name} movies`,
      description: `Search movies about the ${this.genre.name} genre.`
    })
  },
  async asyncData({$axios, params}) {
    const categories = await $axios.$get('/genre/movie/list', {
      params: {
        api_key: '66b8dde58cb99f13da4cc65cc00e7229'
      }
    });
    return {
      genre: categories.genres.find(genre => genre.id == params.id)
    }
  }
}
</script>

<style scoped>

</style>
