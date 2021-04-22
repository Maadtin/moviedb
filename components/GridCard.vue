<template>
  <CBox pos="relative" border="1px" borderColor="rgba(255, 255, 255, 0.3)" v-bind="$attrs">
    <CImage :src="image" />
    <CBox pos="absolute" textAlign="center" bottom="0" left="0" p="10px" w="full" boxShadow="inset 0px -25px 25px -5px #000">
      <CText v-if="title" color="white">{{ title }}</CText>
      <CText v-if="subtitle" fontSize="13px" color="white">as: {{ subtitle }}</CText>
    </CBox>
  </CBox>
</template>

<script>

import { CBox, CImage, CText } from '@chakra-ui/vue'

export default {
  name: "GridCard",
  props: ['image', 'title', 'subtitle'],
  components: {
    CBox,
    CImage,
    CText
  }
}
</script>

<style scoped>

</style>
