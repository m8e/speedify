document.addEventListener("DOMContentLoaded", function() {

  var speed = 0.25;
  var increment= 0.25;
  var limit = 4;
  var btn_group = document.getElementById("btn_group");
  var clickCount = 0;


  function init(){
      var i;
      for ( i = speed; i <= limit; i += increment ) {
        var button = document.createElement("button");
        button.classList.add("speed_controller_buttons");
        button.id = i;
        button.innerHTML = i;
        btn_group.appendChild(button);
      }
  }

  function attachListeners(){
    var speed_buttons = document.getElementsByClassName("speed_controller_buttons");

    for (var i = 0; i < speed_buttons.length; i++) {
      speed_buttons[i].addEventListener('click', function(){
        var speed_value = this.id;
        chrome.storage.local.set({'speed': speed_value}, function() {
        });
        chrome.storage.local.get(['speed'], function(result) {
        });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // query the active tab, which will be only one tab
            //and inject the script in it
            chrome.tabs.executeScript(tabs[0].id, {file: "js/content.js"}, _=>chrome.runtime.lastError);
        });
      });
    }
  }

init();
attachListeners();
});