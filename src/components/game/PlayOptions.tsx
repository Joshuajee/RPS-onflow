import { PLAYER_MOVE } from "@/libs/constants"
import OptionCard from "./OptionCard"
import PlayerCard from "./PlayerCard";

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
        <div className="flex justify-between w-full max-w-xl">
            <OptionCard onClick={move} move={PLAYER_MOVE.ROCK} />
            <OptionCard onClick={move} move={PLAYER_MOVE.PAPER} />
            <OptionCard onClick={move} move={PLAYER_MOVE.SCISSORS} />
        </div>
    )

}

export default PlayOptions
