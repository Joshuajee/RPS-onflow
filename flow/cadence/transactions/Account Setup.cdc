import RPSGAME from 0x01

// This transaction configures a user's account
// to use the NFT contract by creating a new empty Games,
// storing it in their account storage, and publishing a capability
transaction {
    prepare(acct: AuthAccount) {

        // Create a new empty Games
        let games <- RPSGAME.createEmptyGame(name: "Jee")

        // store the empty Account in account storage
        acct.save<@RPSGAME.Games>(<-games, to: RPSGAME.GamesStoragePath)

        log("Games created for account 2")

        // create a public capability for the Games
        let capability = acct.link<&RPSGAME.Games>(RPSGAME.GamesPublicPath, target: RPSGAME.GamesStoragePath)

        log("Capability created")
    }
}