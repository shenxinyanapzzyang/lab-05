<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import type { Event } from '@/types'
import EventService from '@/services/EventService'

const event = ref<Event | null>(null)
const route = useRoute()
const props = defineProps({
  id: {
    type: String,
    required: false // 设置为可选，允许从路由参数获取
  }
})

onMounted(() => {
  // 优先使用props中的id，如果没有则从路由参数获取
  const eventId = props.id || route.params.id as string
  EventService.getEvent(parseInt(eventId))
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
  <div v-else>
    <p>Loading event details...</p>
  </div>
</template>
