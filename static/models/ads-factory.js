app.factory('AdsFactory', function AdsFactory() {
  var used_ads = [];

  function getId() {
    var rand = Math.floor(Math.random()*1000);

    while (_.contains(used_ads, rand)) {
      getFreshId();
    }

    used_ads.push(rand);
    return rand;
  }

  return {
    getId: getId
  }
});