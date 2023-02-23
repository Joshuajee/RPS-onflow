import Head from 'next/head'
import Layout from '@/components/ui/utils/Layout'
import { useRouter } from 'next/router'
import GameButton from '@/components/ui/utils/GameButton'
import { LINKS } from '@/libs/constants'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {

  const router = useRouter()

  const { currentUser } = useAuth()

  const quickGame = () => {
    router.push("/play/quick-game")
  }

  const PVE = () => {
    if (pleaseConnect()) return
    router.push("/play/play-with-bot")
  }

  const pleaseConnect = () => {
    if (currentUser?.loggedIn) return false

    toast.error(
      "Please connect your wallet to proceed"
    )

    return true
  }

  return (
    <>
      <Head>
        <title>Tik tak on flow</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>

        <div data-aos="fade-up" className='flex flex-grow flex-col justify-center items-center text-white w-full'>

          <GameButton onClick={quickGame} color='blue'>Quick Game</GameButton>

          <GameButton onClick={PVE} color={'red'}>Play With Bot</GameButton>

          <GameButton onClick={() => router.push(LINKS.ACHIEVEMENTS)} color='yellow'>Achiements</GameButton>

          {/* <GameButton onClick={() => router.push(LINKS.LEADERBOARD)} color='blue'>LeaderBoard</GameButton> */}

          <GameButton onClick={() => router.push(LINKS.MATCH_HISTORY)} color='gray'>Match History</GameButton>
          
        </div>

      </Layout>

    </>
  )
}
