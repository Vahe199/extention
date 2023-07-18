import React from "react"
import {createRoot} from "react-dom/client";
import "../assets/tailwind.css";
const test = (
    <div>
        <h1 className={"text-3xl bg-green-500"}>Hello World</h1>
       <img src={"banner.png"} alt={"banner"}/>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popula</p>
    </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(test)