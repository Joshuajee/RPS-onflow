import { useState } from "react"
import Link from "next/link"
import { useScroll } from "@/hooks/windows"
import { links } from "@/libs/routes"
import HambuggerMenu from "./HambuggerMenu"
import { LINKS } from "@/libs/constants"
import ConnectionBtn from "../utils/ConnectionBtn"

const navigation = [
    { name: 'Achievements', href: LINKS.ACHIEVEMENTS },
    { name: 'LeaderBoard', href: LINKS.LEADERBOARD },
    { name: 'Match History', href: LINKS.MATCH_HISTORY }
]

const Navbar = () => {

    const [open, setOpen] = useState(false);

    const scrollPosition = useScroll()

    const trigger = scrollPosition > 80

    return (
        <header className={`${(trigger || open) ? "bg-[#202128] shadow-lg" : "" } text-slate-100 fixed w-full body-font z-10 flex justify-center`}>
            <div className="container w-full flex flex-wrap justify-between item-center py-2 lg:py-3 px-2">
                <Link href={"/"} className="pt-2 md:pt-0 block title-font text-2xl md:text-3xl font-bold">
                    TTOF
                </Link>
                <ConnectionBtn />
            </div>
        </header>
    )
}

export default Navbar