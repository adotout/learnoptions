


// Linear congruential generator, which is either buggy or just isn't good
// The random numbers it generates are very obviously not random
/*function Random(seed) {
    this.seed = seed;
}

function getRandom(random, max) {
    let m = Math.pow(2, 31);
    let c = 12345;
    let a = 1103515245;
    random.seed = (a * random.seed + c) % m;
    return Math.floor((random.seed / m) * max);
}


if (typeof window === 'undefined') {
    let r = new Random(1913162);
    let buckets = [];
    let max = 10;
    for (let i = 0; i < max; i++) {
        buckets[i] = 0;
    }
    for (let i = 0; i < 100000; i++) {
        buckets[getRandom(r, 10)]++;
    }
    console.log(buckets);
}*/
(function () {
    //MT19937
    // Ref: https://en.wikipedia.org/wiki/Mersenne_Twister
    let f = 1812433253;
    let w = 32;
    let n = 624;
    let m = 397;
    let r = 31;
    let a = 0x9908B0DF;
    let u = 11;
    let d = 0xFFFFFFFF;
    let s = 7;
    let b = 0x9D2C5680;
    let t = 15;
    let c = 0xEFC60000;
    let l = 18;
    let lowerMask = ((1 << r) - 1) >>> 0;
    let upperMask = (~lowerMask) >>> 0;
    let maxW = Math.pow(2, w);

    function Random(seed) {
        this.seed = seed >>> 0;
        this.index = n;
        this.MT = new Array(n);
        for (let i = 0; i < n; i++) {
            this.MT[i] = 0;
        }
        this.MT[0] = this.seed;
        for (let i = 1; i < n; i++) {
            this.MT[i] = (f * (this.MT[i - 1] ^ (this.MT[i - 1] >>> (w - 2))) + i);
            // Convert back to 32-bit integer
            this.MT[i] = this.MT[i] >>> 0;
        }
    }

    function _twist(random) {
        for (let i = 0; i < n; i++) {
            let x = (random.MT[i] & upperMask) + (random.MT[(i + 1) % n] & lowerMask);
            let xA = x >>> 1;
            if (x % 2 != 0) {
                xA = xA ^ a;
            }
            random.MT[i] = random.MT[(i + m) % n] ^ xA;
        }
        random.index = 0;
    }

    function getRandom(random) {
        if (random.index == n) {
            _twist(random);
        }
        let y = random.MT[random.index];
        y = y ^ ((y >>> u) & d);
        y = y ^ ((y << s) & b);
        y = y ^ ((y << t) & c);
        y = y ^ (y >>> l);
        random.index = random.index + 1;

        return (y >>> 0) / maxW;
    }

    function getRandomInt(random, min, max) {
        return Math.floor(getRandom(random) * (max - min) + min);
    }

    function getRandomNormal(random, mu, sigma) {
        var u = 0, v = 0;
        while (u === 0) u = getRandom(random); //Converting [0,1) to (0,1)
        while (v === 0) v = getRandom(random);
        var num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

        return num * sigma + mu;
    }

    if (typeof window === 'undefined') {
        /*let r = new Random(14890);
        for (let i = 0; i < 100; i++) {
            console.log(getRandomInt(r, 0, 10));
        }*/
        module.exports = {
            Random: Random,
            getRandom: getRandom,
            getRandomInt: getRandomInt,
            getRandomNormal: getRandomNormal
        };
        var rand = new Random(23489);
        for (var i = 0; i < 10000; i++) {
            //console.log(getRandom(rand));
            console.log(getRandomNormal(rand, 0, 10));
        }
    } else {
        window.random = {
            Random: Random,
            getRandom: getRandom,
            getRandomInt: getRandomInt,
            getRandomNormal: getRandomNormal
        };
    }
})();
