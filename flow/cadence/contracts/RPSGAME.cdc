pub contract RPSGAME {

    // Events
    pub event CreatedGamePVE(id: UInt64)

    // Match Events
    pub event CreateMatch(id: UInt64, host: Address, hostStake: UFix64, opponentStake: UFix64)
    pub event JoinMatch(id: UInt64, address: Address)
    pub event CreatedGamePVP(id: UInt64, address: Address)

    pub let GamesStoragePath: StoragePath
    pub let GamesPublicPath: PublicPath
    pub let PlayingBotStoragePath: StoragePath
    pub let PlayingBotPublicPath: PublicPath
    pub let MatchStoragePath: StoragePath
    pub let MatchPublicPath: PublicPath
    pub let PlayingHumanStoragePath: StoragePath
    pub let PlayingHumanPublicPath: PublicPath
    pub let AdminMatchStoragePath: StoragePath
    pub let AdminMatchPublicPath: PublicPath

    pub var idCount: UInt64

    // state of the game
    pub enum GameState: UInt8 {
        pub case start
        pub case draw
        pub case won
        pub case lost
    }

    pub enum PlayerState: UInt8 {
        pub case draw
        pub case won
        pub case lost
    }

    pub enum GameMove: UInt8 {
        pub case rock
        pub case paper
        pub case scissors
        pub case none
    }

    pub enum FinalGameStatus: UInt8 {
        pub case playing
        pub case won
        pub case lost
    }

    pub struct GameStatus {
        pub let playerMove: GameMove
        pub let opponentMove: GameMove
        pub let wins: UInt8
        pub let loses: UInt8
        pub let round: UInt8
        pub let gameStatus: FinalGameStatus
        init(playerMove: GameMove, opponentMove: GameMove, wins: UInt8, loses: UInt8, round: UInt8, gameStatus: FinalGameStatus) {
            self.playerMove = playerMove
            self.opponentMove = opponentMove
            self.wins = wins
            self.loses = loses
            self.round = round
            self.gameStatus = gameStatus
        }
    }

    pub resource interface GamesCollectionInterface {
        pub let name: String
        pub fun addPVE(game: @GamePVE)
        pub fun getIDs(): [UInt64]
        pub fun idExists(id: UInt64): Bool
    }

    pub resource interface GameInterface {
        pub let id: UInt64
        pub let battleResults: [GameState] 
        pub var rounds: UInt8
        pub var wins: UInt8
        pub var loses: UInt8
        pub var playerMoves: [GameMove] 
        pub var opponentMoves: [GameMove] 
        pub var claimed: Bool
    }

    pub resource interface GameInterfacePrivate {
        pub fun play (move: GameMove): GameStatus
        pub fun rock (move: GameMove): GameState 
        pub fun paper(move: GameMove): GameState 
        pub fun scissors(move: GameMove): GameState 
        pub fun rules (playerMove: GameMove, opponentMove: GameMove): GameState 
        pub fun getMoveFromInt(move: Int): GameMove
        pub let tokens: UFix64
        pub fun endGame ()
    }


    pub resource interface GameMatchInterface {
        pub fun opponentPlay(move: GameMove)
    }

    // player vs environment
    pub resource GamePVE: GameInterface, GameInterfacePrivate {
    
        pub let id: UInt64
        pub let battleResults: [GameState]
        pub var rounds: UInt8
        pub var wins: UInt8
        pub var loses: UInt8
        pub var gameStatus: FinalGameStatus
        pub var playerMoves: [GameMove] 
        pub var opponentMoves: [GameMove]
        pub let tokens: UFix64 
        pub var claimed: Bool
        
    
        init (id: UInt64, tokens: UFix64) {
            self.id = id
            self.rounds = 0
            self.wins = 0
            self.loses = 0
            self.gameStatus = FinalGameStatus.playing
            self.playerMoves = []
            self.opponentMoves = []
            self.battleResults = []
            self.tokens = tokens
            self.claimed = false
        }

        pub fun play (move: GameMove): GameStatus {

            pre {
                self.gameStatus == FinalGameStatus.playing: "Game Over"
            }

            self.rounds = self.rounds + 1
            let botMove = self.getMoveFromInt(move: Int(unsafeRandom() % 3)) 
            let gameStatus = self.rules(playerMove: move, opponentMove: botMove)

            // recording moves
            self.playerMoves.append(move)
            self.opponentMoves.append(botMove)
            
            switch (gameStatus) {
                case GameState.won:
                    self.wins = self.wins + 1
                    self.battleResults.append(GameState.won)
                    if (self.wins >= 2) {
                        self.gameStatus = FinalGameStatus.won
                    }
                    break
                case GameState.lost:
                    self.loses = self.loses + 1
                    self.battleResults.append(GameState.lost)
                    if (self.loses >= 2) {
                        self.gameStatus = FinalGameStatus.lost
                    }
                    break
                default:
                    self.battleResults.append(GameState.draw)
                    log("draw")
            }

            return GameStatus(
                playerMove: move, 
                opponentMove: botMove, 
                wins: self.wins, 
                loses: self.loses, 
                round: self.rounds,
                gameStatus: self.gameStatus
            )

        }

        // rock logic
        pub fun rock (move: GameMove): GameState {
            switch (move) {
                case GameMove.rock:
                    return GameState.draw
                case GameMove.paper:
                    return GameState.lost
                case GameMove.scissors:
                    return GameState.won
                default:
                    return  GameState.draw
            }
        }

        // paper logic
        pub fun paper(move: GameMove): GameState {
            switch (move) {
                case GameMove.rock:
                    return GameState.won
                case GameMove.paper:
                    return GameState.draw
                case GameMove.scissors:
                    return GameState.lost
                default:
                    return GameState.draw
            }
        }

        // scissors logic
        pub fun scissors(move: GameMove): GameState {
            switch (move) {
                case GameMove.rock:
                    return GameState.lost
                case GameMove.paper:
                    return GameState.won
                case GameMove.scissors:
                    return GameState.draw
                default:
                    return GameState.draw
            }
        }

        // rules logic
        pub fun rules (playerMove: GameMove, opponentMove: GameMove): GameState {
            switch (playerMove) {
                case GameMove.rock:
                    return self.rock(move:opponentMove)
                case GameMove.paper:
                    return self.paper(move: opponentMove)
                case GameMove.scissors:
                    return self.scissors(move: opponentMove)
                default:
                    return GameState.draw
            }
        }

        pub fun getMoveFromInt(move: Int): GameMove {
            switch(move) {
                case 0:
                    return  GameMove.rock
                case 1:
                    return  GameMove.paper
                case 2:
                    return  GameMove.scissors
                default:
                    return  GameMove.rock
            }
        }

        pub fun endGame () {
            self.claimed = false
        }
 
    }


    pub resource Match: GameInterface, GameMatchInterface {

        pub let id: UInt64
        pub let host: Address
        pub var opponent: Address
        pub var hostStake: UFix64
        pub var opponentStake: UFix64
        pub var opponentJoined: Bool
        pub let battleResults: [GameState]
        pub var rounds: UInt8
        pub var wins: UInt8
        pub var loses: UInt8
        pub var gameStatus: FinalGameStatus
        pub var playerMoves: [GameMove] 
        pub var opponentMoves: [GameMove]
        pub var claimed: Bool
        pub var playerMove: GameMove
        pub var opponentMove: GameMove

        init (id: UInt64, host: Address, hostStake: UFix64, opponentStake: UFix64) {
            self.id = id
            self.host = host
            self.opponent = host
            self.hostStake = hostStake
            self.opponentStake = opponentStake
            self.opponentJoined = false
            self.rounds = 0
            self.wins = 0
            self.loses = 0
            self.gameStatus = FinalGameStatus.playing
            
            self.playerMoves = []
            self.playerMove = GameMove.none
            self.opponentMove = GameMove.none
            self.opponentMoves = []
            self.battleResults = []
            self.claimed = false
        }

        pub fun join(opponent: Address, stake: UFix64) {
            self.opponent = opponent
            self.opponentStake = stake
            self.opponentJoined = true
            emit JoinMatch(id: self.id, address: opponent)
        }

        pub fun play (move: GameMove) {

            pre {
                self.gameStatus == FinalGameStatus.playing: "Game Over"
                self.playerMove == GameMove.none: "Not your turn"
            }

            self.playerMove = move

            self.judge()
        }

        pub fun opponentPlay (move: GameMove) {

            pre {
                self.gameStatus == FinalGameStatus.playing: "Game Over"
                self.opponentMove == GameMove.none: "Not your turn"
            }

            self.opponentMove = move

            self.judge()

        }

        pub fun judge () {

            let playerMove = self.playerMove
            let opponentMove = self.opponentMove

            if (playerMove != GameMove.none && opponentMove != GameMove.none) {

                let gameStatus = self.rules(playerMove: playerMove, opponentMove: opponentMove)

                // recording moves
                self.playerMoves.append(playerMove)
                self.opponentMoves.append(opponentMove)

                // resetting move
                self.playerMove = GameMove.none
                self.opponentMove = GameMove.none

                self.rounds = self.rounds + 1
                
                switch (gameStatus) {
                    case GameState.won:
                        self.battleResults.append(GameState.won)
                        if (self.wins >= 2) {
                            self.gameStatus = FinalGameStatus.won
                        }
                        break
                    case GameState.lost:
                        self.loses = self.loses + 1
                        self.battleResults.append(GameState.lost)
                        if (self.loses >= 2) {
                            self.gameStatus = FinalGameStatus.lost
                        }
                        break
                    default:
                        self.battleResults.append(GameState.draw)
                        log("draw")
                
                }

            }

        }

        // rock logic
        pub fun rock (move: GameMove): GameState {
            switch (move) {
                case GameMove.rock:
                    return GameState.draw
                case GameMove.paper:
                    return GameState.lost
                case GameMove.scissors:
                    return GameState.won
                default:
                    return  GameState.draw
            }
        }

        // paper logic
        pub fun paper(move: GameMove): GameState {
            switch (move) {
                case GameMove.rock:
                    return GameState.won
                case GameMove.paper:
                    return GameState.draw
                case GameMove.scissors:
                    return GameState.lost
                default:
                    return GameState.draw
            }
        }

        // scissors logic
        pub fun scissors(move: GameMove): GameState {
            switch (move) {
                case GameMove.rock:
                    return GameState.lost
                case GameMove.paper:
                    return GameState.won
                case GameMove.scissors:
                    return GameState.draw
                default:
                    return GameState.draw
            }
        }

        // rules logic
        pub fun rules (playerMove: GameMove, opponentMove: GameMove): GameState {
            switch (playerMove) {
                case GameMove.rock:
                    return self.rock(move:opponentMove)
                case GameMove.paper:
                    return self.paper(move: opponentMove)
                case GameMove.scissors:
                    return self.scissors(move: opponentMove)
                default:
                    return GameState.draw
            }
        }

        pub fun getMoveFromInt(move: Int): GameMove {
            switch(move) {
                case 0:
                    return  GameMove.rock
                case 1:
                    return  GameMove.paper
                case 2:
                    return  GameMove.scissors
                default:
                    return  GameMove.rock
            }
        }

        pub fun endGame () {
            self.claimed = false
        }

    }

    pub resource Games: GamesCollectionInterface {

        pub var games: @{UInt64: GamePVE}
        pub var won: UInt64
        pub var lost: UInt64
        pub let name: String

        init (name: String) {
            self.games <- {}
            self.won = 0
            self.lost = 0
            self.name = name
        }

        pub fun idExists(id: UInt64): Bool {
            return self.games[id] != nil
        }

        pub fun getIDs(): [UInt64] {
            return self.games.keys
        }

        // add game to games collection
        pub fun addPVE(game: @GamePVE) {
            if (game.gameStatus == FinalGameStatus.won) {
                self.won = self.won + 1
            } else {
                self.lost = self.lost + 1
            }
            self.games[game.id] <-! game
        }

        destroy() {
            destroy self.games
        }

    }

    pub resource PVPGame {
        pub var matchId: UInt64
        pub var opponentJoined: Bool
        pub var host: Address
        pub var opponent: Address
        
        init(matchId: UInt64, host: Address) {
            self.matchId = matchId
            self.opponentJoined = false
            self.host = host
            self.opponent = host
        }

        pub fun join (match: &Match, opponent: Address, stake: UFix64) {
            self.opponent = opponent
            self.opponentJoined = true
            match.join(opponent: opponent, stake: stake)
        }
    }


    pub resource Challenge {

        pub var games: @{UInt64: Match}

        init () {
            self.games <- {}
        }

        pub fun idExists(id: UInt64): Bool {
            return self.games[id] != nil
        }

        pub fun getIDs(): [UInt64] {
            return self.games.keys
        }

        // add game to games collection
        pub fun addGame(game: @Match) {
            self.games[game.id] <-! game
        }

        // return game collection
        pub fun returnGame(id: UInt64): &Match? {
            return &self.games[id] as &Match?
        }

        destroy() {
            destroy self.games
        }

    }


    // creates a new empty Game resource and returns it
    pub fun createEmptyGame(name: String): @Games {
        return <- create Games(name: name)
    }

    // start game with environment
    pub fun createPVE(tokens: UFix64): @GamePVE {
        // create a new NFT
        var newGame <- create GamePVE(id: self.idCount, tokens: tokens)
        // change the id so that each ID is unique
        emit CreatedGamePVE(id: self.idCount)
        self.idCount = self.idCount + 1
        return <-newGame
    }

    // create match
    pub fun createMatch(host: Address, hostStake: UFix64, opponentStake: UFix64): @Match {
        let id = self.idCount
        // create a new NFT
        var newGame <- create Match(id: id, host: host, hostStake: hostStake, opponentStake: opponentStake)
        // change the id so that each ID is unique
        self.idCount = self.idCount + 1
        emit CreateMatch(id: id, host: host, hostStake: hostStake, opponentStake: opponentStake)
        return <-newGame
    }

    pub fun createGameHost(matchId: UInt64, host: Address): @PVPGame {
        return  <- create PVPGame(matchId: matchId, host: host)
    }

    pub fun dynamicStoragePath (path: StoragePath): StoragePath {
        return path
    }

    init() {

        self.GamesStoragePath = /storage/games
        self.GamesPublicPath = /public/games
        self.PlayingBotStoragePath = /storage/playingbot
        self.PlayingBotPublicPath = /public/playingbot
        self.MatchStoragePath = /storage/match
        self.MatchPublicPath = /public/match
        self.PlayingHumanStoragePath = /storage/playingbot
        self.PlayingHumanPublicPath  = /public/playingbot
        self.AdminMatchStoragePath = /storage/admin_match
        self.AdminMatchPublicPath = /public/admin_match


        self.idCount = 0

        let challenge <- create Challenge()

        self.account.save(<- challenge, to: self.AdminMatchStoragePath)

        self.account.link<&Challenge>(self.AdminMatchPublicPath, target: self.AdminMatchStoragePath)

	}

}
 