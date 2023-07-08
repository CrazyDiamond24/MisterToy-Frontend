<template>
    <header class="app-header">
      <div class="app-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Toys_%22R%22_Us_logo.svg/675px-Toys_%22R%22_Us_logo.svg.png" alt="Toys R Us logo">
      </div>
      <div class="app-nav">
        <AppNav />
      </div>
    </header>
  </template>

<script>
import AppNav from './AppNav.vue';
export default {
 name: 'AppHeader',
 components: {
  AppNav
 }
}
</script>

<style></style>