const ctx = document.getElementById('myChart').getContext('2d')
const resultBtn = document.getElementById('result-btn')
const dataTable = document.getElementById('data-table')

let optionalValues = ['4', 'real']

class TestData {
    /**
     * An object used in Chartjs's datasets
     * @param {String} label Label of the type (i.e: Writing)
     * @param {Number[]} data IELTS Scores
     * @param {String} borderColor Color string, (i.e: rgb(), 'red')
     */
    constructor(label, data, borderColor) {
        this.label = label;
        this.data = data;
        this.borderColor = borderColor
        this.backgroundColor = 'rgba(255, 255, 255, 0)';
        this.lineTension = 0;
    }
}

resultBtn.onclick = () => {
    let writingTest = new TestData('Writing', [], 'rgb(255, 77, 77)')
    let listeningTest = new TestData('Listening', [], '	rgb(77, 210, 255)')
    let readingTest = new TestData('Reading', [], 'rgb(255, 121, 77)')
    let speakingTest = new TestData('Speaking', [], 'rgb(121, 255, 77)')
    for (let i = 1, row; row = dataTable.rows[i], i < dataTable.rows.length; i++) {
        for (let j = 1, cell; cell = row.cells[j], j < row.cells.length; j++) {
            const input = cell.querySelector('input')
            switch (input.getAttribute('module')) {
                case 'listen':
                    if (optionalValues.includes(input.getAttribute('test')) && !input.value) {
                        continue;
                    }
                    listeningTest.data.push(parseFloat(input.value) || 0)
                    break;
                case 'write':
                    if (optionalValues.includes(input.getAttribute('test')) && !input.value) {
                        continue;
                    }
                    writingTest.data.push(parseFloat(input.value) || 0)
                    break;
                case 'read':
                    if (optionalValues.includes(input.getAttribute('test')) && !input.value) {
                        continue;
                    }
                    readingTest.data.push(parseFloat(input.value) || 0)
                    break;
                case 'speak':
                    if (optionalValues.includes(input.getAttribute('test')) && !input.value) {
                        continue;
                    }
                    speakingTest.data.push(parseFloat(input.value) || 0)
                    break;
                default:
                    break;
            }
        }
    }
    let dataset = [writingTest, listeningTest, readingTest, speakingTest]
    myChart.data.datasets = dataset
    console.log(myChart.data.datasets);
    myChart.update()
}

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1st time', '2nd time', '3rd time', '4th time', 'Real test']
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'IELTS Mock Test Progress',
            fontSize: 16
        }
    }
})

// myChart.data.datasets.push({
//     label: 'Writing',
//     data: [5, 6, 7, 8, 9],
//     backgroundColor: 'rgba(255, 255, 255, 0)',
//     borderColor: 'rgb(77, 166, 255)',
//     lineTension: 0
// })
// myChart.update()