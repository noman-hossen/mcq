declare module 'vue-router/auto' {
  export * from 'vue-router'
}
declare module 'vue-router/auto-routes' {
  import { RouteRecordRaw } from 'vue-router'
  export const routes: RouteRecordRaw[]
}
