import { ReactNode } from "react"

interface IProps {
    children: ReactNode
    onClick: () => void
}

const OptionCard = ( { children, onClick }: IProps ) => {

    return (
        <button
            onClick={onClick}
            className="border-white border-[1px] h-60 w-40 text-white"
            >
            {children}
        </button>
    )
}

export default OptionCard