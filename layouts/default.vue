<template>
  <CThemeProvider>
    <CReset/>
    <CBox bg="#032541" minH="100vh">
      <CBox w="95%" maxW="1200px" mx="auto">
        <Navigation />
        <CBox py="50px">
          <Nuxt/>
        </CBox>
      </CBox>
    </CBox>
  </CThemeProvider>
</template>
<script>

import Navigation from "../components/Navigation";
import {
  CThemeProvider,
  CReset,
  CBox
} from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    Navigation,
    CThemeProvider,
    CReset,
    CBox
  }
}
</script>
