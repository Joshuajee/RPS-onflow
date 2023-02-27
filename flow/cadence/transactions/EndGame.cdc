import RPSGAME from 0x01
import RPSToken from 0x01

transaction {

    prepare(acct: AuthAccount) {

        let game <- acct.load<@RPSGAME.GamePVE>(from: RPSGAME.PlayingBotStoragePath)
    
        let gamesRef = acct.getCapability<&{RPSGAME.GamesCollectionInterface}>(RPSGAME.GamesPublicPath)
        .borrow()?? panic("Could not borrow receiver reference")
        
        let rewardedGame <- RPSToken.claimRewardGamePVE(game: <- game!, account: acct)
        
        gamesRef.addPVE(game: <-rewardedGame!)

    }

}
