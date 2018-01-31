'use strict';

var delay = 3000;

function con(msg) {
  console = document.getElementById("console");
  console.innerHTML += "<li>" + msg + "</li>\n";
}

function delayedPost(port, cnt) {
  con("delayedPost(" + cnt + ")");
  setTimeout(function(){ post(port, cnt); }, delay);
}

function post(port, cnt) {
  con("post(" + cnt + ")");
  port.postMessage({count: cnt});
}

function setupPort(port) {
  port.onMessage.addListener(function(rsp) {
    con("onMessage(" + rsp.count + ")");
    var cnt = document.getElementById("count");
    cnt.innerHTML = String(rsp.count);
    delayedPost(port, rsp.count);
  });
}

chrome.runtime.onConnect.addListener(function(port) {
  con("onConnect");
  setupPort(port);
  delayedPost(port, 0);
});
