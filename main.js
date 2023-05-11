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
const poisonEl = document.querySelector('#poison-status')
const strengthEl = document.querySelector('#player-strength')
const defenseEl = document.querySelector('#player-defense')
const healsEl = document.querySelector('#player-heals')
const tantrumsEl = document.querySelector('#player-tantrums')

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
  player.heals = 15
  player.counter = 0
  player.tantrums = 5
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
  renderPoison()
  renderStr()
  renderDef()
  renderHeals()
  renderTantrums()
}
function renderPoison() {
  if (player.counter !== 0) {
    poisonEl.innerHTML = `<span style="color:crimson">POISONED FOR ${player.counter} TURNS!!</span`
  } else {
    poisonEl.innerHTML = ``
  }
}
function renderStr() {
  if (player.strength === 50) {
    strengthEl.innerHTML = `YOUR STRENGTH: <span style="color: limegreen">${player.strength}</span>`
  } else {
    strengthEl.innerHTML = `YOUR STRENGTH: ${player.strength}`
  }
}
function renderDef() {
  if (player.defense === 30) {
    defenseEl.innerHTML = `YOUR DEFENSE: <span style="color: limegreen">${player.defense}</span>`
  } else {
    defenseEl.innerHTML = `YOUR DEFENSE: ${player.defense}`
  }
}
function renderHeals() {
  if (player.heals === 15) {
    healsEl.innerHTML = `YOUR HEALS: <span style="color: limegreen">${player.heals}</span>`
  } else {
    healsEl.innerHTML = `YOUR HEALS: ${player.heals}`
  }
}
function renderTantrums() {
  if (player.tantrums === 5) {
    tantrumsEl.innerHTML = `YOUR TANTRUMS: <span style="color: limegreen">${player.tantrums}</span>`
  } else {
    tantrumsEl.innerHTML = `YOUR TANTRUMS: ${player.tantrums}`
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
  if (player.counter !== 0) {
    chooseMomsMove()
  } else {
    let count = 1 + randomization(5)
    player.counter = count
    momsMoveEl.innerText = `MOM SIGHS IN DISAPPROVAL! YOU FEEL WEAK!`
    render()
  }
}
function poison() {
  if (player.counter !== 0) {
  if (player.health - 5 <= 0) {
    player.health = 0
    getWinner()
  } else {
    player.health -= 5
    player.counter --
  }
}
}
function lecture() {
  const damage = mom.strength/2 - player.defense
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
  let strAmount = guiltTripStr()
  let defAmount = guiltTripDef()
   if (strAmount === 0 && defAmount === 0) {
    chooseMomsMove()
   } else {
    momsMoveEl.innerText = `MOM WEAKENS YOU WITH GUILT TRIP!`
    player.strength -= strAmount
    player.defense -= defAmount
    render()
   }
}
function guiltTripStr() {
  let amount
  if (player.strength === 0) {
    amount = 0
  } else {
    amount = 10
  }
  return amount
}
function guiltTripDef() {
  let amount
  if (player.defense === 0) {
    amount = 0
  } else {
    amount = 5
  }
  return amount
}

function confiscateGameboy() {
  let damage = mom.strength - player.defense * 0.5
  if (player.health - damage <= 0) {
    player.health = 0
    getWinner()
  } else {
    player.health -= damage
      momsMoveEl.innerText = `MOM CONFISCATES YOUR GAMEBOY! YOU TAKE ${damage} DAMAGE!!`
  }
  console.log(damage)
  render()
}
function yellAtk() {
  let damage = player.strength + 5
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
  let strAmount = pleadStr()
  let defAmount = pleadDef()
  player.strength += strAmount
  player.defense += defAmount
  if (strAmount === 0 && defAmount === 0) {
    yourMoveEl.innerText = `PLEAD DID NOTHING!?`
  } else {
    yourMoveEl.innerText = `PLEAD MADE YOU STRONGER!`
  }
  poison()
  chooseMomsMove()
}
function pleadStr() {
  let amount
  if (player.strength === 50) {
    amount = 0
  } else if (player.strength + 10 >= 50) {
    amount = 50 - player.strength
  } else {
    amount = 10
  }
  return amount
}

function pleadDef() {
  let amount
  if (player.defense === 30) {
    amount = 0
  } else if (player.defense + 5 >= 30) {
    amount = 30 - player.defense
  } else {
    amount = 5
  }
  return amount
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