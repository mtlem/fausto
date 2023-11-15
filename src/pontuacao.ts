import * as Phaser from 'phaser';

export default class PontuacaoScene extends Phaser.Scene {
    constructor() {
        super('Pontuacao');
    }

    preload() {
        this.load.image('pontuacao','assets/extras/pontuacao.jpeg')
       

    }

    create() {

         const background = this.add.image(400,320,'pontuacao')
        background.setDisplaySize(800,640);
        background.setOrigin(0.5)
        // Lógica para exibir a pontuação
        const getTopFiveTimes = () => {
            const storedData = localStorage.getItem('topFiveTimes');
            return storedData ? JSON.parse(storedData) : [];
        };

        let topFiveTimes = getTopFiveTimes();

        // Ordenar os tempos em ordem crescente (do menor para o maior)
        topFiveTimes.sort((a, b) => a - b);

        // Posição inicial para exibir os tempos
        let yPos = 100;

        // Exibir os tempos na cena
        topFiveTimes.forEach((time, index) => {
            const timeText = this.add.text(200, yPos, `${index + 1}. ${time}`, { fontSize: '20px',backgroundColor:'#000000', color: '#fff' });
            yPos += 30; // Ajuste a posição vertical para o próximo tempo
        });

        //botão para retorno para o menu principal
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

    update() {
        // Lógica de update, se necessário
    }
}
