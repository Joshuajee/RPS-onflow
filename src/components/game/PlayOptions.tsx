import { PLAYER_MOVE } from "@/libs/constants"
import OptionCard from "./OptionCard"

interface IProps {
    setPlayerMove: (val: PLAYER_MOVE) => void;
}

const PlayOptions = ({ setPlayerMove } : IProps) => {

    return  (
        <div className="flex justify-between w-full md:max-w-xl">

            <OptionCard onClick={() => setPlayerMove(PLAYER_MOVE.ROCK)}>
                ROCK
            </OptionCard>

            <OptionCard onClick={() => setPlayerMove(PLAYER_MOVE.PAPER)}>
                Paper
            </OptionCard>

            <OptionCard onClick={() => setPlayerMove(PLAYER_MOVE.SCISSORS)}>
                Scissors
            </OptionCard>


        </div>
    )

}

export default PlayOptions
