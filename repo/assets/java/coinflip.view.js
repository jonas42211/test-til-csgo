var CoinView = (function () {
  var glowWrap    = document.getElementById("glowWrap");
  var coinWrapper = document.getElementById("coinWrapper");
  var resultEl    = document.getElementById("result");
  var flipBtn     = document.getElementById("flipBtn");

  function setGlow(side) {
    glowWrap.style.filter = CoinModel.glowFilter(side);
  }

  function setResult(side) {
    resultEl.textContent = CoinModel.resultLabel(side);
    resultEl.className = side ? "cf-result cf-result-" + side : "cf-result";
  }

  function setFlipping(isFlipping) {
    flipBtn.disabled = isFlipping;
  }

  function animateCoin(rotation) {
    var duration = 2600;
    var settleDuration = 700;
    var start = performance.now();

    function fastThenSlow(t) {
      if (t < 0.5) {
        return 2 * t * t;
      }

      var finalPhase = (t - 0.5) / 0.5;
      return 0.5 + (1 - Math.pow(1 - finalPhase, 14)) * 0.5;
    }

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var flipProgress = fastThenSlow(progress);
      var jumpProgress = Math.sin(flipProgress * Math.PI);
      var currentRotation = flipProgress * rotation;
      var lift = -52 * jumpProgress;

      if (progress >= 1) {
        var settleProgress = Math.min((elapsed - (duration - settleDuration)) / settleDuration, 1);
        var easedSettle = 1 - Math.pow(1 - settleProgress, 6);
        currentRotation = rotation - (rotation * (1 - easedSettle));
        lift = -52 * (1 - easedSettle);
      }

      coinWrapper.style.transform = "translateY(" + lift + "px) rotateY(" + currentRotation + "deg)";

      if (elapsed < duration + settleDuration) {
        requestAnimationFrame(tick);
      }
    }

    coinWrapper.style.transition = "none";
    coinWrapper.style.transform = "translateY(0px) rotateY(0deg)";
    requestAnimationFrame(tick);
  }

  function onFlipClick(handler) {
    flipBtn.addEventListener("click", handler);
  }

  return { setGlow, setResult, setFlipping, animateCoin, onFlipClick };
})();
