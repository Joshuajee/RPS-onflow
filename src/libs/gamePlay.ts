import { GAME_STATUS, PLAYER_MOVE } from "./constants"


export const rules = (playerMove: PLAYER_MOVE, opponentMove: PLAYER_MOVE) => {

    switch (playerMove) {
        case PLAYER_MOVE.ROCK:
            console.log("rock ", rock(opponentMove))
            return rock(opponentMove)
        case PLAYER_MOVE.PAPER:
            return paper(opponentMove)
        case PLAYER_MOVE.SCISSORS:
            return rock(opponentMove)
        default:
            return GAME_STATUS.DRAW
    }

}

export const rock = (move: PLAYER_MOVE) => {
    switch (move) {
        case PLAYER_MOVE.ROCK:
            return GAME_STATUS.DRAW
        case PLAYER_MOVE.PAPER:
            return GAME_STATUS.OPPONENT_WON
        case PLAYER_MOVE.SCISSORS:
            return GAME_STATUS.PLAYER_WON
        default:
            return GAME_STATUS.DRAW
    }
}


export const paper = (move: PLAYER_MOVE) => {
    switch (move) {
        case PLAYER_MOVE.ROCK:
            return GAME_STATUS.PLAYER_WON
        case PLAYER_MOVE.PAPER:
            return GAME_STATUS.DRAW
        case PLAYER_MOVE.SCISSORS:
            return GAME_STATUS.OPPONENT_WON
        default:
            return GAME_STATUS.DRAW
    }
}


export const scissors = (move: PLAYER_MOVE) => {
    switch (move) {
        case PLAYER_MOVE.ROCK:
            return GAME_STATUS.OPPONENT_WON
        case PLAYER_MOVE.PAPER:
            return GAME_STATUS.PLAYER_WON
        case PLAYER_MOVE.SCISSORS:
            return GAME_STATUS.DRAW
        default:
            return GAME_STATUS.DRAW
    }
}
