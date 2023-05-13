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
const yourHealthEl = document.querySelector('#your-health')
const momsHealthEl = document.querySelector('#moms-health')
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

const yourHealthbar = document.querySelector('#your-healthbar')
const momsHealthbar = document.querySelector('#moms-healthbar')
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
  renderWinnerMsg()
  renderBtns()
  renderHealthbar()
}
function renderHealth() {
  yourHealthEl.innerHTML = player.health === 300 ?
    `YOUR HEALTH: <span style="color: limegreen">${player.health}</span>` :
    player.health <= 75 ?
      `YOUR HEALTH: <span style="color: crimson">${player.health}` :
      player.health <= 150 ?
        `YOUR HEALTH: <span style="color: orange">${player.health}` :
        `YOUR HEALTH: ${player.health}`
  momsHealthEl.innerHTML = mom.health === 1000 ?
    `MOM'S HEALTH: <span style="color: limegreen">${mom.health}</span>` :
    mom.health <= 250 ?
      `MOM'S HEALTH: <span style="color: crimson">${mom.health}</span>` :
      mom.health <= 500 ?
        `MOM'S HEALTH: <span style="color: orange">${mom.health}</span>` :
        `MOM'S HEALTH: ${mom.health}`
}
function renderHealthbar() {
  yourHealthbar.value = player.health
  momsHealthbar.value = mom.health
  yourHealthbar.style.accentColor = player.health <= 75 ? 'crimson' :
    player.health <= 150 ? 'orange' : 'limegreen'
  momsHealthbar.style.accentColor = mom.health <= 250 ? 'crimson' :
    mom.health <= 500 ? 'orange' : 'limegreen'
}
function renderScore() {
  battleHistoryEl.innerHTML = `
    <div>YOUR WINS: ${battleHistory.you}</div>
    <div>MOM'S WINS: ${battleHistory.mom}</div>
    `
}
function renderPlayerInfo() {
  poisonEl.innerHTML = player.counter !== 0 ?
    `<span style="color:crimson">POISONED FOR ${player.counter} TURNS!!</span` :
    ``
  strengthEl.innerHTML = player.strength === 50 ?
    `YOUR STRENGTH: <span style="color: limegreen">${player.strength}</span>` :
    `YOUR STRENGTH: ${player.strength}`
  defenseEl.innerHTML = player.defense === 30 ?
    `YOUR DEFENSE: <span style="color: limegreen">${player.defense}</span>` :
    `YOUR DEFENSE: ${player.defense}`
  healsEl.innerHTML = player.heals === 20 ?
    `YOUR HEALS: <span style="color: limegreen">${player.heals}</span>` :
    `YOUR HEALS: ${player.heals}`
  tantrumsEl.innerHTML = player.tantrums === 5 ?
    `YOUR TANTRUMS: <span style="color: limegreen">${player.tantrums}</span>` :
    `YOUR TANTRUMS: ${player.tantrums}`
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
    toggleWinMsg()
  } else if (winner === 'you') {
    winMsgEl.innerHTML = `
    <h2>MOM IS TOO TIRED AND LEAVES YOUR ROOM.</h2>
    <p><small>SHE WILL PROBABLY GROUND YOU IN THE MORNING THOUGH...</small></p>
    <h2>YOU WIN!!!!</h2>
    `
    toggleWinMsg()
  }
}
function getWinner() {
  if (player.health <= 0) {
    winner = 'mom'
    battleHistory.mom++
    render()
  } else if (mom.health <= 0) {
    winner = 'you'
    battleHistory.you++
    render()
  } else {
    return
  }
}
function randomization(limit) {
  return Math.floor(Math.random() * limit)
}
function chooseMomsMove() {
  let momsMove = mom.health <= 500 ?
    mom.choicesLow[randomization(mom.choicesLow.length)] :
    mom.choices[randomization(mom.choices.length)]
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
  let count = 1 + randomization(5)
  if (player.counter !== 0) {
    chooseMomsMove()
  } else if (player.health - count - 5 <= 0) {
    player.health = 0
    getWinner()
  } else {
    player.counter = count
    player.health -= count + 5
    momsMoveEl.innerText = `MOM SIGHS IN DISAPPROVAL! POISONED FOR ${count} TURNS!`
    render()
  }
}
function applyPoison() {
  if (player.counter !== 0) {
    if (player.health - 5 <= 0) {
      player.health = 0
      getWinner()
    } else {
      player.health -= 5
      player.counter--
      chooseMomsMove()
    }
  } else {
    chooseMomsMove()
  }
}
function lecture() {
  const damage = mom.strength / 2 - player.defense
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
    applyPoison()
  }
}
function pleadAtk() {
  let strAmount = player.strength === 50 ? 0 : player.strength + 10 >= 50 ? 50 - player.strength : 10
  let defAmount = player.defense === 30 ? 0 : player.defense + 5 >= 30 ? 30 - player.defense : 5
  player.strength += strAmount
  player.defense += defAmount
  yourMoveEl.innerText = strAmount === 0 && defAmount === 0 ?
    `PLEAD DID NOTHING!?` :
    `PLEAD MADE YOU STRONGER!`
  applyPoison()
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
    player.heals--
    yourMoveEl.innerText = `CRY HEALED ${heal} HEALTH!`
  } else {
    player.health += amount
    player.heals--
    yourMoveEl.innerText = `CRY HEALED ${amount} HEALTH`
  }
  applyPoison()
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
    player.tantrums--
    yourMoveEl.innerText = `TANTRUM DID ${damage} DAMAGE!`
    applyPoison()
  }
}