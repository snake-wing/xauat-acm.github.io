import { ref, computed } from 'vue'

// 修复问题5：使用全局响应式 store 存放文章数据
// 由各 .md 页面通过 import { data as posts } from './posts.data' 获取后调用 setPosts() 注入
// 侧边栏组件通过 usePosts() 读取

interface PostData {
  title: string
  url: string
  date: string
  category: string
  tags: string[]
  excerpt?: string
}

const postsRef = ref<PostData[]>([])

export function setPosts(posts: PostData[]) {
  postsRef.value = posts
}

export function usePosts() {
  return computed(() => postsRef.value)
}
