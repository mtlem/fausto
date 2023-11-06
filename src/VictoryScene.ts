import * as Phaser from 'phaser';

export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super('Victory');
    }
    preload(){
        this.load.image('victory','assets/extras/victory.jpeg')
        this.load.audio('victorySound', 'assets/sounds/vitoria.mp3')
    }
    create() {
        //música de vitória
        const victorySound = this.sound.add('victorySound')
        victorySound.play({volume:0.5})
        //background
        const background = this.add.image(400, 320, 'victory');
        background.setDisplaySize(800, 640);
        background.setOrigin(0.5);

      //nome do player
      const playerName = (window as any).playerName;
        
      console.log(playerName)
      const tempoPlayer =(window as any).tempoPlayer
      console.log(tempoPlayer)
      
        const victoryText = this.add.text(400, 320, 'Você Venceu!', {
            fontSize: '44px',
            color: '#fff',
            backgroundColor:'#000'
        });
        victoryText.setOrigin(0.5);

        // Crie um botão para retornar ao menu principal
        const backButton = this.add.text(400, 400, 'Menu Principal', {
            fontSize: '24px',
            color: '#fff',
            backgroundColor: '#000'
        });
        backButton.setOrigin(0.5);
        backButton.setInteractive();

        // Adicione um evento de clique ao botão
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu'); // Retorna ao menu principal
        });
    }
    shutdown() {
        // Pare o som ao sair da cena para liberar recursos.
        this.sound.get('victorySound').stop();
    }
}
