chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.openNewTab) {
      const url = `index.html#${request.openNewTab}`;
      chrome.tabs.create({ url });
    }
  });