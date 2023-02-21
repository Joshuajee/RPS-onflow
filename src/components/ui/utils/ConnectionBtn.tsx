import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'



const ConnectionBtn = () => {

    const [show, setShow] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    const { currentUser, profileExists, logOut, logIn, signUp, createProfile } = useAuth()

    console.log(currentUser)

    const notAuthenticated = (
        <button 
            onClick={logIn}
            className="px-6 md:px-10 rounded-lg h-10 text-sm bg-blue-800 text-white hover:bg-blue-900">
            Connect Wallet 
        </button>
    )

    const authenticated = (
        <div onClick={() => setShow(!show)} className='px-6 p-2 hover:cursor-pointer cursor-pointer rounded-3xl border-white border-[1px]'>
            <span> {currentUser.addr}  </span> 
        </div>
    )


    return (
        <div>
            { currentUser?.loggedIn ? authenticated : notAuthenticated }
        </div>
    )
}

export default ConnectionBtn