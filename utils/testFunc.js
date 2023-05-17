RATE = function (periods, payment, present, future, type, guess) {
  guess = guess === undefined ? 0.01 : guess;
  future = future === undefined ? 0 : future;
  type = type === undefined ? 0 : type;

  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;

  // Set maximum number of iterations
  var iterMax = 10;

  // Implement Newton's method
  var y,
    y0,
    y1,
    x0,
    x1 = 0,
    f = 0,
    i = 0;
  var rate = guess;

  if (Math.abs(rate) < epsMax) {
    y =
      present * (1 + periods * rate) +
      payment * (1 + rate * type) * periods +
      future;
  } else {
    f = Math.exp(periods * Math.log(1 + rate));
    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
  }

  y0 = present + payment * periods + future;
  y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
  i = x0 = 0;
  x1 = rate;
  while (Math.abs(y0 - y1) > epsMax && i < iterMax) {
    rate = (y1 * x0 - y0 * x1) / (y1 - y0);
    x0 = x1;
    x1 = rate;
    if (Math.abs(rate) < epsMax) {
      y =
        present * (1 + periods * rate) +
        payment * (1 + rate * type) * periods +
        future;
    } else {
      f = Math.exp(periods * Math.log(1 + rate));
      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = y1;
    y1 = y;
    ++i;
  }
  const res = rate * 100;
  return res.toFixed(2);
};

// Usage example
const totalPeriods = 48;
const amountEachPeriod = 10;
const presentValue = 0;
const futureValue = -1000;
const type = 1;

const result = RATE(
  totalPeriods,
  amountEachPeriod,
  presentValue,
  futureValue,
  type
);

console.log("Rate:", result);
