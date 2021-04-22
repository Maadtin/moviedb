<template>
  <CStack color="white" bg="#032541" isInline justify="space-between" py="20px" top="0" pos="sticky" zIndex="2">
    <CLink as="nuxt-link" to="/" fontSize="2xl" :_hover="{ textDecoration: 'none' }">MovieDB</CLink>
    <CPopover v-slot="{ onClose }" placement="bottom-start">
      <CPopoverTrigger>
        <CButton bg="#fedd5f" color="#714000" _hover="#714000">
          Cart
          <CBadge borderRadius="50%" ml="5px" v-if="$store.state.cart.movies.length" bg="#714000" color="white">
            {{ $store.state.cart.movies.length }}
          </CBadge>
        </CButton>
      </CPopoverTrigger>
      <CPopoverContent w="200px" bg="#193d5b">
        <CPopoverArrow />
        <CPopoverHeader>Added Movies</CPopoverHeader>
        <CPopoverBody>
          <CList spacing="10px" v-if="$store.state.cart.movies.length">
            <CListItem v-for="movie in $store.state.cart.movies">
              <CStack isInline align="flex-start">
                <CImage w="50px" :src="movie.poster" />
                <CBox>
                  <CText color="white">{{ movie.title }}</CText>
                  <CIconButton @click="handleDeleteMovieFromCart(movie.id, onClose)" size="sm" variantColor="red" icon="close" />
                </CBox>
              </CStack>
            </CListItem>
          </CList>
          <CText v-else color="white">
            You haven't added any movies to your cart.
          </CText>
        </CPopoverBody>
      </CPopoverContent>
    </CPopover>
  </CStack>
</template>

<script>

import {
  CStack,
  CBox,
  CText,
  CLink,
  CHeading,
  CButton,
  CIconButton,
  CBadge,
  CList,
  CListItem,
  CImage,
  CPopover,
  CPopoverTrigger,
  CPopoverContent,
  CPopoverHeader,
  CPopoverBody,
  CPopoverFooter,
  CPopoverArrow,
  CPopoverCloseButton,
} from '@chakra-ui/vue'

export default {
  name: "Navigation",
  components: {
    CStack,
    CBox,
    CText,
    CLink,
    CHeading,
    CButton,
    CIconButton,
    CBadge,
    CList,
    CListItem,
    CImage,
    CPopover,
    CPopoverTrigger,
    CPopoverContent,
    CPopoverHeader,
    CPopoverBody,
    CPopoverFooter,
    CPopoverArrow,
    CPopoverCloseButton,
  },
  methods: {
    handleDeleteMovieFromCart (movieId, onClose) {
      this.$store.commit('cart/removeMovie', movieId);
      if (this.$store.state.cart.movies.length === 0) {
        onClose();
      }
    }
  }
}
</script>

<style scoped>

</style>
