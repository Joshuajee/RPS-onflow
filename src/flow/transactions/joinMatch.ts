import { GamePVPDetails } from "@/libs/interfaces";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const joinMatch = async (address: string, player: string, stake: number, callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
        import RPSGAME from ${contract}
        import RPSToken from ${contract}

        transaction {

          prepare(acct: AuthAccount) {

            let gameAccount = getAccount(${address})
           
            // Get the public capability from the public path of the owner's account
            let gameCapability = gameAccount.getCapability<&RPSGAME.Match>(RPSGAME.MatchPublicPath)
            // borrow a reference for the capability
            log(gameCapability)
            let gameReference = gameCapability.borrow() ?? panic("Could not borrow a reference to the games capability")

            gameReference.join(opponent: ${player}, stake: ${stake.toFixed(4)})

            // create a public capability for the Game PVE
            let capability = acct.link<&RPSGAME.Match>(RPSGAME.MatchPublicPath, target: RPSGAME.MatchStoragePath)   

            log("Joined Match Created Successfully")

            

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

export default joinMatch
 