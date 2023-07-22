// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     console.log(msg);
//     console.log(sender);
//     sendResponse("Front the background Script");
// })


let isActive = false; // Initial state of the extension icon

chrome.action.onClicked.addListener(function (tab) {
    isActive = !isActive; // Toggle the state on each click

    const iconPath = isActive
        ? {
            "16": "icon_16active.png",
            "32": "icon_32active.png",
            "48": "icon_48active.png",
            "128": "icon_128active.png"
        }
        : {
            "16": "icon_16.png",
            "32": "icon_32.png",
            "48": "icon_48.png",
            "128": "icon_128.png"
        };

    // Set the new icon based on the current state
    chrome.action.setIcon({ path: iconPath });

    // Send a message to the content script to perform actions
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, { action: "toggleState", isActive: isActive });
    });
});