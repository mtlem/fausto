import * as Phaser from 'phaser';
// criação do relógio

export const createClock = (scene:Phaser.Scene,x:number,y:number) =>{
    
    const clock = scene.add.text(x,y, '00:00',{
        font: '24px Arial',
        color: '#000000'
    })
    return clock
    

};

//  função para fazer com que os minutos e segundos tenham dois dígitos
export const formatTwoDigits =(number)=>{
    return number.toString().padStart(2, '0')
}
