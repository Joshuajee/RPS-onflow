import Head from 'next/head'
import Layout from '@/components/ui/utils/Layout'
import Container from '@/components/ui/utils/Container'
import PlayOptions from '@/components/game/PlayOptions'
import { useState } from 'react'
import Fight from '@/components/game/Fight'
import { GAME_STATUS, PLAYER_MOVE } from '@/libs/constants'
import GameStatus from '@/components/game/GameStatus'

export default function PlayWithBot() {


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

                    <Fight round={10} playerMove={PLAYER_MOVE.ROCK}  opponentMove={PLAYER_MOVE.SCISSORS}  gameStatus={GAME_STATUS.DRAW} hide={() => null} />

                </div>

            </Layout>

        </>
    )
}