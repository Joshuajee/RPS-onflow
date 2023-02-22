import { gameStatusStr } from "@/libs/utils";
import { ReactNode } from "react"

interface IProps {
    round: number;
    playerWins: number
    opponentWins: number
}

const GameStatus = ( { round, playerWins, opponentWins }: IProps ) => {


    return (
        <div className='p-4 text-white w-full md:max-w-xl'>

            <h3 className='my-4 text-center text-xl md:text-2xl'>ROUND: {round} </h3>

            <div className="flex justify-between my-4 md:my-10 w-full">
                <p>Your Wins: {playerWins}</p>
                <p>Opponent Wins: {opponentWins}</p>
            </div>

        </div>
    )
}

export default GameStatus