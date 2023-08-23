console.log('This is the background page.');
console.log('Put the background scripts here.');

// Create the context menu item when the background script is executed
createContextMenu();

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "ethereumAddressMenuItem") {
        const ethereumAddress = extractEthereumAddress(info.linkUrl);
        console.log("link: ", info.linkUrl);
        console.log("ethereumAddress", ethereumAddress);

        try {
            if (ethereumAddress) {
                // Create a new tab with the popup URL and pass the Ethereum address as a query parameter
                chrome.tabs.create({
                    url: `popup.html?ethereumAddress=${encodeURIComponent(ethereumAddress)}`,
                });
            }
        } catch (error) {
            console.log("Error\n: ", error);
        }
    }
});

// Function to create the context menu item
function createContextMenu() {
    chrome.contextMenus.create({
        id: "ethereumAddressMenuItem",
        title: "Open Link3 Popup Window",
        contexts: ["link"],
    });
}

// Function to extract Ethereum address from a URL
function extractEthereumAddress(url) {
    const ethereumAddressRegex = /[xX][dD][cC][a-fA-F0-9]{40}/; // ethereum starts with 0x. xdc starts with xdc
    const match = url.match(ethereumAddressRegex);
    if (match) {
        return match[0];
    } else {
        return null;
    }
}
