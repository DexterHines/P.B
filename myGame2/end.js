/*global Phaser game_state game*/
game_state.end = function() {};
game_state.end.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/guy.png', 70, 64);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('shop', 'assets/shop.png');
    },

    create: function() {
        // Set the background color to blue
        game.stage.backgroundColor = '#3598db';
        game.add.sprite(0, 110, 'shop');
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        this.ground = this.platforms.create(0, game.world.height - 190, 'ground');
        this.ground.body.immovable = true;
        this.ground.scale.setTo(14, 3);
        this.ground.body.immovable = true;
        this.player = game.add.sprite(200, 500, 'player');
        
        this.endText = game.add.text(375, 300, 'You win!!!!!!!', {
        fontSize: '36px',
        fill: '#000'
        });

    },
    update: function() {

    }
};
game.state.add('end', game_state.end);