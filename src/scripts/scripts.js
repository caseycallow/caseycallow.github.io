//Update iPhone clock and copyright year
var tmonth = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

function GetClock() {
  var d = new Date();
  var nmonth = d.getMonth(), ndate = d.getDate(), nyear = d.getYear();
  if (nyear < 1000) nyear += 1900;
  var nhour = d.getHours(), nmin = d.getMinutes(), ap;
  if (nhour == 0) {
    ap =' AM';
    nhour = 12;
  }
  else if (nhour < 12) {
    ap = ' AM';
  }
  else if (nhour == 12) {
    ap = ' PM';
  }
  else if (nhour > 12) {
    ap = ' PM';
    nhour -= 12;
  }
  if (nmin <= 9) nmin = '0' + nmin;

  // update iPhone clock
  document.getElementById('clock').innerHTML = '' + nhour + ':' + nmin + ap + '';

  // update copyright year
  document.getElementById('copyright-year').innerHTML = nyear;
}
window.onload = function(){
  GetClock();
  setInterval(GetClock, 1000);
}

// expand teaser when clicked
$('.teaser').click(function(){
  $(this).next('.project-detail').addClass('js-show-detail');
});

// collapse teaser when close icon clicked, hide video prototype
$('.icon-close').click(function(e){
  e.stopPropagation();
  $(this).parents('.project-detail').removeClass('js-show-detail');
  $(this).parents('.main').find('.proto-vid').removeClass('is-playing');
});

// open prototype video when open case study
$('.teaser--prototype').click(function(){
  $(this).parents('.main').find('.proto-vid').addClass('is-playing');
});
