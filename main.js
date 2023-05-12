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
  choices: ['sigh', 'sigh', 'lecture', 'lecture', 'lecture', 'guiltTrip', 'guiltTrip', 'extraChores',],
  choicesLow: ['sigh', 'lecture', 'lecture', 'lecture', 'guiltTrip', 'extraChores', 'extraChores', 'confiscateGameboy'],
}
const battleHistory = {
  you: 0,
  mom: 0,
}
/*----- state variables -----*/
let winner

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

const intro = document.querySelector('#intro')
const des = document.querySelector('#descriptions')
const winMsg = document.querySelector('#winner-msg')
const winMsgEl = document.querySelector('#winner-msg > div')

const beginBtn = document.querySelector('#begin')
const playAgainBtn = document.querySelector('#play-again')
const yellBtn = document.querySelector('#yell')
const pleadBtn = document.querySelector('#plead')
const cryBtn = document.querySelector('#cry')
const tantrumBtn = document.querySelector('#tantrum')
const helpBtn = document.querySelector('#help')
const closeBtn = document.querySelector('#close')
/*----- event listeners -----*/

playAgainBtn.addEventListener('click', playAgain)
beginBtn.addEventListener('click', toggleIntro)
yellBtn.addEventListener('click', yellAtk)
pleadBtn.addEventListener('click', pleadAtk)
cryBtn.addEventListener('click', crySpell)
tantrumBtn.addEventListener('click', tantrumSpecial)
helpBtn.addEventListener('click', toggleDes)
closeBtn.addEventListener('click', toggleDes)

/*----- functions -----*/
init()
toggleIntro()
function init() {
  winner = null
  mom.health = 1000
  mom.defense = 100
  mom.strength = 100
  player.health = 300
  player.strength = 10
  player.defense = 10
  player.heals = 20
  player.counter = 0
  player.tantrums = 5
  momsMoveEl.innerText = ``
  yourMoveEl.innerText = ``
  render()
}
function toggleIntro() {
  intro.classList.toggle('open')
}
function toggleDes() {
  des.classList.toggle('open')
}
function toggleWinMsg() {
  winMsg.classList.toggle('open')
}
function playAgain() {
  toggleWinMsg()
  init()
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
  renderWinnerMsg()
  renderBtns()
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
  if (player.heals === 20) {
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
function renderBtns() {
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'
  choicesEl.style.visibility = winner ? 'hidden' : 'visible'
  helpBtn.style.visibility = winner ? 'hidden' : 'visible'
  tantrumBtn.style.backgroundColor = player.tantrums === 0 ? "gray" : "orange"
  cryBtn.style.backgroundColor = player.heals === 0 ? "gray" : "cornflowerblue"
}
function renderWinnerMsg() {
  if (winner === null) {
    return
  } else if (winner === 'mom') {
    winMsgEl.innerHTML = `
    <h2>MOM SAYS YOU ARE GROUNDED UNTIL FURTHER NOTICE!</h2>
    <h2>YOU LOSE!</h2>
    `
  } else if (winner === 'you') {
    winMsgEl.innerHTML = `
    <h2>MOM IS TOO TIRED AND LEAVES YOUR ROOM.</h2>
    <p><small>SHE WILL PROBABLY GROUND YOU IN THE MORNING THOUGH...</small></p>
    <h2>YOU WIN!!!!</h2>
    `
  }
  toggleWinMsg()
}
function getWinner() {
  if (player.health <= 0) {
    winner = 'mom'
    battleHistory.mom ++
    render()
  } else if (mom.health <= 0) {
    winner = 'you'
    battleHistory.you ++
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
  if (mom.health <= 500) {
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
    } else if (momsMove === 'extraChores') {
      extraChores()
    }
}
function sigh() {
  if (player.counter !== 0) {
    chooseMomsMove()
  } else if (player.health - 10 === 0){
    player.health = 0
    getWinner()
  }else {
    let count = 1 + randomization(5)
    player.counter = count
    player.health -= 10
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
      momsMoveEl.innerText = `MOM LECTURES YOU! YOU TAKE ${damage} DAMAGE!`
    render()
  }
}
function guiltTrip() {
  let strAmount = player.strength === 0 ? 0 : 10
  let defAmount = player.defense === 0 ? 0 : 5
   if (strAmount === 0 && defAmount === 0) {
    chooseMomsMove()
   } else {
    momsMoveEl.innerText = `MOM WEAKENS YOU WITH GUILT TRIP!`
    player.strength -= strAmount
    player.defense -= defAmount
    render()
   }
}
function extraChores() {
  let damage = getChoresDamage()
  if (player.health - damage <= 0) {
    player.health = 0
    getWinner()
  } else {
    player.health -= damage
    momsMoveEl.innerText = `MOM TELLS YOU TO DO EXTRA CHORES! YOU TAKE ${damage} DAMAGE!`
    render()
  }
}
function getChoresDamage() {
  let damage
  let amount = 10 + randomization(mom.strength * 0.5)
  let playerDef = player.defense * 0.5
   if (playerDef >= amount) {
    damage = 1 + randomization(10)
   } else {
    damage = amount - playerDef
   }
   return damage
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
  let amount = player.defense + player.strength
  if (player.heals === 0) {
    yourMoveEl.innerText = `YOU'VE RUN OUT OF TEARS TO CRY!`
  } else if (player.health === 300) {
    yourMoveEl.innerText = `CRY DID NOTHING...`
  } else if (player.health + amount > 300) {
    let heal = 300 - player.health
    player.health = 300
    player.heals --
    yourMoveEl.innerText = `CRY HEALED ${heal} HEALTH!`
  } else {
    player.health += amount
    player.heals --
    yourMoveEl.innerText = `CRY HEALED ${amount} HEALTH`
  }
  poison()
  chooseMomsMove()
}
function tantrumSpecial() {
  let playerStr = randomization(player.strength)
  let damage = 1 + randomization(100) + playerStr
  if (player.tantrums === 0) {
    yourMoveEl.innerText = `YOU DON'T HAVE THE ENERGY TO THROW ANOTHER TANTRUM!`
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