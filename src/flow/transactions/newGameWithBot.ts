import { PLAYER_MOVE } from "@/libs/constants";
import { getCadenceMove } from "@/libs/gamePlay";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const newGameWithBot = async (move: PLAYER_MOVE) => {



  const transactionId = await fcl.mutate({
    cadence: `
        import RPSGAME from ${contract}

        transaction {

            prepare(acct: AuthAccount) {
                let createPVE <- RPSGAME.createPVE()
                let game = createPVE.play(move: ${getCadenceMove(move)})
                acct.save(<-createPVE, to: RPSGAME.PlayingBotStoragePath)
            }
        }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  fcl.tx(transactionId).subscribe((res: any) => {
    //setTransactionStatus(res.status);
    console.log(res)
    if (res.status === 4) {
      console.log(res.status)
      //loadProfile();
    }
  });

};

export default newGameWithBot