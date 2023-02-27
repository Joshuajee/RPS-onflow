import { PLAYER_MOVE } from "@/libs/constants"
import { memo, useCallback, useEffect, useState } from "react"


interface IProps {
    move: PLAYER_MOVE
}

const PlayerCard = ({ move } : IProps) => {

    const link = useCallback(() => {
        switch (move) {
            case PLAYER_MOVE.ROCK:
                return "https://assets3.lottiefiles.com/packages/lf20_N8vR3LvkCB.json"
            case PLAYER_MOVE.PAPER:
                return "https://assets9.lottiefiles.com/packages/lf20_BEELk7wPJW.json"
            case PLAYER_MOVE.SCISSORS:
                return "https://assets3.lottiefiles.com/private_files/lf30_licg9ydj.json"
            default:
                return ""
            
        }
    }, [move])

   

    const name = () => {
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
    
    return (
        <div>
            <lottie-player src={link()}  background="transparent"  speed="1"  autoplay />
            <p> {name()} </p>
        </div>
    )
}


export default memo(PlayerCard)