/*global Phaser game game_state*/

game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/guy.png', 70, 64);
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('player1', 'assets/guy2.png', 70, 64);
    },

    create: function() {
        // Set the background color to blue
        game.stage.backgroundColor = '#3598db';
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        this.ground = this.platforms.create(0, game.world.height - 190, 'ground');
        this.ground.body.immovable = true;
        this.ground.scale.setTo(14, 3);
        this.ground.body.immovable = true;
        this.player = game.add.sprite(200, 510, 'player');
        this.player1 = game.add.sprite(300, 510, 'player1');
        this.storyText = game.add.text(0, 16, 'P.B is sad that he does not own enough fedoras to own a', {
            fontSize: '32px',
            fill: '#000'
        });
        this.storyText = game.add.text(0, 39, 'shop. You need to collect them but dont catch starfish.', {
        fontSize: '32px',
        fill: '#000'
        });
        this.storyText = game.add.text(0, 60, 'they dont like him.', {
        fontSize: '32px',
        fill: '#000'
        });
        this.storyText = game.add.text(250, 200, '<Move left to start>', {
        fontSize: '32px',
        fill: '#000'
        });
    },
    update: function() {
        if (this.left.isDown) {
            
             game.state.start('main');
         }

    }
};

game.state.add('story', game_state.story);
game.state.start('story');