import RPSToken from ${contract}
import RPSGAME from ${contract}

transaction {

    prepare(acct: AuthAccount) {

        let game <- RPSToken.newGamePVE(move: ${getCadenceMove(move)})

        acct.save(<-game, to: RPSGAME.PlayingBotStoragePath)

        // create a public capability for the Game PVE
        let capability = acct.link<&RPSGAME.GamePVE>(RPSGAME.PlayingBotPublicPath, target: RPSGAME.PlayingBotStoragePath)   

        log("Game Created successfully")
        log(RPSGAME.GameMove.paper)
    }

}