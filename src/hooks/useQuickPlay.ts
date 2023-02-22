import { FINAL_GAME_STATUS, GAME_STATUS, PLAYER_MOVE } from '@/libs/constants';
import { rules } from '@/libs/gamePlay';
import { FILE } from 'dns';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useQuickPlay = () => {

    const [round, setRound] = useState(0)
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.START)
    const [playerWins, setPlayerWins] = useState(0)
    const [opponentWins, setOpponentWins] = useState(0)
    const [opponentMove, setOpponentMove] = useState(PLAYER_MOVE.NONE)

    const [gameWinner, setGameWinner] = useState(FINAL_GAME_STATUS.PLAYING)



    const play = (move: PLAYER_MOVE) => {

        const opponentMove = (Math.floor(Math.random() * 3)) as PLAYER_MOVE;

        const gameStatus = rules(move, opponentMove)

        setGameStatus(gameStatus)

        if (opponentMove !== null) setOpponentMove(opponentMove as PLAYER_MOVE)

        switch (gameStatus) {
            case GAME_STATUS.PLAYER_WON:
                setPlayerWins(x => x + 1)
                break
            case GAME_STATUS.OPPONENT_WON:
                setOpponentWins(x => x + 1)
                break
            default:
                console.log("draw")
        }

        setRound(x => x + 1)

    }

    const init = () => {
        setRound(0)
        setGameStatus(GAME_STATUS.START)
        setPlayerWins(0)
        setOpponentWins(0)
        setOpponentMove(PLAYER_MOVE.NONE)
        setGameWinner(FINAL_GAME_STATUS.PLAYING)
    }

    useEffect(() => {
        if (playerWins >= 2) {
            setGameWinner(FINAL_GAME_STATUS.PLAYER_WON)
        } else if (opponentWins >= 2 ) {
            setGameWinner(FINAL_GAME_STATUS.OPPONENT_WON)
        } 
    }, [playerWins, opponentWins])

    return { round, gameStatus, opponentMove, playerWins, opponentWins, gameWinner, play, init }
}


export default useQuickPlay
