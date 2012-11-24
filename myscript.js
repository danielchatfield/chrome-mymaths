//setup page stuff

/*
document.nativeGetElementById = document.getElementById;
document.nativeGetElementsByTagName = document.getElementsByTagName;
window.nativeAlert = window.alert;
*/
toggleMyMaths = function() {
	blockedSchools = [
		"Bournemouth School"
	]

	allowedStudents = [

	]

	passwords = [
		"07449967482",
		"override"
	]
	student = 'Daniel';
	if(jQuery('embed').length > 0) {
		var school = jQuery('embed')[0].GetVariable('school');
		var studentid = jQuery('embed')[0].GetVariable('studentid');
		var student = jQuery('embed')[0].GetVariable('student');
	} else {
		var school = jQuery('object')[0].GetVariable('school');
		var studentid = jQuery('object')[0].GetVariable('studentid');
		var student = jQuery('object')[0].GetVariable('student');
	}

	if( blockedSchools.indexOf(school) >= 0) {
		password = '';
		if( window.localStorage['mymathsPassword'] == undefined) {
			window.localStorage['mymathsPassword'] = '';
		}

		if( passwords.indexOf(window.localStorage['mymathsPassword']) >= 0 ) {
			password = window.localStorage['mymathsPassword']
		} else {
			if( studentid != "0" && allowedStudents.indexOf(studentid) >= 0 ) {
				password = 'override';
			} else {
				password = prompt( 'Hello ' + student + '. You are student number ' + studentid + ' from ' +school + ' and they have requested that I disable the extension for their students. To override this enter the password below.', window.localStorage['mymathsPassword'])
			}
		}
		if( password == '' || password == null) {
			return;
		}
		window.localStorage['mymathsPassword'] = password;

		if( passwords.indexOf(password) >= 0) {
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
		} else {
			alert( 'Incorrect password: ' + password );
			return
		}
	}
}
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "togglemymaths")
      toggleMyMaths();
  });

jQuery(document).ready(function(){
	jQuery('body').append( '<div class="mymaths-answers"><div class="mymaths-message">Copy the answers and paste into appropriate box</div><div class="mymaths-inner"></div></div>' );
})