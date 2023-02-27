import { useState } from "react"
import Link from "next/link"
import { LINKS } from "@/libs/constants"
import ConnectionBtn from "../utils/ConnectionBtn"
import { useScroll } from "@/hooks/window"
import { useAuth } from "@/contexts/AuthContext"
import { RiCopperCoinLine } from 'react-icons/ri'
import { useRouter } from "next/router"


const Navbar = () => {

    const { userProfile, balance } = useAuth()

    const scrollPosition = useScroll()

    const trigger = scrollPosition > 80

    return (
        <header className={`${(trigger ) ? "bg-[#202128] shadow-lg" : "" }text-slate-100 fixed w-full body-font z-10 flex justify-center`}>
            <div className="container w-full flex flex-wrap justify-between item-center py-2 lg:py-3 px-2">
                <Link href={"/"} className="pt-2 md:pt-0 block title-font text-2xl md:text-3xl font-bold">
                    RPSOF
                </Link>

                <div className="sm:hidden"><ConnectionBtn /></div>

                <div className="flex justify-evenly items-center">

                    <div className="px-2 flex"> 
                        <RiCopperCoinLine size={24} color="gold" /> 
                        <p className="ml-2"> {balance || 0} </p>
                    </div>

                    <p className="px-2">Wins: {userProfile?.won || 0}</p>

                    <p className="px-2">Loses: {userProfile?.lost || 0} </p>

                    <div className="hidden sm:block">
                        <ConnectionBtn />
                    </div>

                </div>
           
            </div>
            
        </header>
    )
}

export default Navbar