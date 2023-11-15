import * as Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }
    preload(){
        //adicionando imagem
        //const background =this.add.image(200,200,'fausto_idle','./assets/fausto/fausto-parado.png')
        this.load.image('gameOverBackground', './assets/extras/gameOver.png');
        this.load.audio('gameOverSound','./assets/sounds/gameOver.mp3');

        
    }

    create() {
        //música de game over
        const gameOverSound = this.sound.add('gameOverSound')
        gameOverSound.play({volume:0.5})
        //imagem da tela de Game Over(background)
        const background = this.add.image(400, 320, 'gameOverBackground');
        background.setDisplaySize(800, 640);
        background.setOrigin(0.5);
        //configuração da fonte
        const fontConfig = {
            fontFamily: 'Edo SZ', // Substitua pelo nome da fonte instalada na sua máquina
            fontSize: '64px',
            color: '#ffffff'
        };
    

    // Botão para retornar ao menu principal
    const returnButton = this.add.text(400, 590, 'MENU', fontConfig)
        .setOrigin(0.5)
        .setInteractive();

    // Defina um evento de clique para o botão
    returnButton.on('pointerdown', () => {
        // Reinicie o jogo ou vá para a cena do menu principal
        this.scene.start('MainMenu'); // Suponha que 'MainMenu' seja o nome da cena do menu principal
    });

         // criando botão para acessar a cena da pontuação
         const pontuacaoButton = this.add.text(
            this.sys.canvas.width / 2,
            this.sys.canvas.height / 2 + 100, // Ajuste a posição do botão
            'Ver Pontuações',
            {
                fontSize: '28px',
                color: '#fff',
                backgroundColor: '#000'
            }
        );

        pontuacaoButton.setOrigin(0.5);
        pontuacaoButton.setInteractive();

        pontuacaoButton.on('pointerdown', () => {
            this.scene.start('Pontuacao'); // Inicia a cena de pontuação ao clicar no botão
        });

    }
    shutdown() {
        // Pare o som ao sair da cena para liberar recursos.
        this.sound.get('gameOverSound').stop();
    }
}
