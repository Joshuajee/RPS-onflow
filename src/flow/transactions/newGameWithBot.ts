import { PLAYER_MOVE } from "@/libs/constants";
import { getCadenceMove } from "@/libs/gamePlay";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const newGameWithBot = async (move: PLAYER_MOVE, callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
      import RPSGAME from ${contract}

      transaction {

      prepare(acct: AuthAccount) {
        let createPVE <- RPSGAME.createPVE()
      
        let game = createPVE.play(move: ${getCadenceMove(move)})
        acct.save(<-createPVE, to: RPSGAME.PlayingBotStoragePath)

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

export default newGameWithBot
 