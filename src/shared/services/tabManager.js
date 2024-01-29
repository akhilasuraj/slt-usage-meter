export const openNewTab = (path) => {
  chrome.runtime.sendMessage({ openNewTab: path });
};
