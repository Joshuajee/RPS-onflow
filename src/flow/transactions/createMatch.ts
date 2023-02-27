import { GamePVPDetails } from "@/libs/interfaces";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const createMatch = async (details: GamePVPDetails, callBack: () => void) => {

  const { host, opponent, hostStake, opponentStake } = details

  const transactionId = await fcl.mutate({
    cadence: `
        import RPSGAME from ${contract}
        import RPSToken from ${contract}

        transaction {

          prepare(acct: AuthAccount) {
  
            let match <- RPSToken.createMatch(host: ${host}, hostStake: ${hostStake.toFixed(4)}, opponentStake: ${opponentStake.toFixed(4)})

            acct.save(<- match, to: RPSGAME.MatchStoragePath)

            // create a public capability for the Game PVE
            let capability = acct.link<&RPSGAME.Match>(RPSGAME.MatchPublicPath, target: RPSGAME.MatchStoragePath)   

            log("Match Created Successfully")

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

export default createMatch
 