<template>
  <section>
    Info
    {{ course }}
  </section>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getCourses } from '@/api/courses.api'

export default {
  name: 'CoursesInfo',
  setup () {
    const route = useRoute()

    const course = ref({})
    const init = async () => {
      try {
        const courses = await getCourses(route.params.id)
        // course.value = courses.find(c => c._id === route.params.id)
      } catch (e) {}
    }
    init()

    return {
      course
    }
  }
}
</script>