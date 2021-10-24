
let volAccuracy = 0.0001;

function normalcdf(mean, sigma, to)
{
    var z = (to-mean)/Math.sqrt(2*sigma*sigma);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
}

function n(x){
    return normalcdf(0, 1, x);
    /*
    if(x < 0) {
        return ( 1-n(-x) );
    } else {
        k = 1 / (1 + .2316419 * x);
        return ( 1 - Math.exp(-x * x / 2)/ Math.sqrt(2*Math.PI) * k * (.31938153 + k * (-.356563782 + k * (1.781477937 + k * (-1.821255978 + k * 1.330274429)))) );
    }*/
}

function phi(x, mu, sigma) {
    var numerator = Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
    var denominator = Math.sqrt(2 * Math.PI) * sigma;

    return numerator / denominator;
}

function normalPhi(x) {
    return phi(x, 0, 1);
}

function blackScholesDelta(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity, type) {
    var d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));

    var delta = 0;
    if (type == "call") {
        delta = n(d1);
    } else if (type == "put") {
        delta = n(d1) - 1;
    }

    return delta;
}

function blackScholesGamma(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity) {
    var d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));

    var gamma = Math.exp(-d1 * d1 / 2) / (Math.sqrt(2 * Math.PI) * underlyingPrice * volatility * Math.sqrt(timeToMaturity));

    return gamma;
}


// TODO come back to this
function blackScholesTheta(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity, type) {
    var d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));
    var d2 = d1 - volatility * Math.sqrt(timeToMaturity);
    var oneDay = 1 / 365;
    var commonInner = underlyingPrice * normalPhi(d1) * volatility / (2 * Math.sqrt(timeToMaturity));

    var theta = 0;
    if (type == "call") {
        theta = -commonInner - riskFreeRate * strikePrice * n(d2);
    } else if (type == "put") {
        theta = -commonInner + riskFreeRate * strikePrice * n(-d2);
    }

    return oneDay * theta;
}

function blackScholesVega(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity) {
    var d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));

    var vega = underlyingPrice * Math.exp(-d1 * d1 / 2) * Math.sqrt(timeToMaturity) / Math.sqrt(2 * Math.PI);

    return vega / 100;
}

function blackScholes(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity, type) {
    var d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));
    var d2 = d1 - volatility * Math.sqrt(timeToMaturity);
    var price = 0;
    if (type == "call") {
        price = underlyingPrice * Math.exp(-riskFreeRate * timeToMaturity) * n(d1) - strikePrice * Math.exp(-riskFreeRate * timeToMaturity) * n(d2);
    } else if (type == "put") {
        price = strikePrice * Math.exp(-riskFreeRate * timeToMaturity) * n(-d2) - underlyingPrice * Math.exp(-riskFreeRate * timeToMaturity) * n(-d1);
    }

    return price;
}

function blackScholesIv(optionPrice, underlyingPrice, strikePrice, riskFreeRate, timeToMaturity, type) {
    var currentVolatility = 0.10;
    var lastDifference = 9999999;
    var iteration = 0;

    while (Math.abs(lastDifference) > volAccuracy && iteration < 100) {
        console.log("Current Volatility " + currentVolatility);
        console.log("**** iteration " + iteration + " ****");
        var currentGuess = blackScholes(underlyingPrice, strikePrice, riskFreeRate, currentVolatility, timeToMaturity, type);
        console.log("Guess " + currentGuess);
        var difference = currentGuess - optionPrice;
        console.log("Diff " + difference);
        var direction = difference > 0 ? -1 : 1;
        // We need derivative with respect to volatility for newton's method, that's exactly what vega is!
        var derivative = blackScholesVega(underlyingPrice, strikePrice, riskFreeRate, currentVolatility, timeToMaturity);
        console.log("Derivative " + derivative);
        // Newton's method
        var volatilityStep = Math.abs(difference) / derivative;
        console.log("Vol step " + volatilityStep);
        console.log("Direction " + direction);
        // Step is a percentage so we need to divide by 100
        currentVolatility += direction * (volatilityStep / 100);

        lastDifference = difference;
        iteration += 1;
    }

    return currentVolatility;
}

if (typeof window === 'undefined') {
    //console.log(blackScholesVega(374.10, 371, -0.0189, .1277, 6 / 365, "put"));
    //console.log(blackScholesGamma(374.10, 376, 0.022, .109977, 6 / 365, "call"));
    //console.log(blackScholesIv(1.28, 374.10, 376, 0.022, 6 / 365, "call"));
    //console.log(blackScholesDelta(374.10, 376, 0.0, .109977, 6 / 365, "call"));
    //console.log(blackScholesTheta(374.10, 376, 0.0, .109977, 6 / 365, "call"));
    //console.log(blackScholesVega(374.10, 376, 0.0, .109977, 6 / 365));
    console.log(blackScholesTheta(374.10, 371, 0, .1277, 6 / 365, "put"));
    //console.log(blackScholesIv(2.25, 374.10, 372, 0.00, 8 / 365, "put"));
}
