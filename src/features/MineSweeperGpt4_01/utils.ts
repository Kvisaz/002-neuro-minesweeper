import {Board, Cell, GameStatus} from './interfaces';


export const createBoard = (rows: number, cols: number, mines: number): Board => {
    // Initialize cells
    const cells: Cell[][] = Array.from({length: rows}, (_, x) =>
        Array.from({length: cols}, (_, y) => ({
            x,
            y,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            nearbyMines: 0,
        }))
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        const x = Math.floor(Math.random() * rows);
        const y = Math.floor(Math.random() * cols);
        if (!cells[x][y].isMine) {
            cells[x][y].isMine = true;
            minesPlaced++;
        }
    }

    // Calculate nearby mines for each cell
    cells.forEach((row) =>
        row.forEach((cell) => {
            if (!cell.isMine) {
                cell.nearbyMines = countNearbyMines(cells, cell.x, cell.y);
            }
        })
    );

    return {
        rows,
        cols,
        mines,
        cells,
        gameStatus: GameStatus.Playing,
    };
};

export const revealCell = (board: Board, cell: Cell): Board => {
    const newBoard = {...board, cells: board.cells.map((row) => row.slice())};
    newBoard.cells[cell.x][cell.y].isRevealed = true;

    if (cell.isMine) {
        newBoard.gameStatus = GameStatus.Lost;
    } else if (cell.nearbyMines === 0) {
        revealEmptyCells(newBoard, cell.x, cell.y);
    }

    if (checkWin(newBoard)) {
        newBoard.gameStatus = GameStatus.Won;
    }

    return newBoard;
};

export const toggleFlag = (board: Board, cell: Cell): Board => {
    const newBoard = {...board, cells: board.cells.map((row) => row.slice())};
    newBoard.cells[cell.x][cell.y].isFlagged = !newBoard.cells[cell.x][cell.y].isFlagged;
    return newBoard;
};

// Helper functions
const countNearbyMines = (cells: Cell[][], x: number, y: number): number => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1],
    ];
    return directions.reduce((count, [dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (isValid(cells, newX, newY) && cells[newX][newY].isMine) {
            count++;
        }
        return count;
    }, 0);
};


const revealEmptyCells = (board: Board, x: number, y: number): void => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1],
    ];

    directions.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = dy;
        if (isValid(board.cells, newX, newY)) {
            const cell = board.cells[newX][newY];
            if (!cell.isRevealed && !cell.isMine && !cell.isFlagged) {
                cell.isRevealed = true;
                if (cell.nearbyMines === 0) {
                    revealEmptyCells(board, newX, newY);
                }
            }
        }
    });
};

const isValid = (cells: Cell[][], x: number, y: number): boolean => {
    const rows = cells.length;
    const cols = cells[0].length;
    return x >= 0 && x < rows && y >= 0 && y < cols;
};

const checkWin = (board: Board): boolean => {
    return board.cells.every((row) =>
        row.every((cell) => cell.isRevealed === cell.isMine)
    );
};
