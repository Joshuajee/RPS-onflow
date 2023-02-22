import { GAME_STATUS, PLAYER_MOVE } from "@/libs/constants"
import { gameStatusStr, getMoveStr } from "@/libs/utils";
import GameButton from "../ui/utils/GameButton";
import OptionCard from "./OptionCard"

interface IProps {
    round: number;
    playerMove: PLAYER_MOVE;
    opponentMove: PLAYER_MOVE;
    gameStatus: GAME_STATUS;
    hide: () => void
}


const Fight = ({ round, playerMove, opponentMove, gameStatus, hide } : IProps) => {

    console.log(gameStatus)


    return  (
        <div className="text-white flex flex-col justify-between w-full md:max-w-xl">

            <h3 data-aos="fade-in" className='my-4 md:my-10 text-center text-xl md:text-2xl'> {gameStatusStr(gameStatus)} </h3>

            <div className="flex justify-between">

                <OptionCard aos="slide-up">
                    {getMoveStr(playerMove)}
                </OptionCard>

                    
                <div data-aos="zoom-in" className="text-yellow-500 h-60 font-medium flex justify-center items-center text-5xl">
                    VS
                </div>

                <OptionCard aos="slide-down">
                    {getMoveStr(opponentMove)}
                </OptionCard>

            </div>

            
            <button className="my-10" onClick={hide}> Continue </button>


        </div>
    )

}

export default Fight
