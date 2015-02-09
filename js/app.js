// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.random() * 505;
    this.y = 63 + (Math.round(Math.random() * 2) * 83);
    this.velocity = (Math.random() * 150) + 75;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velocity * dt;

    //If enemy is off screen, rest to beginning and randomly start 
    //on a row of stone blocks.
    if( this.x >= 505) {
        this.y = 63 + (Math.round(Math.random() * 2) * 83);
        this.x = -101;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 404;
    this.score = 0;
    this.sprite = "images/char-boy.png";
}

// Update player depending if touched by an enemy or reaches the water.
// Each test dispays to the console a message if condition is true.
Player.prototype.update = function() {
    // Check if player has been hit by any enemy and updates score. Resets if true.
    // Collision box created around pixel of player and enemy in If test.
    for(var bug in allEnemies) {
        if(this.x < allEnemies[bug].x + 90 && this.x + 65 > allEnemies[bug].x + 2 
          && this.y + 135 > allEnemies[bug].y + 142 && this.y + 65 < allEnemies[bug].y + 79) {
            this.score -= 10;
            this.x = 202;
            this.y = 404;
            console.log("Ouch!");
        }
    }

    // Check to see if player made it to the water then update scrore and reset.
    if(this.y <= 0) {
        this.score += 5;
        this.x = 202;
        this.y = 404;
        console.log("I made it!");
    }

    // Display Score
    ctx.clearRect(0, 0, 250, 43);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText("Score: " + this.score, 0, 40);
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move player depending on input from user.
Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x - 101 >= 0)
        this.x -= 101;
    if(direction == 'up' && this.y - 83 >= -11)
        this.y -= 83;
    if(direction == 'right' && this.x + 101 < 505)
        this.x += 101;
    if(direction == 'down' && this.y + 83 < 487)
        this.y += 83;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create all enemies for game.
var allEnemies = [];

for (var index = 0; index < 6; index++) {
    var enemyObj = new Enemy();
    allEnemies.push(enemyObj);
};

//Create player.
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
