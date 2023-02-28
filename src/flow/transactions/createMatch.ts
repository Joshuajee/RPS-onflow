import { GamePVPDetails } from "@/libs/interfaces";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const createMatch = async (details: GamePVPDetails, callBack: () => void) => {

  const { host, hostStake } = details

  const transactionId = await fcl.mutate({
    cadence: `
      import RPSGAME from ${contract}
      import RPSToken from ${contract}

      transaction {

        prepare(acct: AuthAccount) {

          let id = RPSToken.createMatch(host: ${host}, stake: ${hostStake.toFixed(4)})

          let match <- RPSGAME.createGameHost(matchId: id, host: ${host})

          acct.save(<- match, to: RPSGAME.MatchStoragePath)

          // create a public capability for the Game PVE
          let capability = acct.link<&RPSGAME.PVPGame>(RPSGAME.MatchPublicPath, target: RPSGAME.MatchStoragePath)   

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
 