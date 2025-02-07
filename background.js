let refreshIntervals = {}; // Store interval timers by tab ID

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startRefresh") {
    const { tabId, interval } = message;

    if (refreshIntervals[tabId]) {
      clearInterval(refreshIntervals[tabId]); // Clear any existing interval
    }

    refreshIntervals[tabId] = setInterval(() => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => location.reload()
      });
    }, interval);

    console.log(`Auto-refresh started for tab ${tabId} with interval ${interval}ms`);
  } else if (message.action === "stopRefresh") {
    const { tabId } = message;

    if (refreshIntervals[tabId]) {
      clearInterval(refreshIntervals[tabId]);
      delete refreshIntervals[tabId];
    }

    console.log(`Auto-refresh stopped for tab ${tabId}`);
  }
});
