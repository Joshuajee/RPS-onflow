import RPSGAME from 0x01

transaction {

    prepare(acct: AuthAccount) {
        let game <- acct.load<@RPSGAME.GamePVE>(from: RPSGAME.PlayingBotStoragePath)
        
        let play =  game?.play(move: RPSGAME.GameMove.paper)

        acct.save(<-game!, to: RPSGAME.PlayingBotStoragePath)

        log(play)
    }

}