<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)
const router = useRouter()
const messageStore = useMessageStore()

const handleEdit = () => {
  // 设置数据已更新的flash消息
  messageStore.updateMessage(`Event "${props.event.title}" has been updated successfully`)
  // 3秒后重置消息
  setTimeout(() => {
    messageStore.resetMessage()
  }, 3000)
  // 跳转到详细信息页面
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>
<template>
  <div>
    <p>Edit event here</p>
    <button @click="handleEdit">Save Changes</button>
  </div>
</template>