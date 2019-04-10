function observeVideoMutation(default_rate){
	var bodyObserver = new MutationObserver(function(mutations) {
	  	chrome.storage.local.get(['speed'], function(result) {
	  		document.querySelector('video').playbackRate = result.speed;
		});
	  });
	var bodyObserverConfig = {
	  attributes: true,
	  childList: true,
	  subtree: true,
	  characterData: true
	};
	const sleep = (milliseconds) => {
	  return new Promise(resolve => setTimeout(resolve, milliseconds))
	}
	sleep(1000).then(() => {
		bodyObserver.observe(target, bodyObserverConfig);
	})
    
}

function tryWithoutMutation(default_rate){
	chrome.storage.local.get(['speed'], function(result) {
				document.querySelector('video').playbackRate = result.speed;
		});
}

var target = document.body;

var default_rate = 1;
tryWithoutMutation(default_rate);
observeVideoMutation(default_rate);