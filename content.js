// content.js

// Replace words on the page
function replaceWords(wordsToReplace) {
  for (let word of wordsToReplace) {
    document.body.innerHTML = document.body.innerHTML.replace(
      new RegExp(word.from, "g"),
      word.to
    );
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "replaceWords") {
    chrome.storage.sync.get(["wordsToReplace"], function (result) {
      replaceWords(result.wordsToReplace);
    });
  }
});
