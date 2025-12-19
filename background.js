chrome.action.onClicked.addListener((tab) => {
    if (!tab || !tab.id) return;
    const url = tab.url || '';

    // Only message normal http/https pages
    if (!/^https?:\/\//.test(url)) return;

    chrome.tabs.sendMessage(tab.id, { action: 'toggleToolbar' }, (response) => {
        if (chrome.runtime.lastError) {
            // content script not present in this tab
            console.warn('toggleToolbar: no receiver in tab', tab.id, chrome.runtime.lastError.message);
        }
    });
});
