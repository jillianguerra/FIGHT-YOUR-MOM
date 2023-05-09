/*----- constants -----*/
const player = {
  name: 'YOU',
  health: null,
  strength: null,
  defense: null,
  heals: null,
  tantrums: null,
  counter: null,
}
const mom = {
  name: 'MOM',
  health: null,
  strength: null,
  defense: null,
  choices: ['sigh', 'sigh', 'lecture', 'lecture', 'lecture', 'guiltTrip', 'guiltTrip'],
  choicesLow: ['sigh', 'lecture', 'lecture', 'lecture', 'guiltTrip', 'confiscateGameboy'],
}
const battleHistory = {
  you: 0,
  mom: 0,
}
/*----- state variables -----*/


/*----- cached elements  -----*/
const statusEl = document.querySelector('#status')
const playerInfoEl = document.querySelector('#player-info')
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
  player.heals = 30
  player.counter = 0
  player.tantrums = 20
  cryBtn.style.backgroundColor = "cornflowerblue"
  tantrumBtn.style.backgroundColor = "orange"
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
  renderHealth()
  renderScore()
  renderPlayerInfo()
}
function renderHealth() {
  if (player.health === 300 && mom.health === 1000){
    statusEl.innerHTML = `<div>YOUR HEALTH: <span style="color: limegreen">${player.health}</span></div>
    <div>MOM'S HEALTH: <span style="color: limegreen">${mom.health}</span></div>`
  } else if (player.health === 300) {
    statusEl.innerHTML = `<div>YOUR HEALTH: <span style="color: limegreen">${player.health}</span></div>
    <div>MOM'S HEALTH: ${mom.health}</div>`
  } else if (mom.health === 1000) {
    statusEl.innerHTML = `<div>YOUR HEALTH: ${player.health}</div>
    <div>MOM'S HEALTH: <span style="color: limegreen">${mom.health}</span></div>`
  } else {
    statusEl.innerHTML = `<div>YOUR HEALTH: ${player.health}</div>
    <div>MOM'S HEALTH: ${mom.health}</div>`
  }
}
function renderScore() {
  battleHistoryEl.innerHTML = `
    <div>YOUR WINS: ${battleHistory.you}</div>
    <div>MOM'S WINS: ${battleHistory.mom}</div>
    `
}
function renderPlayerInfo() {
  if (player.counter === 0) {
    playerInfoEl.innerHTML = `
    <div>YOUR STRENGTH: ${player.strength}</div>
    <div>YOUR DEFENSE: ${player.defense}</div>
    <div>YOUR HEALS: ${player.heals}</div>
    <div>YOUR TANTRUMS: ${player.tantrums}</div>
    `
  } else if (player.strength === 50) {
    playerInfoEl.innerHTML = `
    <div>YOUR STRENGTH: <span style="color: limegreen">${player.strength}</span></div>
    <div>YOUR DEFENSE: <span style="color: limegreen">${player.defense}</span></div>
    <div>YOUR HEALS: ${player.heals}</div>
    <div>YOUR TANTRUMS: ${player.tantrums}</div>
    `
  } else {
    playerInfoEl.innerHTML = `
    <div style="color: crimson">POISONED FOR ${player.counter} TURNS!!</div>
    <div>YOUR STRENGTH: ${player.strength}</div>
    <div>YOUR DEFENSE: ${player.defense}</div>
    <div>YOUR HEALS: ${player.heals}</div>
    <div>YOUR TANTRUMS: ${player.tantrums}</div>
    `
  }
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
  let momsMove
  if (mom.health <= 300) {
    momsMove = mom.choicesLow[randomization(mom.choicesLow.length)]
  } else {
    momsMove = mom.choices[randomization(mom.choices.length)]
  }
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
  let count = randomization(6)
      player.counter = count
      momsMoveEl.innerText = `MOM SIGHS IN DISAPPROVAL! YOU FEEL WEAK!`
      render()
}
function poison() {
  if (player.counter !== 0) {
  if (player.health - 5 <= 0) {
    player.health = 0
    getWinner()
  } else {
    player.health -= 5
    player.counter --
    console.log(player.counter)
  }
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
    player.health -= damage
      momsMoveEl.innerText = `MOM CONFISCATES YOUR GAMEBOY! YOU TAKE ${damage} DAMAGE!!`
  }
  render()
}
function yellAtk() {
  let damage = player.strength
  if (mom.health - damage <= 0) {
    mom.health = 0
    getWinner()
  } else {
    mom.health -= damage
    yourMoveEl.innerText = `YELL DID ${damage} DAMAGE!`
    poison()
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
  poison()
  chooseMomsMove()
}
function crySpell() {
  if (player.heals === 0) {
    yourMoveEl.innerText = `YOU CAN'T CRY ANYMORE!!`
    cryBtn.style.backgroundColor = "gray"
  } else if (player.health === 300) {
    yourMoveEl.innerText = `CRY DID NOTHING...`
  } else if (player.health + 50 > 300) {
    let heal = 300 - player.health
    player.health = 300
    player.heals --
    yourMoveEl.innerText = `CRY HEALED ${heal} HEALTH!`
  } else {
    player.health += 50
    player.heals --
    yourMoveEl.innerText = `CRY HEALED 50 HEALTH`
  }
  poison()
  chooseMomsMove()
}
function tantrumSpecial() {
let damage = randomization(mom.defense) + player.strength
if (player.tantrums === 0) {
  yourMoveEl.innerText = `YOU CANNOT THROW ANOTHER TANTRUM!`
  tantrumBtn.style.backgroundColor = "gray"
} else if (mom.health - damage <= 0) {
    mom.health = 0
    getWinner()
  } else {
    mom.health -= damage
    player.tantrums --
     yourMoveEl.innerText = `TANTRUM DID ${damage} DAMAGE!`
     poison()
     chooseMomsMove()
  }
}