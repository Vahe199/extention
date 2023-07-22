import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./contentScript";


function init() {
    const appContainer = document.createElement('div')
    appContainer.id = "_content"
    document.body.appendChild(appContainer)
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(appContainer)
    // console.log(appContainer)
    root.render(<ContentScript />);
}
// Function to remove the target div element
function removeTarget() {
    const targetDiv = document.getElementById('_content'); // Replace 'your-div-id' with the actual id of the div you want to remove

    if (targetDiv) {
        targetDiv.remove();
    }
}
// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "toggleState") {
        const isActive = message.isActive;
        console.log("Content script activated with isActive = " + isActive);
        if(isActive==true){
            init();
        }else {
            removeTarget()
        }

        // Your actions based on the state change go here
    }
});


// chrome.runtime.sendMessage('I am loading content script', (response) => {
//     console.log(response);
//     console.log('I am content script')
//
// })
//
// window.onload = (event) => {
//     console.log('page is fully loaded');
// };