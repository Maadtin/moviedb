<template>
  <CBox w="95%" maxW="1200px" mx="auto" pt="50px">
    <CStack isInline justify="space-between" mb="20px">
      <CButton leftIcon="chevron-left" as="nuxt-link" :to="`/categories/${movie.genres[0].id}`" variantColor="vue">Go back to {{ movie.genres[0].name }} movies</CButton>
      <CButton bg="#fedd5f" color="#714000" _hover="#714000" @click="handleManageInCart">
        {{ isAdded ? 'Remove from cart' : 'Add to card'  }}
      </CButton>
    </CStack>
    <CFlex :flexDirection="['column', null, 'row']">
      <CBox :w="['full', '300px', '600px']" borderRadius="md" :mr="[null, '15px']">
        <CImage :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
      </CBox>
      <CBox color="white">
        <CHeading :mt="['10px', null, '0']" mb="10px">{{ movie.title }}</CHeading>
        <CText>
          {{ movie.release_date }}
        </CText>
        <CText>
          {{ movie.overview }}
        </CText>
        <CStack isInline mt="10px">
          <CBadge v-for="genre in movie.genres" variantColor="vue">
            {{ genre.name }}
          </CBadge>
        </CStack>
      </CBox>
    </CFlex>
  </CBox>
</template>

<script>

import {CBox, CStack, CFlex, CButton, CImage, CSimpleGrid, CHeading, CBadge, CText, CLink} from '@chakra-ui/vue'

export default {
  name: "MovieDetail",
  components: {
    CBox,
    CFlex,
    CButton,
    CImage,
    CStack,
    CSimpleGrid,
    CHeading,
    CBadge,
    CText,
    CLink
  },
  methods: {
    handleManageInCart () {
      if (this.isAdded) {
        this.$store.commit('cart/removeMovie', this.movie.id);
      } else {
        this.$store.commit('cart/addMovie', this.movie);
      }
    }
  },
  computed: {
    isAdded () {
      return this.$store.state.cart.movies.find(movie => movie.id === this.movie.id);
    }
  },
  async asyncData({$axios, params}) {
    const response = await $axios.$get(`/movie/${params.id}`, {
      params: {
        api_key: '66b8dde58cb99f13da4cc65cc00e7229',
      }
    });
    return {
      movie: response
    }
  }
}
</script>

<style scoped>

</style>
