app.filter('convertPrice', function() {
  return function(price) {
    var priceString = price.toString();
    var priceArr = priceString.split("");

    while (priceArr.length < 3) {
      priceArr.unshift(0);
    }

    priceArr.splice(-2,0,".");

    priceArr.unshift("$");
    return priceArr.join("");
  }
});