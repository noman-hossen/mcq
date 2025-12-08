import { createRouter, createWebHistory } from 'vue-router/auto'
// 1. Import the routes array from the virtual file created by the plugin
import { routes } from 'vue-router/auto-routes'

// 2. Define the manual redirect route
const manualRoutes = [
  {
    // The path the user types
    path: '/landing',
    // The destination path. This redirects /landing to /
    redirect: '/',
  },
]

// 3. Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // Combine the manual redirect route with the auto-generated routes
  routes: [
    ...manualRoutes, // Place manual redirects first
    ...routes, // Then include the automatically generated file-based routes
  ],

  // Optional: Scroll behavior configuration for a smooth user experience
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
