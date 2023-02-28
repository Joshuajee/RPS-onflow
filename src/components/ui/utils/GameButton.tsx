import { useAuth } from "@/contexts/AuthContext"
import React, { ReactNode, useState } from "react"
import { toast } from "react-toastify"

interface IProps {
    children: ReactNode
    onClick: () => void
    color: string
}

const GameButton = ({ children, onClick, color}: IProps) => {


    const click = () => {
        onClick()
    }

    const button = () => {

        switch (color) {
            case "blue":
                return (
                    <button 
                        onClick={click} 
                        className={`my-2 rounded-2xl py-4 px-6 bg-blue-900 hover:bg-blue-800 w-80 max-w-40`}>
                        {children}
                    </button>
                )
            case "red":
                return (
                    <button 
                        onClick={click} 
                        className={`my-2 rounded-2xl py-4 px-6 bg-red-900 hover:bg-red-800 w-80 max-w-40`}>
                        {children}
                    </button>
                )
            case "yellow":
                return (
                    <button 
                        onClick={click} 
                        className={`my-2 rounded-2xl py-4 px-6 bg-yellow-900 hover:bg-yellow-800 w-80 max-w-40`}>
                        {children}
                    </button>
                )

            default:
                return (
                    <button 
                        onClick={click} 
                        className={`my-2 rounded-2xl py-4 px-6 bg-gray-900 hover:bg-gray-800 w-80 max-w-40`}>
                        {children}
                    </button>
                )



        }

    }


    return (
        <>
            {button()}
        </>
    )
}

export default GameButton