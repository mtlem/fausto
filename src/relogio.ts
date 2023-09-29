
// criação do relógio

export const createClock = (scene:Phaser.Scene,change):void =>{
    
    scene.add.text(10,10, change,{
        font: '24px Arial',
        color: '#000000'
    })


}

//  função para fazer com que os minutos e segundos tenham dois dígitos
export const formatTwoDigits =(number)=>{
    return number.toString().padStart(2, '0')
}
