
(function () {
    let volAccuracy = 0.0001;

    function normalcdf(mean, sigma, to)
    {
        let z = (to-mean)/Math.sqrt(2*sigma*sigma);
        let t = 1/(1+0.3275911*Math.abs(z));
        let a1 =  0.254829592;
        let a2 = -0.284496736;
        let a3 =  1.421413741;
        let a4 = -1.453152027;
        let a5 =  1.061405429;
        let erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
        let sign = 1;
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
        let numerator = Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
        let denominator = Math.sqrt(2 * Math.PI) * sigma;

        return numerator / denominator;
    }

    function normalPhi(x) {
        return phi(x, 0, 1);
    }

    function blackScholesDelta(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity, type) {
        let d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));

        let delta = 0;
        if (type == "call") {
            delta = n(d1);
        } else if (type == "put") {
            delta = n(d1) - 1;
        }

        return delta;
    }

    function blackScholesGamma(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity) {
        let d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));

        let gamma = Math.exp(-d1 * d1 / 2) / (Math.sqrt(2 * Math.PI) * underlyingPrice * volatility * Math.sqrt(timeToMaturity));

        return gamma;
    }


    // TODO come back to this
    function blackScholesTheta(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity, type) {
        let d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));
        let d2 = d1 - volatility * Math.sqrt(timeToMaturity);
        let oneDay = 1 / 365;
        let commonInner = underlyingPrice * normalPhi(d1) * volatility / (2 * Math.sqrt(timeToMaturity));

        let theta = 0;
        if (type == "call") {
            theta = -commonInner - riskFreeRate * strikePrice * n(d2);
        } else if (type == "put") {
            theta = -commonInner + riskFreeRate * strikePrice * n(-d2);
        }

        return oneDay * theta;
    }

    function blackScholesVega(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity) {
        let d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));

        let vega = underlyingPrice * Math.exp(-d1 * d1 / 2) * Math.sqrt(timeToMaturity) / Math.sqrt(2 * Math.PI);

        return vega / 100;
    }

    function blackScholes(underlyingPrice, strikePrice, riskFreeRate, volatility, timeToMaturity, type) {
        let d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));
        let d2 = d1 - volatility * Math.sqrt(timeToMaturity);
        let price = 0;
        if (type == "call") {
            price = underlyingPrice * Math.exp(-riskFreeRate * timeToMaturity) * n(d1) - strikePrice * Math.exp(-riskFreeRate * timeToMaturity) * n(d2);
        } else if (type == "put") {
            price = strikePrice * Math.exp(-riskFreeRate * timeToMaturity) * n(-d2) - underlyingPrice * Math.exp(-riskFreeRate * timeToMaturity) * n(-d1);
        }

        return price;
    }

    function blackScholesIv(optionPrice, underlyingPrice, strikePrice, riskFreeRate, timeToMaturity, type) {
        let currentVolatility = 0.10;
        let lastDifference = 9999999;
        let iteration = 0;

        while (Math.abs(lastDifference) > volAccuracy && iteration < 100) {
            console.log("Current Volatility " + currentVolatility);
            console.log("**** iteration " + iteration + " ****");
            let currentGuess = blackScholes(underlyingPrice, strikePrice, riskFreeRate, currentVolatility, timeToMaturity, type);
            console.log("Guess " + currentGuess);
            let difference = currentGuess - optionPrice;
            console.log("Diff " + difference);
            let direction = difference > 0 ? -1 : 1;
            // We need derivative with respect to volatility for newton's method, that's exactly what vega is!
            let derivative = blackScholesVega(underlyingPrice, strikePrice, riskFreeRate, currentVolatility, timeToMaturity);
            console.log("Derivative " + derivative);
            // Newton's method
            let volatilityStep = Math.abs(difference) / derivative;
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
        //console.log(blackScholesTheta(374.10, 371, 0, .1277, 6 / 365, "put"));
        //console.log(blackScholesIv(2.25, 374.10, 372, 0.00, 8 / 365, "put"));
        module.exports = {
            blackScholes: blackScholes,
            blackScholesIv: blackScholesIv,
            blackScholesDelta: blackScholesDelta,
            blackScholesGamma: blackScholesGamma,
            blackScholesTheta: blackScholesTheta,
            blackScholesVega: blackScholesVega
        };
    } else {
        window.bs = {
            blackScholes: blackScholes,
            blackScholesIv: blackScholesIv,
            blackScholesDelta: blackScholesDelta,
            blackScholesGamma: blackScholesGamma,
            blackScholesTheta: blackScholesTheta,
            blackScholesVega: blackScholesVega
        };
    }
})();
