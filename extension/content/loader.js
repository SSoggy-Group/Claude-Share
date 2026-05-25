(async () => {
    try {
        await import(chrome.runtime.getURL('content/main.js'));
    } catch (e) {
        console.error('[AI-Chat-Export] Failed to load main module:', e);
    }
})();
