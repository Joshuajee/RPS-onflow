import { config } from "@onflow/fcl";

config({
  "app.detail.title": "Flow Next.js Quick Start",
  "app.detail.icon": "https://unavatar.io/twitter/muttonia",
  "accessNode.api": process.env.NEXT_PUBLIC_ACCESS_NODE_API,
  "discovery.wallet": process.env.NEXT_PUBLIC_DISCOVERY_WALLET,
  "fcl.eventPollRate": 3000,
  "0xRPSGAME": process.env.NEXT_PUBLIC_CONTRACT_ACCT
})