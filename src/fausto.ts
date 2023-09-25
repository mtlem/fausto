export interface Player extends Phaser.Physics.Arcade.Sprite{
    isAttacking?: boolean;

}



export const createPlayer = (scene:Phaser.Scene) =>{
    const player =scene.physics.add.sprite(200,200,'fausto_idle');
    

    creatAnimations(scene);
    return player


}

export const loadSprites = (scene: Phaser.Scene):void =>{
    scene.load.spritesheet('fausto_idle','./assets/fausto/fausto-parado.png',{
        frameWidth: 47,
        frameHeight:60
        
    });

    scene.load.spritesheet('fausto_left','./assets/fausto/faustoLeft.png',{
        frameWidth: 47,
        frameHeight: 60,
        spacing: 20
    });

    scene.load.spritesheet('fausto_right','./assets/fausto/faustoRight.png',{
        frameWidth: 47,
        frameHeight: 62,
        spacing: 20
        
    });

    scene.load.spritesheet('fausto_up','./assets/fausto/faustoUp.png',{
        frameWidth: 47,
        frameHeight: 62,
        spacing: 20
        

    });

    scene.load.spritesheet('fausto_down','./assets/fausto/faustoDown.png',{
        frameWidth: 47,
        frameHeight: 62,
        spacing: 20
        

    });


};

export const creatAnimations =(scene:Phaser.Scene):void =>{

    scene.anims.create({
        key:'fausto_idle',
        frames:scene.anims.generateFrameNames('fausto_idle',{
            start:0,
            end:0
        })
    })


    scene.anims.create({
        key:'fausto_left',
        frames:scene.anims.generateFrameNames('fausto_left',{
            start: 0,
            end:5

        }),
        frameRate:18, //x3
        repeat: -1,
        yoyo:true
    });


    scene.anims.create({
        key:'fausto_right',
        frames:scene.anims.generateFrameNames('fausto_right',{
            start: 0,
            end:6

        }),
        frameRate:21, //x3
        repeat: -1,
        yoyo:true
    });


    scene.anims.create({
        key:'fausto_up',
        frames:scene.anims.generateFrameNames('fausto_up',{
            start: 0,
            end:6

        }),
        frameRate:21, //x3
        repeat: -1,
        yoyo:true
    });

    scene.anims.create({
        key:'fausto_down',
        frames:scene.anims.generateFrameNames('fausto_down',{
            start: 0,
            end:5

        }),
        frameRate:24,//x3
        repeat: -1,
        yoyo:true
    });

    scene.anims.create({
        key:'fausto_atk',
        frames:scene.anims.generateFrameNames('fausto_atk',{
            start: 0,
            end:6

        }),
        frameRate:24,//x3
        repeat: -1,
        yoyo:true
    });




}

