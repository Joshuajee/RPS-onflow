import { ReactNode } from "react"

interface IProps {
    children: ReactNode;
}

const Container = ({ children } :IProps) => {
    return (
        <div className={`w-full flex justify-center h-[calc(100vh_-_120px)]`}>
            <div className="w-full flex flex-wrap justify-between item-center px-2 lg:px-14 2xl:container">
                {children}
            </div>
        </div>
    )
}

export default Container