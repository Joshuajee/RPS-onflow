import { useAuth } from "@/contexts/AuthContext"
import createProfile from "@/flow/transactions/accountSetUp"
import { useState } from "react"
import { toast } from "react-toastify"


interface IProps {
    handleClose: () => void
}

const StakeForm = ({handleClose} : IProps) => {

    const [amount, setAmount] = useState<number | string| undefined>(undefined)

    const { loadProfile } = useAuth()

    const create = async() => {
    
        // try {
        //     await createProfile(amount, loadProfile)
        //     toast.success("Profile Created Successfully")
        //     handleClose()
        // } catch (e) {
        //     console.error(e)
        //     toast.error("Error creating profile")
        // }
    }

    const disabled = (amount != undefined && amount  < 0 ) ? true : false

    return (
        <div className="flex flex-col justify-center">

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium"> Amount </label>
                <input name="amount" type="number" autoComplete="off" value={amount} onChange={(e) => setAmount(e.target.value as string)} className="bg-blue-50 border outline-none text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5" placeholder={"Enter Useramount"} />
            </div>

            <button disabled={disabled} onClick={create} className={`${disabled ? 'bg-gray-500' : 'bg-blue-900 hover:bg-blue-800 '} w-full py-3 text-white rounded-lg`}>
                Stake
            </button>

        </div>
    )
}

export default StakeForm
 