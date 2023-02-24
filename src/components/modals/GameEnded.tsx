import createProfile from "@/flow/transactions/accountSetUp"
import endGamePVE from "@/flow/transactions/endGamePVE";
import { FINAL_GAME_STATUS } from "@/libs/constants";
import { memo, useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"


interface IProps {
    handleClose: () => void;
    gameWinner: FINAL_GAME_STATUS
}

const GameEnded = ({handleClose, gameWinner} : IProps) => {

    const newGame = async() => {
    
        try {
            const id = await endGamePVE(handleClose)
            console.log(id)
            toast.success("New Game Created")
            handleClose()
        } catch (e) {
            console.error(e)
            toast.error("Error creating profile")
        }
    }

    const won = "https://assets8.lottiefiles.com/packages/lf20_touohxv0.json"

    const lottie = useCallback(() => {
        switch(gameWinner) {
            case FINAL_GAME_STATUS.PLAYER_WON:
                return "https://assets8.lottiefiles.com/packages/lf20_touohxv0.json"
            case FINAL_GAME_STATUS.OPPONENT_WON: 
                return "https://assets2.lottiefiles.com/packages/lf20_nwyegy0h.json"
            default:
                return ""
        }
    }, [gameWinner])

    
    const winner = useCallback(() => {
        switch(gameWinner) {
            case FINAL_GAME_STATUS.PLAYER_WON:
                return "You Won"
            case FINAL_GAME_STATUS.OPPONENT_WON: 
                return "You Lost"
            default:
                return ""
        }
    }, [gameWinner])



    return (
        <div className="flex flex-col justify-center">

            <h2 data-aos="zoom-in" className="text-center font-semibold text-2xl">{winner()}</h2>

            <div className="my-4 h-40">

                <lottie-player 
                    src={lottie()}  
                    background="transparent"  
                    speed="1"  autoplay />


            </div>

            <button onClick={newGame} className={`bg-blue-900 hover:bg-blue-800 py-3 text-white rounded-lg`}>
                New Game
            </button>

        </div>
    )
}

export default memo(GameEnded)
 