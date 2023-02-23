pub contract RPSGAME {

    pub let GamesStoragePath: StoragePath
    pub let GamesPublicPath: PublicPath
    pub let PlayingBotStoragePath: StoragePath
    pub let PlayingBotPublicPath: PublicPath

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
    }

    pub enum FinalGameStatus: UInt8 {
        pub case playing
        pub case won
        pub case lost
    }

    pub struct GameStatus {
        pub let playerMove: GameMove
        pub let opponentMove: GameMove
        pub let wins: UInt64
        pub let loses: UInt64
        pub let round: UInt64
        pub let gameStatus: FinalGameStatus
        init(playerMove: GameMove, opponentMove: GameMove, wins: UInt64, loses: UInt64, round: UInt64, gameStatus: FinalGameStatus) {
            self.playerMove = playerMove
            self.opponentMove = opponentMove
            self.wins = wins
            self.loses = loses
            self.round = round
            self.gameStatus = gameStatus
        }
    }

    pub resource interface GamesCollectionInterface {
        pub fun addPVE(game: @GamePVE)
        pub fun getIDs(): [UInt64]
        pub fun idExists(id: UInt64): Bool
        pub fun getGamePVE(id: UInt64): @GamePVE
    }

    pub resource interface GameInterface {
        pub let id: UInt64
        pub var rounds: UInt64
        pub fun play (move: GameMove): GameStatus
        pub fun rock (move: GameMove): GameState 
        pub fun paper(move: GameMove): GameState 
        pub fun scissors(move: GameMove): GameState 
    }

    pub resource GamePVE: GameInterface {
    
        pub let id: UInt64
        pub var rounds: UInt64
        pub var wins: UInt64
        pub var loses: UInt64
        pub var gameStatus: FinalGameStatus
    
        init (id: UInt64) {
            self.id = id
            self.rounds = 0
            self.wins = 0
            self.loses = 0
            self.gameStatus = FinalGameStatus.playing
        }

        pub fun play (move: GameMove): GameStatus {
            
            if (self.gameStatus != FinalGameStatus.playing) { 
                return GameStatus(
                    playerMove: GameMove.rock, 
                    opponentMove: GameMove.rock, 
                    wins: self.wins, 
                    loses: self.loses, 
                    round: self.rounds,
                    gameStatus: self.gameStatus
                )
            }

            self.rounds = self.rounds + 1
            let botMove = self.getMoveFromInt(move: Int(unsafeRandom() % 3)) 
            let gameStatus = self.rules(playerMove: move, opponentMove: botMove)
            
            switch (gameStatus) {
                case GameState.won:
                    self.wins = self.wins + 1
                    if (self.wins >= 2) {
                        self.gameStatus = FinalGameStatus.won
                    }
                    break
                case GameState.lost:
                    self.loses = self.loses + 1
                    if (self.loses >= 2) {
                        self.gameStatus = FinalGameStatus.lost
                    }
                    break
                default:
                    log("draw")
            }

            if (self.gameStatus != FinalGameStatus.playing) { 

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

    }

    pub resource Games: GamesCollectionInterface {

        pub var games: @{UInt64: GamePVE}
        pub var won: UInt64
        pub var lost: UInt64

        init () {
            self.games <- {}
            self.won = 0
            self.lost = 0
        }

        pub fun idExists(id: UInt64): Bool {
            return self.games[id] != nil
        }

        pub fun getIDs(): [UInt64] {
            return self.games.keys
        }

        destroy() {
            destroy self.games
        }

        // add game to games collection
        pub fun addPVE(game: @GamePVE) {
            self.games[game.id] <-! game
        }

        // get game and move to context
        pub fun getGamePVE(id: UInt64): @GamePVE {
            let game <- self.games.remove(key: id)
                ?? panic("Cannot get the specified game id")
            return <-game
        }

    }

    // creates a new empty Game resource and returns it
    pub fun createEmptyGame(): @Games {
        return <- create Games()
    }

    // start game with environment
    pub fun createPVE(): @GamePVE {
        // create a new NFT
        var newGame <- create GamePVE(id: self.idCount)
        // change the id so that each ID is unique
        self.idCount = self.idCount + 1
        return <-newGame
    }

    init() {
        self.GamesStoragePath = /storage/games
        self.GamesPublicPath = /public/games
        self.PlayingBotStoragePath = /storage/playingbot
        self.PlayingBotPublicPath = /public/playingbot


        // initialize the ID count to one
        self.idCount = 0

        // store an empty Games Collection in account storage
        self.account.save(<-self.createEmptyGame(), to: self.GamesStoragePath)

        // publish a reference to the Collection in storage
        self.account.link<&{GamesCollectionInterface}>(self.GamesPublicPath, target: self.GamesStoragePath)
	}


}
