import { PLAYER_MOVE } from "@/libs/constants";
import { ReactNode } from "react"
import PlayerCard from "./PlayerCard";

interface IProps {
    onClick?: (move: PLAYER_MOVE) => void;
    aos?: string;
    move: PLAYER_MOVE
}

const OptionCard = ({ move, onClick, aos }: IProps ) => {

    return (
        <button
            onClick={() => onClick?.(move)}
            className="border-white border-[1px]  h-32 w-20 md:h-60 md:w-40 text-white"
            data-aos={aos}
            >
            <PlayerCard move={move} />
        </button>
    )
}

export default OptionCard