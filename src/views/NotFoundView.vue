<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page'
  }
)
</script>

<template>
  <div class="not-found-container">
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <router-link :to="{ name: 'event-list-view' }">Back to the home page</router-link>
  </div>
</template>

<style scoped>
.not-found-container {
  max-width: 600px;
  margin: 60px auto;
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 3rem;
  color: #dc3545;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.5rem;
  color: #495057;
  margin-bottom: 30px;
}

router-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

router-link:hover {
  background-color: #0056b3;
}
</style>