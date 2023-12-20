import { createWebHistory, createRouter } from 'vue-router';
// 404
import NotFound from '@/views/NotFound.vue';

// Routing sections
import endorserRoutes from './endorserRoutes';

import { useTokenStore } from '../store';

const routes = [
  { path: '/:pathMatch(.*)', component: NotFound },
  ...endorserRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Global router middleware for logout and refresh handling.
 */
router.beforeEach((to, from, next) => {
  const logoutPath = getLogoutPath(to);
  if (logoutPath) return next(logoutPath);
  else resetLoginDataOnRefresh(to.path, from.path);
  next();
});

const getLogoutPath = (to: any) => {
  if (to.path === '/logout') {
    removeLoginData();
    return '/';
  }
};

const resetLoginDataOnRefresh = (toPath: string, fromPath: string) => {
  if (fromPath !== '/') return;
  const token = localStorage.getItem('token');
  if (token) setLocalStorage(token);
};

const removeLoginData = () => {
  useTokenStore().clearToken();
};

const setLocalStorage = (token: string) => {
  useTokenStore().setToken(token);
};

export default router;
