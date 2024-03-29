<template>
  <CBox w="95%" maxW="1200px" mx="auto" pt="50px">
    <CStack isInline justify="space-between" mb="20px">
      <CIconButton icon="chevron-left" as="nuxt-link" :to="`/categories/${movie.genres[0].id}`" variantColor="vue" />
      <CButton bg="#fedd5f" color="#714000" _hover="#714000" @click="handleManageInCart">
        {{ isAdded ? 'Remove from cart' : 'Add to card'  }}
      </CButton>
    </CStack>
    <CFlex :flexDirection="['column', null, 'row']">
      <CBox :w="['full', '300px', '600px']" borderRadius="md" :mr="[null, '15px']">
        <CImage :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
      </CBox>
      <CBox color="white">
        <CHeading :mt="['10px', null, '0']" mb="10px">{{ movie.title }} ({{ movie.release_date | getDateYear }})</CHeading>
        <CHeading fontSize="xl" as="h3" mb="5px">
          User score: {{ movie.vote_average }}
        </CHeading>
        <CDivider borderColor="vue.50" />
        <CText>
        </CText>
        <CText>
          {{ movie.overview }}
        </CText>
        <CStack isInline mt="10px">
          <CBadge v-for="genre in movie.genres" variantColor="vue">
            <NuxtLink :to="`/categories/${genre.id}`">
              {{ genre.name }}
            </NuxtLink>
          </CBadge>
        </CStack>
      </CBox>
    </CFlex>

    <CStack mt="20px" color="white">
      <CHeading as="h2">Series Cast</CHeading>
      <CSimpleGrid :columns="[2, 4 , 6]" :spacing="['5px', null, '10px']">
        <GridCard
          v-for="person in cast"
          :image="`https://image.tmdb.org/t/p/w500/${person.profile_path}`"
          :title="person.original_name"
          :subtitle="person.character"
        />
      </CSimpleGrid>
    </CStack>
  </CBox>
</template>

<script>

import {CBox, CStack, CFlex, CButton, CIconButton, CImage, CSimpleGrid, CHeading, CBadge, CText, CLink, CDivider} from '@chakra-ui/vue'
import GridCard from "../../../components/GridCard";

export default {
  name: "MovieDetail",
  components: {
    GridCard,
    CBox,
    CFlex,
    CButton,
    CIconButton,
    CImage,
    CStack,
    CSimpleGrid,
    CHeading,
    CBadge,
    CText,
    CLink,
    CDivider
  },
  filters: {
    getDateYear (value) {
      const parts = value.split('-');
      return parts[0]
    }
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
  head () {
    return this.$getSeoProperties({
      title: this.movie.original_title,
      description: this.movie.overview
    })
  },
  async asyncData({app, params}) {
    const movieRequest = await app.$moviesRepository.find(params.id);
    const creditsRequest = await app.$moviesRepository.getCast(params.id);

    return {
      movie: movieRequest,
      cast: creditsRequest.cast?.filter(person => person.profile_path)
    }
  }
}
</script>

<style scoped>

</style>
