import { useAuth } from "@/contexts/AuthContext"
import createProfile from "@/flow/transactions/accountSetUp"
import { useState } from "react"
import { toast } from "react-toastify"


interface IProps {
    handleClose: () => void
}

const CreateProfileForm = ({handleClose} : IProps) => {

    const [name, setName] = useState("")

    const { loadProfile } = useAuth()

    const create = async() => {
    
        try {
            await createProfile(name, loadProfile)
            toast.success("Profile Created Successfully")
            handleClose()
        } catch (e) {
            console.error(e)
            toast.error("Error creating profile")
        }
    }

    const disabled = name.length < 3 ? true : false

    return (
        <div className="flex flex-col justify-center">

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium"> Username </label>
                <input name="username" id={"username"} type="text" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} className="bg-blue-50 border outline-none text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5" placeholder={"Enter Username"} />
            </div>

            <button disabled={disabled} onClick={create} className={`${disabled ? 'bg-gray-500' : 'bg-blue-900 hover:bg-blue-800 '} w-full py-3 text-white rounded-lg`}>
                Create Profile
            </button>

        </div>
    )
}

export default CreateProfileForm
 