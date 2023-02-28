import { GAME_STATUS, PLAYER_MOVE } from "@/libs/constants"
import { gameStatusStr, getMoveStr } from "@/libs/utils";
import { memo } from "react";
import OptionCard from "./OptionCard"

interface IProps {
    playerMove: PLAYER_MOVE;
    opponentMove: PLAYER_MOVE;
    gameStatus: GAME_STATUS;
    hide: () => void
}


const Fight = ({ playerMove, opponentMove, gameStatus, hide } : IProps) => {

    return  (
        <div className="text-white flex flex-col justify-between w-full px-10 md:max-w-xl">

            <h3 data-aos="fade-in" className='my-4 md:my-10 text-center text-xl md:text-2xl'> {gameStatusStr(Number(gameStatus))} </h3>

            <div className="flex justify-between">

                <OptionCard aos="slide-up" move={playerMove} />
                    
                <div data-aos="zoom-in" className="text-yellow-500 h-30 md:h-60 font-medium flex justify-center items-center text-2xl md:text-5xl">
                    VS
                </div>

                <OptionCard aos="slide-down" move={Number(opponentMove)} />

            </div>

            <button className="my-10" onClick={hide}> Continue </button>

        </div>
    )

}

export default memo(Fight)
