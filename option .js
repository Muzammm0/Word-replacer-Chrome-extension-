// options.js

// Load saved words to replace and populate list
chrome.storage.sync.get(["wordsToReplace"], function (result) {
  const wordsList = document.getElementById("words-list");
  for (let word of result.wordsToReplace) {
    const li = document.createElement("li");
    li.textContent = `${word.from} => ${word.to}`;
    wordsList.appendChild(li);
  }
});

// Add word to replace on form submit
document.getElementById("options-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const from = formData.get("from").trim();
  const to = formData.get("to").trim();
  chrome.storage.sync.get(["wordsToReplace"], function (result) {
    const wordsToReplace = result.wordsToReplace || [];
    wordsToReplace.push({ from, to });
    chrome.storage.sync.set({ wordsToReplace }, function () {
      const li = document.createElement("li");
      li.textContent = `${from} => ${to}`;
      document.getElementById("words-list").appendChild(li);
      e.target.reset();
    });
  });
});

// Save changes button
document.getElementById("save-button").addEventListener("click", function () {
  alert("Changes saved!");
});

// background.js

// Add browser action listener to send message to content script
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, {
    action: "replace
