


import ReactDOM,{render} from "react-dom"
import IndexViews from "./views";

const routerEle = document.getElementById("app");

import {Provider} from "react-redux" // react--redux 插件

import store from "./store"

const hotRender = () => {
    render(
        <Provider store={store}>
            <IndexViews/>
        </Provider>,
        routerEle
    )
}

hotRender();
