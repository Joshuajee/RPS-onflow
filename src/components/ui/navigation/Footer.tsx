import Link from "next/link"
import { AiFillGithub } from "react-icons/ai"
import { FaDiscord } from "react-icons/fa"
import { BsTwitter } from "react-icons/bs"

const Footer = () => {
    return (
        <footer className="p-4 shadow font-medium text-sm">

            <div className="flex justify-between text-white">

                <p>All right reserved</p>

                <div className="flex">
                    
                    <a className="mr-2 hover:text-white" target={"_blank"} rel="noreferrer" href="https://github.com/Joshuajee/tic-tac-onflow"> <AiFillGithub size={24} /> </a>

                    <a className="hover:text-white" target={"_blank"} rel="noreferrer" href="https://twitter.com/evuetaphajoshua"> <BsTwitter size={24} /> </a>

                </div>
                
            </div>

        </footer>
    )
}

export default Footer