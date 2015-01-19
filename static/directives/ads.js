app.directive('ads', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var newElem = elem[0];
      var image = document.createElement("IMG");
        image.class = "ad";
        image.src = "/ad/?r=" + scope.getFreshId();
      if (scope.$index%20 == 0 && scope.$index > 1) {
        newElem.appendChild(image);
      }
    }
  }
})