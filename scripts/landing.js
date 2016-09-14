var points = document.getElementsByClassName('point');

var animatePoints = function(points) {
  var revealPoint = function(index){
    points[index].style.opacity = 1;
    points[index].style.transform = "scaleX(1) translateY(1rem)";
    points[index].style.msTransform = "scaleX(1) translateY(1rem)";
    points[index].style.WebkitTransform = "scaleX(1) translateY(1rem)";
  };
  for (var i = 0; i < points.length; i++) {
    revealPoint(i);
  }
};
window.onload = function() {
  window.addEventListener('scroll', function(event) {
    console.log(event);
  });
}