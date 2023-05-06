/*----- constants -----*/
const player = {
  name: 'YOU',
  health: 300,
  strength: 10,
  defense: 10,
}
const mom = {
  name: 'MOM',
  health: 1000,
  strength: 100,
  defense: 100,
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
beginBtn.addEventListener('click', toggleModal)
yellBtn.addEventListener('click', yellAtk)
pleadBtn.addEventListener('click', pleadAtk)
cryBtn.addEventListener('click', crySpell)
tantrumBtn.addEventListener('click', tantrumSpecial)
helpBtn.addEventListener('click', toggleDes)
closeBtn.addEventListener('click', toggleDes)

/*----- functions -----*/
init()
toggleModal()
function init() {
  mom.health = 1000
  mom.defense = 100
  mom.strength = 100
  player.health = 300
  player.strength = 10
  player.defense = 10
  momsMoveEl.innerText = ``
  yourMoveEl.innerText = ``
  playAgainBtn.style.visibility = 'hidden'
  choicesEl.style.visibility = 'visible'
  render()
}
function toggleModal() {
  modal.classList.toggle('open')
}
function toggleDes() {
  des.classList.toggle('open')
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
  } else if (player.defense - 5 <= 0) {
      player.defense = 0
      player.health -= 10
      momsMoveEl.innerText = `MOM SIGHS IN DISAPPROVAL! YOU TAKE 10 DAMAGE! YOU FEEL WEAK!`
  }else { 
      player.health -= 10
      player.defense -= 5
      momsMoveEl.innerText = `MOM SIGHS IN DISAPPROVAL! YOU TAKE 10 DAMAGE! YOU FEEL WEAKER!`
      render()
  }
}
function lecture() {
  const damage = mom.strength - 60 - player.defense
  if (player.health - damage <= 0) {
    player.health = 0
    getWinner()
  } else { 
    player.health -= damage
      momsMoveEl.innerText = `MOM LECTURES YOU! YOU TAKE 30 DAMAGE!`
    render()
  }
}
function guiltTrip() {
  momsMoveEl.innerText = `MOM WEAKENS YOU WITH GUILT TRIP!`
  if (player.strength - 5 <= 5 && player.defense - 5 <= 0 ) {
    player.strength = 5
    player.defense = 0
  } else if (player.strength - 5 <= 5) {
    player.strength = 5
    player.defense -= 5
  } else if (player.defense -5 <= 0) {
    player.strength -= 5
    player.defense = 0
  } else {
    player.strength -= 5
    player.defense -= 5
  }
  render()
}
function confiscateGameboy() {
  let damage = mom.strength - player.defense
  if (player.health - damage <= 0) {
    player.health = 0
    getWinner()
  } else {
    player.health -= 100
      momsMoveEl.innerText = `MOM CONFISCATES YOUR GAMEBOY! YOU TAKE ${damage} DAMAGE!!`
  }
  render()
}
function yellAtk() {
  damage = player.strength
  if (mom.health - damage <= 0) {
    mom.health = 0
    getWinner()
  } else {
    mom.health -= damage
    yourMoveEl.innerText = `YELL DID ${damage} DAMAGE!`
    chooseMomsMove()
  }
}
function pleadAtk() {
  if (player.strength === 50) {
    yourMoveEl.innerText = `PLEAD DID NOTHING!?`
  } else if (player.strength + 10 >= 50) {
    player.strength = 50
    player.defense += 5
    yourMoveEl.innerText = `PLEAD MADE YOU STRONGER!`
  } else {
    player.strength += 10
    player.defense += 5
    yourMoveEl.innerText = `PLEAD MADE YOU STRONGER!`
  }
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
let damage = randomization(mom.defense)
  if (mom.health - damage <= 0) {
    mom.health = 0
    getWinner()
  } else {
    mom.health -= damage
     yourMoveEl.innerText = `TANTRUM DID ${damage} DAMAGE!`
    chooseMomsMove()
  }
}