


// Linear congruential generator, which is either buggy or just isn't good
// The random numbers it generates are very obviously not random
/*function Random(seed) {
    this.seed = seed;
}

function getRandom(random, max) {
    var m = Math.pow(2, 31);
    var c = 12345;
    var a = 1103515245;
    random.seed = (a * random.seed + c) % m;
    return Math.floor((random.seed / m) * max);
}


if (typeof window === 'undefined') {
    var r = new Random(1913162);
    var buckets = [];
    var max = 10;
    for (var i = 0; i < max; i++) {
        buckets[i] = 0;
    }
    for (var i = 0; i < 100000; i++) {
        buckets[getRandom(r, 10)]++;
    }
    console.log(buckets);
}*/

//MT19937
// Ref: https://en.wikipedia.org/wiki/Mersenne_Twister
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

var f = 1812433253;
var w = 32;
var n = 624;
var m = 397;
var r = 31;
var a = 0x9908B0DF;
var u = 11;
var d = 0xFFFFFFFF;
var s = 7;
var b = 0x9D2C5680;
var t = 15;
var c = 0xEFC60000;
var l = 18;
var lowerMask = ((1 << r) - 1) >>> 0;
var upperMask = (~lowerMask) >>> 0;
var maxW = Math.pow(2, w);

function Random(seed) {
    this.seed = seed >>> 0;
    this.index = n;
    this.MT = new Array(n);
    for (var i = 0; i < n; i++) {
        this.MT[i] = 0;
    }
    this.MT[0] = this.seed;
    for (var i = 1; i < n; i++) {
        this.MT[i] = (f * (this.MT[i - 1] ^ (this.MT[i - 1] >>> (w - 2))) + i);
        // Convert back to 32-bit integer
        this.MT[i] = this.MT[i] >>> 0;
    }
}

function _twist(random) {
    for (var i = 0; i < n; i++) {
        var x = (random.MT[i] & upperMask) + (random.MT[(i + 1) % n] & lowerMask);
        var xA = x >>> 1;
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
    var y = random.MT[random.index];
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

if (typeof window === 'undefined') {
    var r = new Random(14890);
    for (var i = 0; i < 100; i++) {
        console.log(getRandomInt(r, 0, 10));
    }
}
