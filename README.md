<body>
<h1>FIGHT YOUR MOM</h1>
<p>This is a browser game that uses HTML, CSS and JavaScript.</p>
<p><a src="https://jillianguerra.github.io/FIGHT-YOUR-MOM/">Link to play game!</p>
<img src="https://i.imgur.com/NL3WpBd.png">
<h3>(Wireframe Image)</h3>
<img src="https://i.imgur.com/TRdpc8B.png">
<h2>Game Basics</h2>
<p>
The basic premise will be a turn-based battle game.
The player will have 4 moves and the opponent will have 4 moves plus one special "ultimate" move.
When the player or the opponent reach 0 health, the game ends.
There will be a play again button. 
</p>
<img src="https://i.imgur.com/bywclV1.png">
There is a modal explaining the game's premise. 
<img src="https://i.imgur.com/udMRwIZ.png">
<p>
There is a help button that displays a modal with instructions as to what each move does.
The opponent's move is chosen from an array. The array lists the same move multiple times to change the likeliness of a move being chosen. For example, confiscate gameboy is only listed once, but lecture is listed three times. Therefore, the opponent is three times more likely to use lecture over confiscate gameboy.
The four player moves will be different from the opponent's four moves.
</p>
<img src="https://i.imgur.com/fWaY9LW.png">
<ul>
<h3>Player moves:</h3>
<li>Yell: deals damage based on the player's strength.</li>
<li>Plead: increases player's strength and defense.</li>
<li>Cry: heals up to 80hp depending on player defense and strength. 
Player's health is maxed out at 300.</li>
<li>Tantrum: deals a random amount of damage between 1 and 500.</li>
</ul>
<ul>
<h3>Opponent's Moves:</h3>
<li>Sigh: poisons the player for a random number of turns.</li>
<li>Lecture: deals 30 damage</li>
<li>Guilt Trip: lowers player's strength and defense</li>
<li>Extra Chores: deals a random amount of damage</li>
<li>Confiscate Gameboy: deals 100 damage minus half player's defense</li>
</ul>
<img src="https://i.imgur.com/EZ3UfDY.png">
<p>If the player reaches 0 health, they lose. If the opponent reaches 0 health, the player wins.
There is a another modal that appears when the player wins or loses.</p>
<img src="https://i.imgur.com/icKn3wC.png">
<h2>Possible Improvements</h2>
<ul>
<li>Adding animations to the text that describes each move.</li>
<li>Adding images for each of "YOUR" moves and "MOM'S" moves. I would have to commission an artist to do that, or draw them myself. If I drew them myself that might be funnier.</li>
<li>Adding music or sound effects. I didn't want to steal music so again, I would have to buy some royalty free music or comission someone for background music. I actually prefer browser games that don't have music or sound effects because it tends to be annoying.</li>
<li>There's one little annoying bug that I don't know how to fix. The health bar turns white when the accent color is changed to crimson. I have no idea why it does this, since I haven't touched the progress element in CSS. I only change the accent color in JS. It may just be my computer being strange or it could be that progress elements are a little buggy in general.</li>
</ul>
</body>