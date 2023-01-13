const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.getElementById('time')
const board = document.getElementById('board')
const colors = ['#FF0000', '#00FF00', '#FFFF00', '#8A2BE2', '#00FFFF']

let time = 0
let score = 0

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})



timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
       time = parseInt(e.target.getAttribute('data-time'))
       screens[1].classList.add('up')
       startGame()
    }
})

board.addEventListener('click', e => {
    if(e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})



function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}




function decreaseTime() {
    if(time === 0) {
        scoreName()
    } else {
        let current = --time
    if(current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
}



function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function scoreName() {
    timeEl.parentNode.classList.add('hide')
    if(score < 15) {
        board.innerHTML = `<h1>Твой счет: <span class"primary">${score}</span> </h1> 
                           <h2>Ты слабый бич, иди тренируйся</h2>`
    } else {
        board.innerHTML = `<h1>Твой счет: <span class"primary">${score}</span> </h1>
                           <h2>Все равно слабый бич, авп не твое</h2>`
    }
}




function createRandomCircle () {
    const circle = document.createElement('div')
    const {width, height} = board.getBoundingClientRect()

    const size = getRandomNumber(10, 60)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)



    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`
    circle.style.background = setColor(circle)




    board.append(circle)
}


function getRandomNumber(min, max) {

    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor () {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
}