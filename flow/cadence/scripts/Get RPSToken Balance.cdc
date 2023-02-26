// This script reads the balance field of an account's RPSToken Balance
import FungibleToken from "../contracts/RPSToken/FungibleToken.cdc"
import RPSToken from "../contracts/RPSToken/RPSToken.cdc"

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(RPSToken.VaultPublicPath)
        .borrow<&RPSToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}