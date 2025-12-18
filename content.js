(function () {
    const toolbar = document.getElementById('wpadminbar');
    const html = document.getElementsByTagName('html')[0];

    const currentUrl = window.location.href;

    // Load saved state for this URL
    if (toolbar) {
        chrome.storage.local.get([currentUrl], (result) => {
            const isHidden = result[currentUrl] === false;
            if (isHidden) {
                toolbar.style.display = 'none';
                html.setAttribute('style', 'margin-top:0px !important');
            } else {
                if (toolbar.style.display === 'none') {
                    toolbar.style.display = 'none';
                    html.setAttribute('style', 'margin-top:0px !important');
                } else {
                    toolbar.style.display = '';
                    html.setAttribute('style', 'margin-top: 32px !important;');
                }
            }
        });
    }

    // Listen for toggle messages from popup or background
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'toggleToolbar') {
            if (!toolbar) {
                sendResponse({ success: false, reason: 'no-toolbar' });
                return;
            }

            if (toolbar.style.display === 'none') {
                toolbar.style.display = '';
                html.setAttribute('style', 'margin-top: 32px !important');
                chrome.storage.local.set({ [currentUrl]: true });
            } else {
                toolbar.style.display = 'none';
                html.setAttribute('style', 'margin-top:0px !important');
                chrome.storage.local.set({ [currentUrl]: false });
            }

            sendResponse({ success: true });
        }
    });
})();


