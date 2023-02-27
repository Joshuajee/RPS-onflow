import { PLAYER_MOVE } from "@/libs/constants";
import { getCadenceMove } from "@/libs/gamePlay";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const newGameWithFlow = async (move: PLAYER_MOVE, callBack: () => void) => {

    console.log(move)

    const transactionId = await fcl.mutate({
        cadence: `
            import RPSToken from ${contract}
            import RPSGAME from ${contract}

            transaction {

                prepare(acct: AuthAccount) {
    
                    let game <- RPSToken.newGamePVE(move: ${getCadenceMove(move)})

                    acct.save(<-game, to: RPSGAME.PlayingBotStoragePath)

                    // create a public capability for the Game PVE
                    let capability = acct.link<&RPSGAME.GamePVE>(RPSGAME.PlayingBotPublicPath, target: RPSGAME.PlayingBotStoragePath)   

                    log("Game Created successfully")
                    log(RPSGAME.GameMove.paper)
                }
            
            }
        `,
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 500,
    });

    fcl.tx(transactionId).subscribe((res: any) => {
        if (res.status === 4) {
        callBack()
        }
    });

};

export default newGameWithFlow
 