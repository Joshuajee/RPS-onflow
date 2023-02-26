// Get Account.cdc

import RPSGAME from 0x01
import RPSToken from 0x03

// A script is a special type of Cadence transaction
// that does not have access to any account's storage
// and cannot modify state. Any state changes that it would
// do are reverted after execution.
//
// Scripts must have the following signature: pub fun main()import RPSGAME from 0x02
    
pub fun main(address: Address): &{RPSGAME.GamesCollectionInterface} {

  // Cadence code can get an account's public account object
  // by using the getAccount() built-in function.
  let gamesAccount = getAccount(address)
  // Get the public capability from the public path of the owner's account
  let gamesCapability = gamesAccount.getCapability<&{RPSGAME.GamesCollectionInterface}>(RPSGAME.GamesPublicPath)
  // borrow a reference for the capability
  let gamesReference = gamesCapability.borrow()
    ?? panic("Could not borrow a reference to the games capability")

  return gamesReference

}