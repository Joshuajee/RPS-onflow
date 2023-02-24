import RPSGAME from 0x01

transaction {

    prepare(acct: AuthAccount) {

        let game <- acct.load<@RPSGAME.GamePVE>(from: RPSGAME.PlayingBotStoragePath)
        
        let gamesRef = acct.getCapability<&{RPSGAME.GamesCollectionInterface}>(RPSGAME.GamesPublicPath)
            .borrow()?? panic("Could not borrow receiver reference")
        
        gamesRef.addPVE(game: <-game!)

    }

}