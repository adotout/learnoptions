
// Volatility helpers


(function () {

    function logReturn(startPrice, endPrice) {
        return Math.log(endPrice / startPrice);
    }

    function average(samples) {
        var sum = 0;
        for (var i = 0; i < samples.length; i++) {
            sum += samples[i];
        }
        return sum / samples.length;
    }

    function standardDeviation(samples) {
        var avg = average(samples);
        var sum = 0;
        for (var i = 0; i < samples.length; i++) {
            sum += Math.pow(samples[i] - avg, 2);
        }
        return Math.sqrt(sum / samples.length);
    }

    function calculateVoltility(priceSamples) {
        var logReturns = [];
        for (var i = 1; i < priceSamples.length; i++) {
            logReturns.push(logReturn(priceSamples[i - 1], priceSamples[i]));
        }
        return standardDeviation(logReturns);
    }

    function annualizeVolatility(volatility) {
        var tradingDays = 252;
        return volatility * Math.sqrt(tradingDays);
    }

    if (typeof window === 'undefined') {
        let samples = [453.94,
            455.96,
            455.55,
            453.12,
            453.59,
            452.41,
            450.64,
            447.19,
            445.87,
            442.50,
            435.18,
            433.62,
            434.69,
            437.86,
            438.66,
            434.90,
            433.10,
            428.64,
            434.24,
            429.14,
            434.45,
            433.72,
            442.64];
        let vol = calculateVoltility(samples);
        console.log(vol);
        console.log(annualizeVolatility(vol, samples.length));
    }
})();
