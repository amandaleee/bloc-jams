var animatePoints = function() {
  var points = document.getElementsByClassName('point');
  var pointsArray = Array.prototype.slice.call(points);
  Array.from(document.getElementsByClassName("point")).forEach(function(item) {
    item.style.opacity = 1;
    item.style.transform = "scaleX(1) translateY(1rem)";
    item.style.msTransform = "scaleX(1) translateY(1rem)";
    item.style.WebkitTransform = "scaleX(1) translateY(1rem)";
  });
};
animatePoints();  