<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-summary">
    <div class="category">{{ event.category }}</div>
    <div class="organizer">{{ event.organizer }}</div>
  </div>
</template>

<style scoped>
.event-summary {
  text-align: right;
  margin: 10px 0;
}

.category,
.organizer {
  font-size: 16px;
  margin: 5px 0;
}
</style>