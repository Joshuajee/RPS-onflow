import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '@/components/ui/utils/Layout'
import PlayOptions from '@/components/game/PlayOptions'
import Fight from '@/components/game/Fight'
import { GAME_STATUS, LINKS, PLAYER_MOVE } from '@/libs/constants'
import GameStatus from '@/components/game/GameStatus'
import { useAuth } from '@/contexts/AuthContext'
import ModalWrapper from '@/components/modals/ModalWrapper'
import GameEnded from '@/components/modals/GameEnded'
import { toast } from 'react-toastify'
import useGameMultiplier from '@/hooks/useGameMultiplier'
import { useRouter } from 'next/router'
import deleteMatch from '@/flow/transactions/deleteMatch'

export default function PlayWithFriend() {

    const router = useRouter()

    const { addr, id } = router.query
    const { currentUser, loadProfile } = useAuth()
    const [open, setOpen] = useState(false)
    const [playerMove, setPlayerMove] = useState(PLAYER_MOVE.NONE)
    const [showFight, setShowFight] = useState(false)
    const [currentRound, setCurrentRound] = useState(0)

    const  { 
        play, fetchState, init, setOpponentMove,
        round, gameStatus, opponentMove, tokens,
        opponentWins, playerWins, gameWinner, host 
    } = useGameMultiplier(currentUser?.addr, Number(id), addr as string, loadProfile)

    useEffect(() => {
        if (round != currentRound) {
            setShowFight(true)
            //setCurrentRound(round)
        } else {
            setShowFight(false)
        }
    }, [round, currentRound])

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
        setCurrentRound(round)
    }

    const playGame = async(move: PLAYER_MOVE) => {
        await play(move)
    }

    const isFighting = (showFight && playerMove != PLAYER_MOVE.NONE && opponentMove != PLAYER_MOVE.NONE) && gameStatus != GAME_STATUS.START

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

    const endGame = async() => {

        try {

            const player = currentUser?.addr === host

            if (player) {
                await deleteMatch(currentUser?.addr, () => router.push(LINKS.CREATE_MATCH))
            } else {
                router.push(LINKS.CREATE_MATCH)
            }

        } catch (e) {
            toast.error("An error occurred")
            console.error(e)
        }

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
                        { isFighting && showFight ? fighingMode : playingMode}
                    </div>
                </div>
            </Layout>

            <ModalWrapper title={"Game Ended"} open={open} handleClose={() => toast.error("Cannot close, please create new game")}>
                <GameEnded action={endGame} handleClose={handleClose} gameWinner={gameWinner} reward={tokens}/>
            </ModalWrapper>

        </>
    )
}
 