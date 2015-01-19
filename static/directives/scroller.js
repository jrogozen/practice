app.directive('scroller', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var newElem = elem[0];
      elem.bind('scroll', function () {
        if (((newElem.scrollTop + newElem.offsetHeight+25) >= newElem.scrollHeight)) {
          scope.$apply('getNext()');
        }
      });
    }
  };
});