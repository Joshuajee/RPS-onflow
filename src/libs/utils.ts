import { GAME_STATUS, PLAYER_MOVE } from "./constants"

export const dollarFormat = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export const gameStatusStr = (staus: GAME_STATUS) : string => {
    switch (staus) {
        case GAME_STATUS.START:
            return "START GAME"
        case GAME_STATUS.DRAW:
            return "DRAW"
        case GAME_STATUS.PLAYER_WON:
            return "YOU WON"
        case GAME_STATUS.OPPONENT_WON:
            return "YOU LOST"
        default:
            return "START GAME"
    }

}

export const getMoveStr = (move: PLAYER_MOVE) : string => {
    switch (move) {
        case PLAYER_MOVE.ROCK:
            return "ROCK"
        case PLAYER_MOVE.PAPER:
            return "PAPER"
        case PLAYER_MOVE.SCISSORS:
            return "SCISSORS"
        default:
            return ""
    }

}


export const contract = process.env.NEXT_PUBLIC_CONTRACT_ACCT 
