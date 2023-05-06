/*----- constants -----*/
const player = {
  name: 'YOU',
  health: 300,
  strength: 10,
}
const mom = {
  name: 'MOM',
  health: 1000,
  choices: ['sigh', 'sigh', 'lecture', 'lecture', 'lecture', 'guiltTrip', 'guiltTrip', 'confiscateGameboy'],
}
const battleHistory = {
  you: 0,
  mom: 0,
}
/*----- state variables -----*/


/*----- cached elements  -----*/
const statusEl = document.querySelector('#status')
const yourMoveEl = document.querySelector('#your-move')
const momsMoveEl = document.querySelector('#moms-move')
const choicesEl = document.querySelector('#choices')
const battleHistoryEl = document.querySelector('#battle-history')
const modal = document.querySelector('#modal')
const des = document.querySelector('#descriptions')
const beginBtn = document.querySelector('#begin')
const playAgainBtn = document.querySelector('#play-again')
const yellBtn = document.querySelector('#yell')
const pleadBtn = document.querySelector('#plead')
const cryBtn = document.querySelector('#cry')
const tantrumBtn = document.querySelector('#tantrum')
const helpBtn = document.querySelector('#help')
const closeBtn = document.querySelector('#close')
/*----- event listeners -----*/

playAgainBtn.addEventListener('click', init)
beginBtn.addEventListener('click', init)
yellBtn.addEventListener('click', yellAtk)
pleadBtn.addEventListener('click', pleadAtk)
cryBtn.addEventListener('click', crySpell)
tantrumBtn.addEventListener('click', tantrumSpecial)
helpBtn.addEventListener('click', toggleDes)
closeBtn.addEventListener('click', toggleDes)

/*----- functions -----*/

function toggleModal() {
  modal.classList.toggle('open')
}
toggleModal()
function toggleDes() {
  des.classList.toggle('open')
}

function init() {
  mom.health = 1000
  player.health = 300
  player.strength = 10
  momsMoveEl.innerText = ``
  yourMoveEl.innerText = ``
  playAgainBtn.style.visibility = 'hidden'
  choicesEl.style.visibility = 'visible'
  render()
  toggleModal()
}
function render() {
  statusEl.innerHTML = `<div>YOUR HEALTH: ${player.health}</div>
  <div>MOM'S HEALTH: ${mom.health}</div>`
  battleHistoryEl.innerHTML = `
  <div>YOUR WINS: ${battleHistory.you}</div>
  <div>MOM'S WINS: ${battleHistory.mom}</div>`
}
function getWinner() {
  if (player.health <= 0) {
    battleHistory.mom ++
    yourMoveEl.innerText = `MOM SAYS YOU ARE GROUNDED UNTIL FURTHER NOTICE!`
    momsMoveEl.innerText = `YOU LOSE!`
    playAgainBtn.style.visibility = 'visible'
    choicesEl.style.visibility = 'hidden'
    render()
  } else if (mom.health <= 0) {
    battleHistory.you ++
    yourMoveEl.innerText = `MOM IS TOO TIRED AND LEAVES YOUR ROOM. SHE WON'T GROUND YOU UNTIL MORNING.`
    momsMoveEl.innerText = `YOU WIN!!!!`
    playAgainBtn.style.visibility = 'visible'
    choicesEl.style.visibility = 'hidden'
    render()
  } else {
    return
  }
}
function randomization(limit) {
  return Math.floor(Math.random() * limit)
}
function chooseMomsMove() {
  let momsMove = mom.choices[randomization(mom.choices.length)]
  if (momsMove === 'sigh') {
    sigh()
  } else if (momsMove === 'lecture') {
    lecture()
  } else if (momsMove === 'guiltTrip') {
    guiltTrip()
  } else if (momsMove === 'confiscateGameboy') {
    confiscateGameboy()
  }
}
function sigh() {
  if (player.health - 10 <= 0) {
    player.health = 0 
    getWinner()
  } else { 
    player.health -= 10
     momsMoveEl.innerText = `MOM SIGHS IN DISAPPROVAL! YOU TAKE 10 DAMAGE!`
    render()
  }
}
function lecture() {
  if (player.health - 30 <= 0) {
    player.health = 0
    getWinner()
  } else { 
    player.health -= 30
      momsMoveEl.innerText = `MOM LECTURES YOU! YOU TAKE 30 DAMAGE!`
    render()
  }
}
function guiltTrip() {
  momsMoveEl.innerText = `MOM WEAKENS YOU WITH GUILT TRIP!`
  if (player.strength - 5 <= 5) {
    player.strength = 5
  } else {
    player.strength -= 5
  }
  render()
}
function confiscateGameboy() {
  if (player.health - 100 <= 0) {
    player.health = 0
    getWinner()
  } else {
    player.health -= 100
      momsMoveEl.innerText = `MOM CONFISCATES YOUR GAMEBOY! YOU TAKE 100 DAMAGE!!`
  }
  render()
}
function yellAtk() {
  if (mom.health - player.strength <= 0) {
    mom.health = 0
    getWinner()
  } else {
    mom.health -= player.strength
    yourMoveEl.innerText = `YELL DID ${player.strength} DAMAGE!`
    chooseMomsMove()
  }
}
function pleadAtk() {
  player.strength += 10
  yourMoveEl.innerText = `PLEAD MADE YELL STRONGER!`
chooseMomsMove()
}
function crySpell() {
  if (player.health === 300) {
    yourMoveEl.innerText = `CRY DID NOTHING...`
  } else if (player.health + 50 > 300) {
    player.health = 300
    yourMoveEl.innerText = `CRY HEALED SOME HEALTH!`
  } else {
    player.health += 50
    yourMoveEl.innerText = `CRY HEALED 50 HEALTH`
  }
  chooseMomsMove()
}
function tantrumSpecial() {
let tantrumDamage = randomization(100)
  if (mom.health - tantrumDamage <= 0) {
    mom.health = 0
    getWinner()
  } else {
    mom.health -= tantrumDamage
     yourMoveEl.innerText = `TANTRUM DID ${tantrumDamage} DAMAGE!`
    chooseMomsMove()
  }
}
function startGame() {
  toggleModal();
};