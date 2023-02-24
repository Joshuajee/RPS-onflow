import * as fcl from "@onflow/fcl";
import getActiveGamePVE from '@/flow/scripts/getActiveGamePVE';
import newGameWithBot from '@/flow/transactions/newGameWithBot';
import playGamePVE from '@/flow/transactions/playGamePVE';
import { FINAL_GAME_STATUS, GAME_STATUS, PLAYER_MOVE } from '@/libs/constants';
import { rules } from '@/libs/gamePlay';
import { useState, useEffect, useCallback } from 'react';

const useGamePVEPlay = (address: string) => {

    const [newGame, setNewGame] = useState(true)

    const [round, setRound] = useState(0)
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.START)
    const [playerWins, setPlayerWins] = useState(0)
    const [opponentWins, setOpponentWins] = useState(0)
    const [opponentMove, setOpponentMove] = useState(PLAYER_MOVE.NONE)

    const [gameWinner, setGameWinner] = useState(FINAL_GAME_STATUS.PLAYING)


    const fetchState = useCallback(async () => {

        if (address) {

            try {

                const getActiveGame = await getActiveGamePVE(address)

                console.log(getActiveGame)

                if (!getActiveGame) {   
                    setRound(0)
                    setGameStatus(GAME_STATUS.START)
                    setPlayerWins(0)
                    setOpponentWins(0)
                    setOpponentMove(PLAYER_MOVE.NONE)
                    setGameWinner(FINAL_GAME_STATUS.PLAYING)
                    setNewGame(true)
                } else {
                    
                    const opponentMove = getActiveGame?.opponentMoves[getActiveGame?.opponentMoves.length - 1]?.rawValue
                    
                    const battleResults = getActiveGame?.battleResults
                    const battleResult = battleResults[battleResults.length - 1]?.rawValue

                    console.log(battleResult)
                    
                    setRound(getActiveGame?.rounds)
                    setGameStatus(battleResult)
                    setPlayerWins(getActiveGame?.wins)
                    setOpponentWins(getActiveGame?.loses)
                    setOpponentMove(opponentMove)
                    setGameWinner(getActiveGame?.gameStatus?.rawValue)

                    setNewGame(false)
                }

            } catch (e) {
                console.error(e)
            }
            
        }

    }, [address])


    const play = useCallback (async(move: PLAYER_MOVE) => {

        if (newGame) {
            try  {
                await newGameWithBot(move, fetchState)
            } catch (e) {
                console.error(e)
            }
        } else {
            try  {
                await playGamePVE(move, fetchState)
            } catch (e) {
                console.error(e)
            }
        }

    }, [newGame, fetchState])

    useEffect(() => {  
        fetchState()
    }, [fetchState])

    useEffect(() => {
        if (playerWins >= 2) {
            setGameWinner(FINAL_GAME_STATUS.PLAYER_WON)
        } else if (opponentWins >= 2 ) {
            setGameWinner(FINAL_GAME_STATUS.OPPONENT_WON)
        } 
    }, [playerWins, opponentWins])

    return { round, gameStatus, opponentMove, playerWins, opponentWins, gameWinner, play, fetchState }
}


export default useGamePVEPlay
