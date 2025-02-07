document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const countdownDisplay = document.getElementById("countdown");

  startButton.addEventListener("click", async function() {
    const intervalInput = document.getElementById("interval").value;
    const intervalSeconds = parseInt(intervalInput, 10);
    const refreshTime = intervalSeconds * 1000;

    if (refreshTime < 5000) {
      alert("Minimum refresh time is 5 seconds.");
      return;
    }

    // Get the currently active tab
    let [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Save refresh settings and send message to background script
    chrome.storage.local.set({
      refreshTime: refreshTime,
      autoRefreshEnabled: true,
      tabId: activeTab.id
    }, function() {
      console.log("Auto-refresh enabled for tab " + activeTab.id + " with interval: " + refreshTime + " ms");
      chrome.runtime.sendMessage({ action: "startRefresh", tabId: activeTab.id, interval: refreshTime });
    });

    startCountdown(intervalSeconds);
  });

  stopButton.addEventListener("click", function() {
    chrome.storage.local.get(["tabId"], (data) => {
      if (data.tabId) {
        chrome.runtime.sendMessage({ action: "stopRefresh", tabId: data.tabId });
      }
    });

    chrome.storage.local.set({
      autoRefreshEnabled: false,
      tabId: null
    }, function() {
      console.log("Auto-refresh disabled.");
    });

    countdownDisplay.style.display = "none";
  });

  function startCountdown(seconds) {
    countdownDisplay.style.display = "block";
    let remaining = seconds;
    countdownDisplay.textContent = "Next refresh in: " + remaining + "s";

    const intervalId = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        countdownDisplay.textContent = "Refreshing...";
        clearInterval(intervalId);
      } else {
        countdownDisplay.textContent = "Next refresh in: " + remaining + "s";
      }
    }, 1000);
  }
});
