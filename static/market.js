
// Back end for all market games


(function () {
    if (typeof window === 'undefined') {
        let bs = require('./bs.js');
        let random = require('./random.js');

        let a = new random.Random(111);
        console.log(random.getRandomInt(a, 0, 10));
    }
})();
