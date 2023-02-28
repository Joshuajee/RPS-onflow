import Head from 'next/head'
import Layout from '@/components/ui/utils/Layout'
import { useRouter } from 'next/router'
import GameButton from '@/components/ui/utils/GameButton'
import { GamePVPDetails } from '@/libs/interfaces'
import { LINKS, PLAY_ROUTES } from '@/libs/constants'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'
import ModalWrapper from '@/components/modals/ModalWrapper'
import CreateProfileForm from '@/components/modals/CreateProfileForm'
import { useCallback, useEffect, useState } from 'react'
import createMatch from '@/flow/transactions/createMatch'
import getMatch from '@/flow/scripts/getMatch'
import { contract } from '@/libs/utils'

export default function CreateMatch() {

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const { currentUser, userProfile } = useAuth()

  const [details, setDetails] = useState<GamePVPDetails>(
    { 
      host: currentUser?.addr,
      opponent: "",
      hostStake: 0,
      opponentStake: 0,
      bet: false
    }
  )

  const quickGame = async() => {
    if (pleaseConnect()) return
    try {
      await createMatch(details, fetchMatch)
    } catch (e) {
      toast.error("An error occurred")
      console.error(e)
    }
  }

  const fetchMatch = useCallback(async() => {
    try {
      const match = await getMatch(currentUser?.addr)
      router.push(`${LINKS.WAITING}/${contract}/${match?.matchId}`)
    } catch (e) {
      console.error(e)
    }
  }, [currentUser?.addr, router])


  const PVE = async () => {
    if (pleaseConnect()) return
    try {
      await createMatch(details, fetchMatch)
    } catch (e) {
      toast.error("An error occurred")
      console.error(e)
    }
  }

  const pleaseConnect = (open: boolean = false) => {
    if (currentUser?.loggedIn) {
      if (!userProfile) {
        setOpen(open)
        return true
      }
      return false
    }
    toast.error("Please connect your wallet to proceed")
    return true
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    fetchMatch()
  }, [fetchMatch])

  useEffect(() => {
    setDetails(
      { 
        host: currentUser?.addr,
        opponent: "",
        hostStake: 0,
        opponentStake: 0,
        bet: false
      }
    )
  }, [currentUser?.addr])

  return (
    <>
    
      <Layout>

        <div data-aos="fade-up" className='flex flex-grow flex-col justify-center items-center text-white w-full'>

          <GameButton onClick={quickGame} color='blue'>Friendly</GameButton>

          <GameButton onClick={PVE} color={'red'}>Stake some coins</GameButton>

        </div>

      </Layout>

      <ModalWrapper title={"Create Account"} open={open} handleClose={handleClose}>
        <CreateProfileForm handleClose={handleClose} />
      </ModalWrapper>

    </>
  )
}
 