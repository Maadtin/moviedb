<template>
    <CBox>
      <CHeading mb="30px" color="white">Search movie by category</CHeading>
      <CList>
        <CListItem v-for="category in categories">
          <CLink fontSize="xl" color="white" @click="handleCategoryClick(category)">
            {{ category.name }}
          </CLink>
        </CListItem>
      </CList>
    </CBox>
</template>

<script lang="js">

import {CBox, CList, CListItem, CLink, CHeading} from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    CBox,
    CList,
    CListItem,
    CLink,
    CHeading
  },
  methods: {
    handleCategoryClick (category) {
      this.$store.commit('categories/setSelectedCategory', category);
      this.$router.push({
        name: 'categories-id',
        params: {
          id: category.id
        }
      })
    }
  },
  async asyncData({app}) {
    console.log({app})
    const categories = await app.$categoriesRepository.list();
    return {
      categories: categories.genres
    }
  }
}
</script>
