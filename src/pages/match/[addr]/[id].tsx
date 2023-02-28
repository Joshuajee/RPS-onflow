import * as fcl from "@onflow/fcl";
import Layout from '@/components/ui/utils/Layout'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'
import { useCallback, useEffect, useState } from 'react'
import { MdCopyAll } from 'react-icons/md'
import GameButton from '@/components/ui/utils/GameButton'
import joinMatch from '@/flow/transactions/joinMatch'
import { contract, contractName } from '@/libs/utils'
import getMatch from "@/flow/scripts/getMatch";
import { PLAY_ROUTES } from "@/libs/constants";




const eventName = "JoinMatch";

const event = `A.${contract}.${contractName}.${eventName}`;

export default function CreateMatch() {

  const router = useRouter()

  const { addr, id } = router.query

  const [match, setMatch] = useState<any>()

  const [open, setOpen] = useState(false)
  const [link, setLink] = useState("")


  const { currentUser } = useAuth()


  const fetchMatch = useCallback(async() => {
    try {
      const match = await getMatch(addr as string)
      setMatch(match)
    } catch (e) {
      console.error(e)
    }
  }, [addr])


  const join = async () => {
    try {
      await joinMatch(Number(id), addr as string, currentUser?.addr, 0, () => console.log("dd"))
    } catch (e) {
      toast.error("Error! joining match")
    }

  }

  const copy = async() => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link Copied to clipboard")
    } catch (err) {
      toast.error("An error occured")
    }
  }


  const waiting = (
    <>
      <h2 className='text-3xl'> Waiting for opponent</h2>
      <p className='my-4 text-lg'>copy and share the link below with your friend</p>
      <div className='flex my-2'>
        <p className='text-lg'>{link}</p>
        <button onClick={copy} className="ml-2"><MdCopyAll /></button>
      </div>
    </>
  )

  const joining = (
    <div className='flex my-2'>
      <GameButton onClick={join} color='yellow'> Accept Challenge </GameButton>
    </div>
  )

  const please = (
    <>
      <div className='flex my-2'>
        <h2 className='text-3xl'> Please Connect </h2>
      </div>
    </>
  )

  useEffect(() => {
    setLink(window?.location?.href)
  }, [])

  useEffect(() => {
    fetchMatch()
  }, [fetchMatch])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMatch()
    }, 5000)
    return () => clearInterval(interval)
  }, [fetchMatch])

  useEffect(() => {  
    if (match?.opponentJoined) {
      router.push(`${PLAY_ROUTES.PLAY}/${addr}/${id}`)
    }
  }, [router, match?.opponentJoined, addr, id])

  return (
    <Layout>

      <div data-aos="fade-up" className='flex flex-grow flex-col justify-center items-center text-white w-full'>
        {
          currentUser?.addr ?
            (addr == currentUser?.addr) ?
              waiting : joining : please
        }
      </div>

    </Layout>
  )
}
