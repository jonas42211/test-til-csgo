var CoinModel = (function () {
  var FLIP_DURATION_MS = 2500;
  var SPIN_ROTATIONS = 6;

  function randomSide() {
    return Math.random() < 0.5 ? "ct" : "t";
  }

  function totalRotation(side) {
    var landAngle = side === "ct" ? 0 : 180;
    return SPIN_ROTATIONS * 360 + landAngle;
  }

  function glowFilter(side) {
    if (side === "ct") return [
      "drop-shadow(0 0 20px rgba(59,130,246,1))",
      "drop-shadow(0 0 50px rgba(59,130,246,0.9))",
      "drop-shadow(0 0 90px rgba(59,130,246,0.7))",
      "drop-shadow(0 0 140px rgba(99,179,237,0.5))",
    ].join(" ");
    if (side === "t") return [
      "drop-shadow(0 0 20px rgba(217,119,6,1))",
      "drop-shadow(0 0 50px rgba(217,119,6,0.9))",
      "drop-shadow(0 0 90px rgba(217,119,6,0.7))",
      "drop-shadow(0 0 140px rgba(251,191,36,0.5))",
    ].join(" ");
    return "drop-shadow(0 0 14px rgba(160,120,60,0.4))";
  }

  function resultLabel(side) {
    if (side === "ct") return "CT WON";
    if (side === "t")  return "T WON";
    return "";
  }

  return { FLIP_DURATION_MS, randomSide, totalRotation, glowFilter, resultLabel };
})();
