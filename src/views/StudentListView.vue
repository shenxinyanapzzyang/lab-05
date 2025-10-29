<template>
  <div class="student-list-view">
    <h1>Student Information</h1>
    <div v-if="loading" class="loading">
      Loading students...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="students-grid">
      <StudentCard 
        v-for="student in students" 
        :key="student.id" 
        :student="student" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import type { Student } from '@/types.ts'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref<Student[]>([])
const loading = ref(true)
const error = ref('')

const replaceBlockedImageUrls = (studentsList: Student[]) => {
  const blockedUrls = [
    'https://firebasestorage.googleapis.com/v0/b/publicimage-41deb.appspot.com/o/cherprang.png?alt=media&token=e6639e24-e84c-4246-ab0e-8b7977b57f4f',
    'https://firebasestorage.googleapis.com/v0/b/publicimage-41deb.appspot.com/o/Nobita.png?alt=media&token=5ac97e03-40c4-47b0-8ad9-f5b52410fe37',
    'https://firebasestorage.googleapis.com/v0/b/publicimage-41deb.appspot.com/o/tu.jpg?alt=media&token=171d65d0-8e8d-45d2-81db-021836316e02'
  ]
  
  return studentsList.map(student => {
    if (blockedUrls.includes(student.image)) {
      // 使用picsum.photos替代被阻止的Firebase URL
      // 使用student.id作为seed以确保每个学生有一致的图片
      return {
        ...student,
        image: `https://picsum.photos/seed/${student.id}/80/80`
      }
    }
    return student
  })
}

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      // The API returns data in a different format, we need to extract the value array
      let studentsList = response.data.value || response.data
      // 替换被ORB阻止的Firebase图片URL
      students.value = replaceBlockedImageUrls(studentsList)
      loading.value = false
    })
    .catch((err) => {
      console.error('Error fetching students:', err)
      error.value = 'Failed to load student information'
      loading.value = false
    })
})
</script>

<style scoped>
.student-list-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5em;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  padding: 40px;
}

.error {
  text-align: center;
  font-size: 1.2em;
  color: #d32f2f;
  padding: 40px;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 20px 0;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
}

@media (max-width: 768px) {
  .students-grid {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: 2em;
  }
}
</style>