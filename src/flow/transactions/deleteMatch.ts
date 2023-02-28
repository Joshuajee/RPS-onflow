import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const deleteMatch = async (address: string, callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
        import RPSGAME from ${contract}

        transaction {

            prepare(acct: AuthAccount) {

                let gameAccount = getAccount(${address})
            
                // Get the public capability from the public path of the owner's account
                let game <- acct.load<@RPSGAME.PVPGame>(from: RPSGAME.MatchStoragePath)

                destroy game

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

export default deleteMatch
 