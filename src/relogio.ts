
// criação do relógio

export const createClock = (scene:Phaser.Scene):void =>{
    
    scene.add.text(10,10, '00:00',{
        font: '24px Arial',
        color: '#000000'
    })
    

}

//  função para fazer com que os minutos e segundos tenham dois dígitos
export const formatTwoDigits =(number)=>{
    return number.toString().padStart(2, '0')
}
