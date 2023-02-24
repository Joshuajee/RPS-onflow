import { PLAYER_MOVE } from "@/libs/constants";
import { getCadenceMove } from "@/libs/gamePlay";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const playGamePVE = async (move: PLAYER_MOVE, callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
      import RPSGAME from ${contract}

      transaction {

        prepare(acct: AuthAccount) {

          let game <- acct.load<@RPSGAME.GamePVE>(from: RPSGAME.PlayingBotStoragePath)
          
          let play =  game?.play(move: ${getCadenceMove(move)})
  
          acct.save(<-game!, to: RPSGAME.PlayingBotStoragePath)

          log(play)
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

export default playGamePVE