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
          events.value = response.data
          totalEvents.value = response.headers['x-total-count']
        })
        .catch((error) => {
          console.error('There was an error!', error)
        })
  })
})
</script>

<template>
  <div class="header-controls">
    <h1>Events For Good</h1>
    <div class="page-size-selector">
      <label for="pageSize">Page Size:</label>
      <select 
        id="pageSize" 
        :value="pageSize" 
        @change="(e) => changePageSize(parseInt((e.target as HTMLSelectElement).value))"
      >
        <option value="1">1 event per page</option>
        <option value="2">2 events per page</option>
        <option value="3">3 events per page</option>
        <option value="5">5 events per page</option>
      </select>
    </div>
  </div>
  <!-- new element -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <EventSummary v-for="event in events" :key="`summary-${event.id}`" :event="event" />
    <div class="pagination">
      <RouterLink 
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }" 
        rel="prev" 
        v-if="page != 1" 
        >&#60; Prev Page</RouterLink 
      >

      <RouterLink 
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }" 
        rel="next" 
        v-if="hasNexPage"
        >Next Page &#62;</RouterLink 
      >
    </div>
  </div>
</template>

<style scoped>
.header-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.page-size-selector {
  margin-top: 10px;
}

.page-size-selector select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 5px;
}

.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
