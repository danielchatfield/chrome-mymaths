chrome.browserAction.onClicked.addListener(function(tab) {
	//send message to page to get answers
	/*
  chrome.tabs.executeScript(
      null, {code:"document.body.className += ' show-mymaths';"});*/
  chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {greeting: "togglemymaths"});
	});
});