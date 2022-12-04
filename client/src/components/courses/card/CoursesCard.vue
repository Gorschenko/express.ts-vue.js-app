<template>
  <article class="card">
    <header class="flex-row-between flex-wrap flex-gap-8">
      <i
        :class="[
          'bx bxs-star icon_24 color_neutral tr-primary color_hovered_yellow',
        ]"
        @click="$emit('update-favorite')"
      />
      <h1 class="text_l text_weight_accent">{{ course.title }}</h1>
      <DefaultButton
        icon="bx-x"
        form="round"
        color="danger"
        size="xs"
        @action="$emit('delete')"
      />
    </header>
    <div>
      <img
        class="courses-catalog__item-image mb-8"
        :src="course.image"
      >
      <p class="text_s text_weight_head mb-8">{{ course.price }} руб.</p>
      <DefaultButton
        title="Редактировать"
        color="transparent"
        :without-paddings="true"
        @action="$emit('edit')"
      />
    </div>
    <FooterCard
      :course-id="course._id"
      @add-to-cart="$emit('add-to-cart')"
      @delete-to-cart="$emit('delete-to-cart')"
    />
  </article>
</template>
<script>
import DefaultButton from '@/components/base/DefaultButton'
import FooterCard from '@/components/courses/card/FooterCard'

export default {
  name: 'CoursesCard',
  emits: [
    'edit',
    'delete',
    'delete-to-cart',
    'add-to-cart',
    'update-favorite'
  ],
  components: {
    DefaultButton,
    FooterCard,
  },
  props: {
    course: {
      type: Object,
      required: true,
    }
  },
}
</script>