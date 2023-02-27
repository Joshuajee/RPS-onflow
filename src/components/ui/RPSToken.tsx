import { RiCopperCoinFill, RiCopperCoinLine } from "react-icons/ri"

interface IProps {
    amount: number
}

const RPSToken = ({ amount } : IProps) => {
    return (
        <div className="px-2 flex"> 
        <RiCopperCoinLine size={24} color="gold" /> 
        <p className="ml-2"> {amount} </p>
    </div>
    )
}

export default RPSToken