import RPSGAME from 0x01

transaction {

    prepare(acct: AuthAccount) {
        let game <- acct.load<@RPSGAME.GamePVE>(from: RPSGAME.PlayingBotStoragePath)
        
        let play =  game?.play(move: RPSGAME.GameMove.paper)

        log(play)

        if (play?.gameStatus == RPSGAME.FinalGameStatus.playing) {
            acct.save(<-game!, to: RPSGAME.PlayingBotStoragePath)
        } else {
            let gamesRef = acct.getCapability<&{RPSGAME.GamesCollectionInterface}>(RPSGAME.GamesPublicPath)
                .borrow()?? panic("Could not borrow receiver reference")
            
            gamesRef.addPVE(game: <-game!)
        }
    }

    execute {

    }

}