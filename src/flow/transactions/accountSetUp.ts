import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const createProfile = async (name: string, callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
      import RPSGAME from ${contract}

      transaction {
        prepare(acct: AuthAccount) {
    
          // Create a new empty Games
          let games <- RPSGAME.createEmptyGame(name: "${name}")
  
          // store the empty Account in account storage
          acct.save<@RPSGAME.Games>(<-games, to: RPSGAME.GamesStoragePath)
  
          log("Games created for account 2")
  
          // create a public capability for the Games
          let capability = acct.link<&RPSGAME.Games>(RPSGAME.GamesPublicPath, target: RPSGAME.GamesStoragePath)
  
          log("Capability created")

        }
      }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  fcl.tx(transactionId).subscribe((res: any) => {
    if (res.status === 4) {
      callBack()
    }
  });

};

export default createProfile