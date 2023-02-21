import { ReactNode } from "react"

interface IProps {
    children: ReactNode
    onClick: () => void
    color: string
}

const GameButton = ({ children, onClick, color}: IProps) => {

    console.log(color)

    return (
        <button 
            onClick={onClick} 
            className={`my-2 rounded-2xl py-4 px-6 bg-${color}-900 hover:bg-${color}-800 w-80 max-w-40`}>
            {children}
        </button>
    )
}

export default GameButton