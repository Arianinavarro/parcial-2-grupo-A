<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --primary-color: #fce4ec; 
  --secondary-color: #680a47; 
  --text-color: #131111;
  --background-color: #ebe6f9; 
  --border-color: #88158f;
  --card-background: #f2d7ec;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}
</style>