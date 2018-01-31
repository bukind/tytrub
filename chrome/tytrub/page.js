'use strict';

var port = chrome.runtime.connect(chrome.runtime.id);

port.onMessage.addListener(function(msg) {
  port.postMessage({count: msg.count + 1})
});
