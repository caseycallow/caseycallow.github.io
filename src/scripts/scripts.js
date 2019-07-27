"use strict";

function triggerBackgroundAnimation() {
  var url = "images/animated-bg.svg?" + Math.random();
  var css = "body:before { background: url(" + url + ") 0 / contain }";
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

function updateYear() {
  var date = new Date();
  var year = date.getYear();
  if (year < 1000) year += 1900;
  document.getElementById("copyright-year").innerHTML = year;
}

window.onload = function() {
  triggerBackgroundAnimation();
  updateYear();
};
