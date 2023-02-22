import { ReactNode } from "react"

interface IProps {
    children: ReactNode
    onClick?: () => void;
    aos?: string
}

const OptionCard = ( { children, onClick, aos }: IProps ) => {

    return (
        <button
            onClick={onClick}
            className="border-white border-[1px] h-60 w-40 text-white"
            data-aos={aos}
            >
            {children}
            
        </button>
    )
}

export default OptionCard