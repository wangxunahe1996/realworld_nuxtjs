import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0b8c214a = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _8395ba02 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _08a78549 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _56022789 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _08fa4b7a = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _008570e6 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _3ccc6ad6 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _0b8c214a,
    children: [{
      path: "",
      component: _8395ba02,
      name: "home"
    }, {
      path: "/login",
      component: _08a78549,
      name: "login"
    }, {
      path: "/register",
      component: _08a78549,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _56022789,
      name: "profile"
    }, {
      path: "/settings",
      component: _08fa4b7a,
      name: "settings"
    }, {
      path: "/editor/:slug",
      component: _008570e6,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _3ccc6ad6,
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
