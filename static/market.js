
// Back end for all market games


(function () {
    if (typeof window === 'undefined') {
        let bs = require('./bs.js');
        let random = require('./random.js');

        let a = new random.Random(111);
        console.log(random.getRandomInt(a, 0, 10));
    } else {
        const labels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
          ];
          const data = {
            labels: labels,
            datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
            }]
          };
          const config = {
            type: 'line',
            data: data,
            options: {}
          };
        const myChart = new Chart(
            document.getElementById('basics0-chart'),
            config
        );
    }
})();
