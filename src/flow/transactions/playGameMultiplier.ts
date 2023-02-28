import { PLAYER_MOVE } from "@/libs/constants";
import { getCadenceMove } from "@/libs/gamePlay";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const playGameMultiplier = async (id: number, move: PLAYER_MOVE, player: boolean = true) => {

  const transactionId = await fcl.mutate({
    cadence: `
      import RPSGAME from ${contract}

      transaction {

        prepare(acct: AuthAccount) {

            let challengeAccount = getAccount(${contract})
  
            let challengeCapability = challengeAccount.getCapability<&RPSGAME.Challenge>(RPSGAME.AdminMatchPublicPath)

            let challengeReference = challengeCapability.borrow() ?? panic("Could not borrow a reference to the games capability")

            let match = challengeReference.returnGame(id: ${id}) ?? panic("Match not found")

            if (${player}) {
                match.play(move: ${getCadenceMove(move)})
            } else {
                match.opponentPlay(move: ${getCadenceMove(move)})
            }

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
     // callBack()
    }
  });

};

export default playGameMultiplier