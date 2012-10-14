parseData = function( result ) {
	console.log(result)
	alert('bob');
}

alert('bob2');

chrome.tabs.executeScript(
	null, {code:"return 'blue';"}, parseData);
