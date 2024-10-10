import isEmpty from "lodash/isEmpty";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== "/" && !to.path.endsWith("/") && isEmpty(to.query)) {
    const { path, query, hash } = to;
    const nextRoute = { path: path + "/", query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
