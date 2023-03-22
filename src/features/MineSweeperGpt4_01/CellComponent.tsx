import {MouseEvent} from "react";
import styles from "./CellComponent.module.css";
import {Cell} from './interfaces';

interface CellComponentProps {
    cell: Cell;
    onLeftClick: (e: MouseEvent, cell: Cell) => void;
    onRightClick: (e: MouseEvent, cell: Cell) => void;
}

export const CellComponent = ({
                                  cell,
                                  onLeftClick,
                                  onRightClick,
                              }: CellComponentProps) => (
    <div
        className={`${styles.cell} ${cell.isRevealed ? styles.revealed : ""} ${
            cell.isFlagged ? styles.flagged : ""
        }`}
        onClick={(e) => onLeftClick(e, cell)}
        onContextMenu={(e) => onRightClick(e, cell)}
    >
        {cell.isRevealed && cell.nearbyMines > 0 ? cell.nearbyMines : ""}
    </div>
);
