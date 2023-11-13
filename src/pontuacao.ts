import * as Phaser from 'phaser';

export default class PontuacaoScene extends Phaser.Scene {
    constructor() {
        super('Pontuacao');
    }

    preload() {
        // Aqui você pode fazer pré-carregamento de assets, se necessário
    }

    create() {
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
            const timeText = this.add.text(200, yPos, `${index + 1}. ${time}`, { fontSize: '20px', color: '#fff' });
            yPos += 30; // Ajuste a posição vertical para o próximo tempo
        });
    }

    update() {
        // Lógica de update, se necessário
    }
}
