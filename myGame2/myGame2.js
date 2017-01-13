/*global Phaser game*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};
var score = 0;
var score2 = 0;
game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/guy.png', 70, 64);
        game.load.spritesheet('player1', 'assets/guy2.png', 70, 64);
        game.load.image('object', 'assets/fedora.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('starfish', 'assets/starfish.png');
        game.load.image('troll', 'assets/Troll.png');
        game.load.image('roll', 'assets/troll.png');
    },

    create: function() {
        // Set the background color to blue
        game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.platforms = game.add.group();

        this.platforms.enableBody = true;

        var ground = this.platforms.create(0, game.world.height - 190, 'ground');

        ground.scale.setTo(14, 3);

        ground.body.immovable = true;

        this.player = game.add.sprite(200, 510, 'player');

        game.physics.arcade.enable(this.player);

        this.player.enbleBody = true;

        this.player.body.immovable = true;

        this.player1 = game.add.sprite(200, 510, 'player1');

        game.physics.arcade.enable(this.player1);

        this.player1.enbleBody = true;

        this.player1.body.immovable = true;

        //Player 1 Keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        //Player 2 Keys
        this.gameKey1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.gameKey2 = game.input.keyboard.addKey(Phaser.Keyboard.D);
        // Create objects group
        this.objects = game.add.group();

        // Enable body for all objects in the group
        this.objects.enableBody = true;

        //Anchor this object to _this variable
        var _this = this;

        // Create objects over time
        setInterval(function() {
            // create an object at the top of the screen at a random x
            var object = _this.objects.create(Math.random() * 800, -64, 'object');

            // Let gravity do its thing
            object.body.gravity.y = 300;
        }, 1010); // 1000 = 1000ms = 1 second

        //Starfish Code
        this.starfishes = game.add.group();

        this.starfishes.enableBody = true;

        setInterval(function() {
            // create an object at the top of the screen at a random x
            var starfish = _this.starfishes.create(Math.random() * 800, -64, 'starfish');

            // Let gravity do its thing
            starfish.body.gravity.y = 300;
        }, 1000); // 1000 = 1000ms = 1 second

        this.troll = game.add.group();

        this.troll.enableBody = true;

        setInterval(function() {
            // create an object at the top of the screen at a random x
            var troll = _this.troll.create(Math.random() * 800, -64, 'troll');

            // Let gravity do its thing
            troll.body.gravity.y = 300;
        }, 20000); // 1000 = 1000ms = 1 second

        this.roll = game.add.group();

        this.roll.enableBody = true;

        setInterval(function() {
            // create an object at the top of the screen at a random x
            var roll = _this.roll.create(Math.random() * 800, -64, 'roll');

            // Let gravity do its thing
            roll.body.gravity.y = 300;
        }, 20000); // 1000 = 1000ms = 1 second



        this.scoreText = game.add.text(16, 16, 'score: ', {
            fontSize: '32px',
            fill: '#000'
        });
        this.score = 0;

        this.score2Text = game.add.text(400, 16, 'score: ', {
            fontSize: '32px',
            fill: '#000'
        });
        this.score2 = 0;
    },

    update: function() {

        //var hitPlatform = game.physics.arcade.collide(this.player, this.platforms);

        if (this.score >= 80) {
            game.state.start('end');
        }

        if (this.score2 >= 80) {
            game.state.start('end2');
        }

        this.player1.body.bounce.y = .1;
        this.player1.body.gravity.y = 40;
        this.player1.body.collideWorldBounds = true;

        // Move the player left/right when an arrow key is pressed
        if (this.gameKey1.isDown) {
            this.player1.body.velocity.x = -300;
        }
        else if (this.gameKey2.isDown) {
            this.player1.body.velocity.x = 300;
        }

        // Stop the player when no key is pressed
        else {
            this.player1.body.velocity.x = 0;
        }

        this.player.body.bounce.y = .1;
        this.player.body.gravity.y = 40;
        this.player.body.collideWorldBounds = true;

        // Move the player left/right when an arrow key is pressed
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
        }

        // Stop the player when no key is pressed
        else {
            this.player.body.velocity.x = 0;
        }
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);

        game.physics.arcade.overlap(this.player, this.starfishes, this.hitStarfish, null, this);

        game.physics.arcade.overlap(this.player, this.troll, this.hitTroll, null, this);

        game.physics.arcade.overlap(this.player, this.roll, this.hitRoll, null, this);

        game.physics.arcade.overlap(this.player1, this.objects, this.hitObject2, null, this);

        game.physics.arcade.overlap(this.player1, this.starfishes, this.hitStarfish2, null, this);

        game.physics.arcade.overlap(this.player1, this.troll, this.hitTroll2, null, this);

        game.physics.arcade.overlap(this.player1, this.roll, this.hitRoll2, null, this);


    },
    hitObject2: function(player1, object) {
        object.kill();
        this.score2++;
        this.score2Text.text = 'score: ' + this.score2;
    },

    hitStarfish2: function(player1, starfish) {
        starfish.kill();
        this.score2--;
        this.score2Text.text = 'score: ' + this.score2;
    },
    hitTroll2: function(player1, troll) {
        troll.kill();
        this.score2 = this.score2 = 0;
        this.score2Text.text = 'loser';
    },

    hitRoll2: function(player1, roll) {
        roll.kill();
        this.score2 = this.score2 + 40;
        this.score2Text.text = 'score: ' + this.score2;
    },

    hitObject: function(player, object) {
        object.kill();
        this.score++;
        this.scoreText.text = 'score: ' + this.score;
    },

    hitStarfish: function(player, starfish) {
        starfish.kill();
        this.score--;
        this.scoreText.text = 'score: ' + this.score;
    },
    hitTroll: function(player, troll) {
        troll.kill();
        this.score = this.score = 0;
        this.scoreText.text = 'loser';
    },

    hitRoll: function(player, roll) {
        roll.kill();
        this.score = this.score + 40;
        this.scoreText.text = 'score: ' + this.score;
    },

};
game.state.add('main', game_state.main);
