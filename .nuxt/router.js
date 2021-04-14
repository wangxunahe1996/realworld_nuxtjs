import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _499f1c51 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _610933c6 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _7f54e53c = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _4b62e53c = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _00c32f8a = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _3dd04294 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _7dce5ea2 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _499f1c51,
    children: [{
      path: "",
      component: _610933c6,
      name: "home"
    }, {
      path: "/login",
      component: _7f54e53c,
      name: "login"
    }, {
      path: "/register",
      component: _7f54e53c,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _4b62e53c,
      name: "profile"
    }, {
      path: "/settings",
      component: _00c32f8a,
      name: "settings"
    }, {
      path: "/editor/:slug",
      component: _3dd04294,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _7dce5ea2,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
