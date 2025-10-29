<template>
  <div class="student-card">
    <div class="student-image">
      <img :src="student.image" :alt="`${student.name} ${student.surname}`" />
    </div>
    <div class="student-info">
      <h3 class="student-name">{{ student.name }} {{ student.surname }}</h3>
      <p class="student-id">ID: {{ student.studentId }}</p>
      <div class="student-gpa">
        <span class="gpa-label">GPA:</span>
        <span class="gpa-value" :class="getGpaClass(student.gpa)">{{ student.gpa }}</span>
      </div>
      <p class="student-description">{{ student.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Student } from '@/types'

defineProps<{
  student: Student
}>()

const getGpaClass = (gpa: number) => {
  if (gpa >= 3.5) return 'gpa-excellent'
  if (gpa >= 3.0) return 'gpa-good'
  if (gpa >= 2.5) return 'gpa-average'
  return 'gpa-poor'
}
</script>

<style scoped>
.student-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  max-width: 300px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.student-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.student-image {
  text-align: center;
  margin-bottom: 15px;
}

.student-image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e0e0e0;
}

.student-info {
  text-align: center;
}

.student-name {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
}

.student-id {
  font-size: 0.9em;
  color: #666;
  margin: 0 0 10px 0;
}

.student-gpa {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
}

.gpa-label {
  font-weight: bold;
  color: #555;
}

.gpa-value {
  font-weight: bold;
  font-size: 1.1em;
  padding: 4px 8px;
  border-radius: 6px;
}

.gpa-excellent {
  background-color: #d4edda;
  color: #155724;
}

.gpa-good {
  background-color: #d1ecf1;
  color: #0c5460;
}

.gpa-average {
  background-color: #fff3cd;
  color: #856404;
}

.gpa-poor {
  background-color: #f8d7da;
  color: #721c24;
}

.student-description {
  font-size: 0.9em;
  color: #666;
  font-style: italic;
  margin: 10px 0 0 0;
  line-height: 1.4;
}
</style>