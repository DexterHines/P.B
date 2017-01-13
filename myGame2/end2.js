/*global Phaser game_state game*/
game_state.end2 = function() {};
game_state.end2.prototype = {

    preload: function() {
        game.load.spritesheet('player1', 'assets/guy2.png', 70, 64);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('shop2', 'assets/shop2.png');
    },

    create: function() {
        // Set the background color to blue
        game.stage.backgroundColor = '#3598db';
        game.add.sprite(0, 110, 'shop2');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        this.ground = this.platforms.create(0, game.world.height - 190, 'ground');
        this.ground.body.immovable = true;
        this.ground.scale.setTo(14, 3);
        this.ground.body.immovable = true;
        this.player1 = game.add.sprite(200, 500, 'player1');
        
        this.endText = game.add.text(375, 300, 'You win!!!!!!!', {
        fontSize: '36px',
        fill: '#000'
        });

    },
    update: function() {

    }
};
game.state.add('end2', game_state.end);