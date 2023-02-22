import Head from 'next/head'
import Layout from '@/components/ui/utils/Layout'
import Container from '@/components/ui/utils/Container'
import PlayOptions from '@/components/game/PlayOptions'
import { useEffect, useState } from 'react'
import useQuickPlay from '@/hooks/useQuickPlay'
import { FINAL_GAME_STATUS, GAME_STATUS, PLAYER_MOVE } from '@/libs/constants'
import { gameStatusStr } from '@/libs/utils'
import GameStatus from '@/components/game/GameStatus'
import Fight from '@/components/game/Fight'
import { toast } from 'react-toastify'

export default function QuickGame() {

    const [playerMove, setPlayerMove] = useState<null | PLAYER_MOVE>(null)

    const [showFight, setShowFight] = useState(false)

    const  { play, round, gameStatus, opponentMove, opponentWins, playerWins, gameWinner } = useQuickPlay()

    useEffect(() => {
        if (playerMove !== null && !showFight) {
            play(playerMove)
        }
    }, [playerMove, showFight, gameWinner, play])

    const hide = () => {
        setShowFight(false)
        setPlayerMove(null)
    }

    useEffect(() => {
        if (playerMove != null) setShowFight(true)
    }, [playerMove])

    const playingMode = (
        <>
            <GameStatus round={round} playerWins={playerWins} opponentWins={opponentWins} />
            <PlayOptions setPlayerMove={setPlayerMove} />
        </>
    )

    const fighingMode = (
        <Fight round={10} playerMove={playerMove as PLAYER_MOVE}  opponentMove={opponentMove}  gameStatus={gameStatus} hide={hide} />
    )


    return (
        <>
            <Head>
                <title>Play</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>

                <div className='flex flex-col items-center justify-center w-full text-white'>
                    { showFight ? fighingMode : playingMode}
                </div>
        
            </Layout>

        </>
    )
}
