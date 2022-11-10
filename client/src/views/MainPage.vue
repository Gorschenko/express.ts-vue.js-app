<template>
  <section>
    <DefaultAccordion
      v-model="isOpened"
      size="xs"
      button-class="CE-mb-16 CE-pr-16 CE-pl-16"
      title="Simple title"
    >
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus magni sed, assumenda facere iusto mollitia odit non, accusamus tempore velit doloribus quaerat, molestiae placeat perferendis maiores minima ratione repellendus fuga id? Quos nisi rerum quisquam quidem enim laudantium itaque? Aspernatur itaque soluta quasi nisi eius id ratione ea voluptas repudiandae minus, deleniti harum iure dolor officiis repellat ex distinctio illum dolore vero. Perspiciatis qui nisi sequi deserunt in eum voluptatibus nemo, repudiandae cupiditate sapiente tempore fugiat dolores, voluptas omnis corrupti ex culpa aspernatur nulla. Explicabo, accusamus dicta. Qui molestias ipsum tempora ab eos neque velit, earum sequi voluptatibus, officiis distinctio!</p>
    </DefaultAccordion>
  </section>
</template>
<script>
import DefaultAccordion from '@/components/base/DefaultAccordion'
import { ref } from 'vue'

export default {
  name: 'MainPage',
  components: {
    DefaultAccordion,
  },
  setup () {
    const isOpened = ref(false)
  
    return {
      isOpened
    }
  }
}
</script>
