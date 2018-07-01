// Enemies our player must avoid
var Enemy = function(x, y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = "images/enemy-bug.png";
	this.x = x;
	this.y = y;
	this.speed = Math.floor(Math.random() * 100 + 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt;
	// if the enemy is off screen, reset position
	if (this.x > 550) {
		this.x = -100;
	}

	// Check for collision between player and enemies
	if (player.x >= this.x - 40 && player.x <= this.x + 40) {
		if (player.y >= this.y - 40 && player.y <= this.y + 40) {
			player.reset();
		}
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = "images/char-boy.png";
	this.x = 200;
	this.y = 400;
};

Player.prototype.update = function() {
	//when the player reaches the water, reset position with small delay
	if (this.y <= 0) {
		setTimeout(function() {
			player.reset();
		}, 500);
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
	switch (key) {
		case "left":
			if (this.x > 0) {
				this.x -= 100;
			}
			break;
		case "up":
			if (this.y > 0) {
				this.y -= 83;
			}
			break;
		case "right":
			if (this.x < 400) {
				this.x += 100;
			}
			break;
		case "down":
			if (this.y < 400) {
				this.y += 83;
			}
			break;
	}
	console.log(this.x, this.y);
};

// Reset player's position
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numEnemies = Math.round(Math.random() * 5 + 3);
var allEnemies = (function(numEnemies) {
	var posY = [60, 140, 220];
	var enemies = [];
	for (var i = 0; i < numEnemies; ++i) {
		enemies[i] = new Enemy(-100, posY[i % posY.length]);
	}
	return enemies;
})(numEnemies);

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
	var allowedKeys = {
		37: "left",
		38: "up",
		39: "right",
		40: "down"
	};

	player.handleInput(allowedKeys[e.keyCode]);
});