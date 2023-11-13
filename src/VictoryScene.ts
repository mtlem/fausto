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

      //tempo
      const formattedMinutes = this.registry.get('formattedMinutes');
      const formattedSeconds = this.registry.get('formattedSeconds');
      const sum = formattedMinutes + formattedSeconds;


     

      //usando valores na cena
      const tempoPlayer = `${formattedMinutes}:${formattedSeconds}`
      console.log(tempoPlayer)

       //salvando tempo do player no armazenamento local (local storage)
       localStorage.setItem('tempoPlayer', tempoPlayer)

       //recuperando tempoPlayer do armazenamento local

       const tempoPlayerFromStorage = localStorage.getItem('tempoPlayer');

       if(tempoPlayerFromStorage){
            console.log("Tempo do jogador recuperado ");
       }else{
        console.log('Nenhum Tempo de jogador encontrado no armazenamento local')
       }

        
      console.log(playerName)
      
      console.log(tempoPlayer)
      
        const victoryText = this.add.text(400, 320, 'Você Venceu!', {
            fontSize: '44px',
            color: '#fff',
            backgroundColor:'#000'
        });
        victoryText.setOrigin(0.5);

        const pontuacao = this.add.text(400,360, `Sua pontuação: ${tempoPlayer}`,{
            fontSize: '44px',
            color: '#fff',
            backgroundColor:'#000'
        })
        pontuacao.setOrigin(0.5)

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

        //logica para adicionar os 5 melhores resultados
        const getTopFiveTimes = () => {
            const storedData = localStorage.getItem('topFiveTimes');
            return storedData ? JSON.parse(storedData) : [];
        };
        
        let topFiveTimes = getTopFiveTimes();

        const addNewTimeIfTopFive = (newTime) => {
            // Adicione o novo tempo à lista apenas se for um dos 5 mais rápidos
            if (topFiveTimes.length < 5 || newTime < topFiveTimes[topFiveTimes.length - 1] || !topFiveTimes.length) {
                topFiveTimes.push(newTime);
                topFiveTimes.sort((a, b) => a - b); // Ordenar os tempos
                topFiveTimes = topFiveTimes.slice(0, 5); // Manter apenas os 5 melhores tempos
                localStorage.setItem('topFiveTimes', JSON.stringify(topFiveTimes)); // Salvar no armazenamento local
            }
        };
        
        // Suponha que 'novoTempo' é o tempo que você deseja adicionar aos 5 melhores tempos
        const novoTempo = sum; // Por exemplo, 2 minutos
        
        addNewTimeIfTopFive(novoTempo); // Chamar esta função para adicionar um novo tempo, se for um dos 5 melhores
        

    }
    shutdown() {
        // Pare o som ao sair da cena para liberar recursos.
        this.sound.get('victorySound').stop();
    }
}
