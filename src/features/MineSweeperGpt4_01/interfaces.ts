export interface Cell {
    x: number;
    y: number;
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    nearbyMines: number;
}

export interface Board {
    rows: number;
    cols: number;
    mines: number;
    cells: Cell[][];
    gameStatus: GameStatus;
}

export interface MineSweeperProps {
    rows?: number;
    cols?: number;
    mines?: number;
}

export enum GameStatus {
    Playing,
    Won,
    Lost,
}
