var CoinController = (function () {
  var flipping = false;

  function flip() {
    if (flipping) return;
    flipping = true;

    var outcome = CoinModel.randomSide();
    CoinView.setResult(null);
    CoinView.setGlow(null);
    CoinView.setFlipping(true);
    CoinView.animateCoin(CoinModel.totalRotation(outcome));

    setTimeout(function () {
      CoinView.setResult(outcome);
      CoinView.setGlow(outcome);
      CoinView.setFlipping(false);
      flipping = false;
    }, CoinModel.FLIP_DURATION_MS);
  }

  function init() {
    CoinView.onFlipClick(flip);
  }

  return { init };
})();

CoinController.init();
