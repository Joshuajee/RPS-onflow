import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '@/components/ui/utils/Layout'
import PlayOptions from '@/components/game/PlayOptions'
import Fight from '@/components/game/Fight'
import { PLAYER_MOVE } from '@/libs/constants'
import GameStatus from '@/components/game/GameStatus'
import useGamePVEPlay from '@/hooks/useGamePVEPlay'
import { useAuth } from '@/contexts/AuthContext'
import ModalWrapper from '@/components/modals/ModalWrapper'
import GameEnded from '@/components/modals/GameEnded'
import { toast } from 'react-toastify'

export default function PlayWithFriend() {

    const { currentUser, loadProfile } = useAuth()

    const [open, setOpen] = useState(false)

    const [playerMove, setPlayerMove] = useState(PLAYER_MOVE.NONE)

    const [showFight, setShowFight] = useState(false)

    const  { 
        play, fetchState, init, setOpponentMove,
        round, gameStatus, opponentMove, tokens,
        opponentWins, playerWins, gameWinner 
    } = useGamePVEPlay(currentUser?.addr, loadProfile)


    useEffect(() => {
        if (gameWinner != 0) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [gameWinner])

    const hide = () => {
        setShowFight(false)
        setPlayerMove(PLAYER_MOVE.NONE)
        setOpponentMove(PLAYER_MOVE.NONE)
    }

    const playGame = async(move: PLAYER_MOVE) => {
        await play(move)
        setShowFight(true)
    }

    const isFighting = (showFight && playerMove != PLAYER_MOVE.NONE && opponentMove != PLAYER_MOVE.NONE)


    const playingMode = (
        <>
            <GameStatus round={round} playerWins={playerWins} opponentWins={opponentWins} />
            <PlayOptions play={playGame} setPlayerMove={setPlayerMove} />
        </>
    )

    const fighingMode = (
        <Fight playerMove={playerMove as PLAYER_MOVE}  opponentMove={opponentMove as PLAYER_MOVE}  gameStatus={gameStatus} hide={hide} />
    )

    const handleClose = async() => {
        await fetchState()
        setOpen(false)
    }


    return (
        <>
            <Head>
                <title>Play</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <div className='flex items-center justify-center w-full'>
                    <div className='flex flex-col items-center justify-center w-full text-white'>
                        { isFighting ? fighingMode : playingMode}
                    </div>
                </div>
            </Layout>

            <ModalWrapper title={"Game Ended"} open={open && !showFight} handleClose={() => toast.error("Cannot close, please create new game")}>
                <GameEnded handleClose={handleClose} init={init} gameWinner={gameWinner} reward={tokens}/>
            </ModalWrapper>

        </>
    )
}
 