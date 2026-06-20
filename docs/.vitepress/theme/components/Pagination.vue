<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['page-change'])

const pages = computed(() => {
  const result = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i)
  } else {
    result.push(1)
    if (current > 3) result.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      result.push(i)
    }
    if (current < total - 2) result.push('...')
    result.push(total)
  }
  return result
})

function go(page) {
  if (page === '...' || page < 1 || page > props.totalPages) return
  emit('page-change', page)
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button class="page-btn" :disabled="currentPage === 1" @click="go(currentPage - 1)">‹</button>
    <button
      v-for="page in pages"
      :key="page"
      class="page-btn"
      :class="{ active: page === currentPage, dots: page === '...' }"
      :disabled="page === '...'"
      @click="go(page)"
    >{{ page }}</button>
    <button class="page-btn" :disabled="currentPage === totalPages" @click="go(currentPage + 1)">›</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  margin-top: 2rem;
  padding: 1rem 0;
}

.page-btn {
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0 0.5rem;
}

.page-btn:hover:not(:disabled):not(.dots) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.page-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
  font-weight: 600;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.page-btn.dots {
  border: none;
  cursor: default;
  background: transparent;
}

.page-btn.dots:hover {
  background: transparent;
}
</style>
