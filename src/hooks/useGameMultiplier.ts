import getMultiplierGame from '@/flow/scripts/getMultiplierGame';
import playGameMultiplier from '@/flow/transactions/playGameMultiplier';
import { FINAL_GAME_STATUS, GAME_STATUS, PLAYER_MOVE } from '@/libs/constants';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const useGameMultiplier = (address: string, id: number, addr: string, loadProfile: () => void) => {

    const player = address === addr

    const [round, setRound] = useState(0)
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.START)
    const [playerWins, setPlayerWins] = useState(0)
    const [opponentWins, setOpponentWins] = useState(0)
    const [opponentMove, setOpponentMove] = useState(PLAYER_MOVE.NONE)
    const [tokens, setTokens] = useState(0)

    const [gameWinner, setGameWinner] = useState(FINAL_GAME_STATUS.PLAYING)

    const [host, setHost] = useState(null)
    
    const init = useCallback(() => {
        loadProfile()
        setRound(0)
        setGameStatus(GAME_STATUS.START)
        setPlayerWins(0)
        setOpponentWins(0)
        setOpponentMove(PLAYER_MOVE.NONE)
        setGameWinner(FINAL_GAME_STATUS.PLAYING)
    }, [loadProfile])

    const fetchState = useCallback(async() => {

        if (address) {

            try {

                const getActiveGame = await getMultiplierGame(id)

                if (!getActiveGame) {   
                    init()
                } else {

                    const playerMove = getActiveGame?.playerMoves[getActiveGame?.playerMoves.length - 1]?.rawValue 
                    
                    const opponentMove = getActiveGame?.opponentMoves[getActiveGame?.opponentMoves.length - 1]?.rawValue
                    
                    const battleResults = getActiveGame?.battleResults
                    const battleResult = battleResults[battleResults.length - 1]?.rawValue

                    const host = getActiveGame?.host

                    setRound(getActiveGame?.rounds)
                    setGameStatus(battleResult)
                    setHost(host)

                    if (host === address) {
                        setPlayerWins(getActiveGame?.wins)
                        setOpponentWins(getActiveGame?.loses)
                        setOpponentMove(opponentMove)
                        setGameWinner(getActiveGame?.gameStatus?.rawValue)
                        setTokens(getActiveGame?.tokens)
                    } else {
                        setPlayerWins(getActiveGame?.loses)
                        setOpponentWins(getActiveGame?.wins)
                        setOpponentMove(playerMove)
                        setGameWinner(getActiveGame?.gameStatus?.rawValue)
                        setTokens(getActiveGame?.tokens)
                    }

                }

            } catch (e) {
                console.error(e)
            }
            
        }

    }, [address, id, init])

    const play = useCallback (async(move: PLAYER_MOVE) => {
        try  {
            await playGameMultiplier(id, move, player)
        } catch (e) {
            toast.error("Error recording your move")
            console.error(e)
        }
    }, [id, player])

    useEffect(() => {  
        fetchState()
    }, [fetchState])

    useEffect(() => {
        const interval = setInterval(() => {
            fetchState()
        }, 5000)
        return () => clearInterval(interval)
    }, [fetchState])

    useEffect(() => {
        if (playerWins >= 2) {
            setGameWinner(FINAL_GAME_STATUS.PLAYER_WON)
        } else if (opponentWins >= 2 ) {
            setGameWinner(FINAL_GAME_STATUS.OPPONENT_WON)
        } 
    }, [playerWins, opponentWins])

    return { round, host, tokens, gameStatus, opponentMove, playerWins, opponentWins, gameWinner, play, fetchState, init, setOpponentMove }
}


export default useGameMultiplier