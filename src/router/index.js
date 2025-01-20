import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import CreateEvent from "../views/CreateEvent.vue";
import Events from "../views/Events.vue";
import Admins from "../views/Admins.vue";
import VirtualReality from "../views/VirtualReality.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Articles from "../views/Articles.vue";
import CreateArticle from "../views/CreateArticle.vue"
import Archives from "../views/Archives.vue"
import CreateArchive from "../views/CreateArchive.vue"
import Artists from "../views/Artists.vue";
import CreateArtist from "../views/CreateArtist.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/events",
    name: "Events",
    component: Events,
  },
  {
    path: "/event/:id",
    name: "CreateEvent",
    component: CreateEvent,
  },
  {
    path: "/admins",
    name: "Admins",
    component: Admins,
  },
  {
    path: "/articles",
    name: "Articles",
    component: Articles,
  },
  {
    path: "/article/:id",
    name: "CreateArticle",
    component: CreateArticle,
  },
  {
    path: "/archives",
    name: "Archives",
    component: Archives,
  },
  {
    path: "/archive/:id",
    name: "CreateArchive",
    component: CreateArchive,
  },
  {
    path: "/artists",
    name: "Artists",
    component: Artists,
  },
  {
    path: "/artist/:id",
    name: "CreateArtist",
    component: CreateArtist,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('jodoSafePlace') || false

  // Se a rota for diferente de /signin e não houver token, redireciona para /signin
  if (to.path !== '/signin' && !token) {
    next('/signin'); // Redireciona para a página de login
  } else {
    next(); // Caso contrário, permite a navegação
  }
});

export default router;
