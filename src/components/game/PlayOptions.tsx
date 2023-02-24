import { PLAYER_MOVE } from "@/libs/constants"
import OptionCard from "./OptionCard"

interface IProps {
    play: (val: PLAYER_MOVE) => void;
    setPlayerMove: (val: PLAYER_MOVE) => void;
}

const PlayOptions = ({ play, setPlayerMove } : IProps) => {

    const move = (move: PLAYER_MOVE) => {
        play(move)
        setPlayerMove(move)
    }

    return  (
        <div className="flex justify-between w-full md:max-w-xl">
            <OptionCard onClick={() => move(PLAYER_MOVE.ROCK)}>
                Rock
            </OptionCard>

            <OptionCard onClick={() => move(PLAYER_MOVE.PAPER)}>
                Paper
            </OptionCard>

            <OptionCard onClick={() => move(PLAYER_MOVE.SCISSORS)}>
                Scissors
            </OptionCard>
        </div>
    )

}

export default PlayOptions
