import {createWebHashHistory, createRouter} from "vue-router";
import GameMatcher from "./GameMatcher";

// router의 path와 path연결될 컴포넌트를 설정해준다.
const routes = [
    { path: "/game/:name", component: GameMatcher },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;