namespace SpriteKind {
    export const Particle = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    levelCatch(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    levelCatch(2)
})
function levelCatch (lvl: number) {
    if (lvl == 0) {
        tiles.setCurrentTilemap(tilemap`level1`)
        tiles.placeOnTile(playerSprite, tiles.getTileLocation(0, 6))
        sprites.destroyAllSpritesOfKind(SpriteKind.Particle)
    }
    if (lvl == 1) {
        tiles.setCurrentTilemap(tilemap`level2`)
        tiles.placeOnTile(playerSprite, tiles.getTileLocation(2, 3))
        sprites.destroyAllSpritesOfKind(SpriteKind.Particle)
    }
    if (lvl == 2) {
        tiles.setCurrentTilemap(tilemap`level4`)
        tiles.placeOnTile(playerSprite, tiles.getTileLocation(1, 14))
        sprites.destroyAllSpritesOfKind(SpriteKind.Particle)
    }
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (playerSprite.isHittingTile(CollisionDirection.Bottom)) {
        canDash = true
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    canDash = true
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerSprite.isHittingTile(CollisionDirection.Bottom)) {
        playerSprite.vy = -150
    } else {
        if (canDash == true) {
            playerSprite.vy = -300
            scene.cameraShake(4, 200)
            for (let index = 0; index < 40; index++) {
                if (!(playerSprite.isHittingTile(CollisionDirection.Bottom))) {
                    dashParticle1 = sprites.create(img`
                        . 1 . 
                        1 1 1 
                        . 1 . 
                        `, SpriteKind.Particle)
                    dashParticle1.setPosition(playerSprite.x, playerSprite.y)
                    dashParticle1.setVelocity(0, 25)
                    dashParticle1.setFlag(SpriteFlag.AutoDestroy, true)
                    dashParticle1.setFlag(SpriteFlag.GhostThroughSprites, true)
                    dashParticle1.setFlag(SpriteFlag.GhostThroughTiles, true)
                    dashParticle1.setFlag(SpriteFlag.GhostThroughWalls, true)
                    animation.runImageAnimation(
                    dashParticle1,
                    [img`
                        . 1 . 
                        1 . 1 
                        . 1 . 
                        `,img`
                        1 . 1 
                        . 1 . 
                        1 . 1 
                        `],
                    150,
                    true
                    )
                    pause(10)
                }
            }
            canDash = false
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    playerSprite.setVelocity(0, 0)
    playerSprite.ay = 0
    controller.moveSprite(playerSprite, 0, 0)
    color.startFade(color.originalPalette, color.Black)
    pause(1000)
    game.gameOver(true)
})
let dashParticle1: Sprite = null
let canDash = false
let playerSprite: Sprite = null
playerSprite = sprites.create(img`
    1 1 1 1 1 
    1 1 1 1 1 
    1 1 1 1 1 
    1 1 1 1 1 
    1 1 1 1 1 
    `, SpriteKind.Player)
controller.moveSprite(playerSprite, 150, 0)
scene.cameraFollowSprite(playerSprite)
playerSprite.ay = 500
canDash = true
levelCatch(0)
