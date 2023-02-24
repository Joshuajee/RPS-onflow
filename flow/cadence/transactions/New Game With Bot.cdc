import RPSGAME from 0x01

transaction {

    prepare(acct: AuthAccount) {
        let createPVE <- RPSGAME.createPVE()
     
        let game = createPVE.play(move: RPSGAME.GameMove.paper)
        acct.save(<-createPVE, to: RPSGAME.PlayingBotStoragePath)

        // create a public capability for the Games
        let capability = acct.link<&RPSGAME.Games>(RPSGAME.PlayingBotPublicPath, target: RPSGAME.PlayingBotStoragePath)   
    }

}