//Update iPhone clock and copyright year
var tmonth = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
function GetClock() {
  var d=new Date();
  var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
  if(nyear<1000) nyear+=1900;
  var nhour=d.getHours(),nmin=d.getMinutes(),ap;
  if(nhour==0){ap=' AM';nhour=12;}
  else if(nhour<12){ap=' AM';}
  else if(nhour==12){ap=' PM';}
  else if(nhour>12){ap=' PM';nhour-=12;}
  if(nmin<=9) nmin='0'+nmin;
  document.getElementById('clock').innerHTML=''+nhour+':'+nmin+ap+'';
  document.getElementById('copyright-year').innerHTML=nyear;
}
window.onload=function(){
  GetClock();
  setInterval(GetClock,1000);
}

//Expand teaser when clicked, collapse when close icon clicked
$('.teaser').click(function(){
  $(this).children('.project-detail').addClass('js-show-detail');
});

$('.icon-close').click(function(e){
  e.stopPropagation();
  $(this).parents('.project-detail').removeClass('js-show-detail');
});

//Wake iPhone when home button is pressed
$('.iphone__home').click(function(){
  $('.iphone__screen').removeClass('js-sleep').addClass('js-wake');
});

//Put iPhone to sleep wake sleep button pressed
$('.iphone__sleep').click(function(){
  $('.iphone__screen').removeClass('js-wake').addClass('js-sleep');
});

//Hint at interactivity when screen clicked
// $('.iphone__screen').click(function(){
//   $('.iphone__home').addClass('js-wake-hint');
//   setTimeout(function() {
//     $('.iphone__home').removeClass('js-wake-hint');
//   }, 2000);
// });
