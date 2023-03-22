import {MouseEvent, useEffect, useState} from "react";
import styles from "./MineSweeper.module.css";
import {Board, Cell, GameStatus, MineSweeperProps} from './interfaces';
import {createBoard, revealCell, toggleFlag} from './utils';
import {CellComponent} from './CellComponent';

export const MineSweeperGpt401 = ({
                                       rows = 9,
                                       cols = 9,
                                       mines = 10,
                                   }: MineSweeperProps) => {
    const [board, setBoard] = useState<Board | null>(null);

    useEffect(() => {
        setBoard(createBoard(rows, cols, mines));
    }, [rows, cols, mines]);

    const handleLeftClick = (e: MouseEvent, cell: Cell) => {
        e.preventDefault();
        if (!board || board.gameStatus !== GameStatus.Playing) return;
        setBoard(revealCell(board, cell));
    };

    const handleRightClick = (e: MouseEvent, cell: Cell) => {
        e.preventDefault();
        if (!board || board.gameStatus !== GameStatus.Playing) return;
        setBoard(toggleFlag(board, cell));
    };

    if (!board) return null;

    return (
        <>
            <div className={styles.gameStatus}>{GameStatus[board.gameStatus]}</div>
            <div className={styles.board}>
                {board.cells.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {row.map((cell) => (
                            <CellComponent
                                key={`${cell.x}-${cell.y}`}
                                cell={cell}
                                onLeftClick={handleLeftClick}
                                onRightClick={handleRightClick}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};
