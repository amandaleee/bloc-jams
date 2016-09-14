var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point){
  point.style.opacity = 1;
  point.style.transform = "scaleX(1) translateY(1rem)";
  point.style.msTransform = "scaleX(1) translateY(1rem)";
  point.style.WebkitTransform = "scaleX(1) translateY(1rem)";
};

var animatePoints = function(points) {
  // for (var i = 0; i < points.length; i++) {
  //   revealPoint(i);
  // }
  forEach(pointsArray, revealPoint);
};

window.onload = function() {
  if (window.innerHeight > 950) {
    animatePoints(pointsArray);
  }
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
  window.addEventListener('scroll', function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
      animatePoints(pointsArray);   
    }
  });
}