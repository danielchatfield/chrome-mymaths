//setup page stuff
toggleMyMaths = function() {
	jQuery('.mymaths-answers .mymaths-inner').html( '' );
	i= 0;
	while( i < 5 ) {
		i++;
if(jQuery('embed').length > 0) {
	var answers = jQuery('embed')[0].GetVariable('q' + i + 'answers');
} else {
var answers = jQuery('object')[0].GetVariable('q' + i + 'answers');
}
		
		if( answers == null) {
			break;
		}
		answers = answers.split(',');
		jQuery('.mymaths-answers .mymaths-inner').append( '<div class="mymaths-question">Question ' + i + '</div>' );

		for( j in answers ) {
			if( j != 0 ) {
				if( answers[j] != '' ) {
					jQuery('.mymaths-answers .mymaths-inner').append( '<input type="text" class="mymaths-answer" value="' + answers[j] + '" />' );
				}
			}
		}

	}
	jQuery('body').toggleClass('show-mymaths');
}
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "togglemymaths")
      toggleMyMaths();
  });

jQuery(document).ready(function(){
	jQuery('body').append( '<div class="mymaths-answers"><div class="mymaths-message">Copy the answers and paste into appropriate box</div><div class="mymaths-inner"></div></div>' );
})

