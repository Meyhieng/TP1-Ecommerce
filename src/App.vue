<template>
  <div id="Homeview">
    <Header/>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>