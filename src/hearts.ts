export const loadHeartSprites=(scene:Phaser.Scene) =>{
    scene.load.image('heart','assets/extras/heart.png')


}

export const createHeart = (scene:Phaser.Scene,x,y)=>{
    const heart =scene.add.image(x,y,'heart')
    return heart.setScale(0.1)


}