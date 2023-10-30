import * as Phaser from 'phaser';
export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Carregue quaisquer recursos do menu, como imagens de fundo ou botões.
        this.load.image('capa','assets/extras/capa.jpeg')
    }

    create() {
        //criando background
        const background = this.add.image(400, 320, 'capa');
        background.setDisplaySize(800, 640);
        background.setOrigin(0.5);
        //aplicando filtro de nitidez
        //background.setPipeline('Light2D');

        // Crie os elementos do menu, como botões e texto.
        const startButton = this.add.text(
            this.sys.canvas.width / 2,
            this.sys.canvas.height / 2,
            'Iniciar Jogo',
            {
                fontSize: '44px',
                color: '#fff',
                backgroundColor: '#000'
            }
        );
        startButton.setOrigin(0.5);
         // Campo de entrada de nome
        //  const nameInput = document.createElement('input');
        //  nameInput.type = 'text';
        //  nameInput.placeholder = 'Digite seu nome';
        //  nameInput.style.position = 'absolute';
        //  nameInput.style.left = this.sys.canvas.width / 2 + 400 + 'px';
        //  nameInput.style.top = this.sys.canvas.height / 2 - 255 + 'px';
        //  nameInput.style.fontSize = '18px';
        //  nameInput.style.padding = '5px';
 
        //  // Adicione o campo de entrada de nome ao DOM
        //  document.body.appendChild(nameInput);
        //  const namePlayer = nameInput.value;
        //  this.registry.set('namePlayer',namePlayer)

         // Crie um campo de entrada de texto dinamicamente
         const nameInput = document.createElement('input');
         nameInput.type = 'text';
         nameInput.placeholder = 'Digite seu nome';
         nameInput.style.position = 'absolute';
         nameInput.style.left = this.sys.canvas.width / 2 +400 + 'px';
         nameInput.style.top = this.sys.canvas.height / 2 - 255 + 'px';
         nameInput.style.fontSize = '18px';
         nameInput.style.padding = '5px';
 
         // Adicione o campo de entrada de texto ao DOM
         document.body.appendChild(nameInput);
 



        // Adicione um evento de clique ao botão "Iniciar Jogo" para iniciar o Estágio 1.
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            const playerName = nameInput.value;
            //armazenando o nome em uam variável global
            (window as any).playerName = playerName;
            //removendo o campo de entrada de texto do DOM
            nameInput.style.display ='none'
            this.scene.start('Estagio1'); // Inicia o Estágio 1
        });
    }
}

