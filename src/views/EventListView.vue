<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventSummary from '@/components/EventSummary.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, defineProps, watchEffect } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import EventService from '@/services/EventService'

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})

const page = computed(() => props.page)
const pageSize = computed(() => props.pageSize)
const router = useRouter()
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const changePageSize = (newSize: number) => {
  router.push({
    name: 'event-list-view',
    query: { page: '1', pageSize: newSize.toString() }
  })
}

const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
        .then((response) => {
          // 使用类型断言确保类型安全
          const typedResponse = response as { data: Event[]; headers: { [key: string]: string } }
          events.value = typedResponse.data
            totalEvents.value = Number(typedResponse.headers['x-total-count'] || '0')
        })
        .catch((error: Error) => {
          console.error('There was an error!', error)
        })
  })
})
</script>

<template>
  <div class="flex flex-col items-center mb-5">
    <h1 class="text-3xl">Events For Good</h1>
    <div class="mt-3">
      <label for="pageSize" class="text-lg">Page Size:</label>
      <select 
        id="pageSize" 
        :value="pageSize" 
        @change="(e) => changePageSize(parseInt((e.target as HTMLSelectElement).value))"
        class="ml-2 px-3 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
      >
        <option value="1">1 event per page</option>
        <option value="2">2 events per page</option>
        <option value="3">3 events per page</option>
        <option value="5">5 events per page</option>
      </select>
    </div>
  </div>
  <!-- new element -->
  <!-- Implementing vertical centering layout using Tailwind CSS classes -->
  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <EventSummary v-for="event in events" :key="`summary-${event.id}`" :event="event" />
    <div class="flex w-[290px]">
      <RouterLink 
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }" 
        rel="prev" 
        v-if="page != 1" 
        class="flex-1 text-left text-gray-700 hover:text-green-500 no-underline text-lg"
        >&#60; Prev Page</RouterLink 
      >

      <RouterLink 
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }" 
        rel="next" 
        v-if="hasNexPage"
        class="flex-1 text-right text-gray-700 hover:text-green-500 no-underline text-lg"
        >Next Page &#62;</RouterLink 
      >
    </div>
  </div>
</template>

<style scoped>
/* 所有样式现在都通过Tailwind CSS类实现 */
</style>
