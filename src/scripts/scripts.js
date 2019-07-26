function updateYear() {
  var date = new Date();
  year = date.getYear();
  if (year < 1000) year += 1900;
  document.getElementById("copyright-year").innerHTML = year;
}

window.onload = function() {
  updateYear();
};
