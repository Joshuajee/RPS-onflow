export enum LINKS {
    ACHIEVEMENTS =  "/achievements",
    LEADERBOARD = "/leaderboard",
    MATCH_HISTORY = "/match-history",
    CREATE_MATCH = "/match/create",
    WAITING = "/match/"
}

export enum PLAY_ROUTES {
    QUICKGAME =  "/play/quick-game",
    PLAY_PVE = "/play/play-with-bot",
    PLAY = "/play",
}

export enum PLAYER_MOVE {
    ROCK =  0,
    PAPER = 1,
    SCISSORS = 2,
    NONE = "NONE"
}

export enum GAME_STATUS {
    START = 0,
    DRAW =  1,
    PLAYER_WON = 2,
    OPPONENT_WON = 3
}

export enum FINAL_GAME_STATUS {
    PLAYING = 0,
    PLAYER_WON = 1,
    OPPONENT_WON = 2
}