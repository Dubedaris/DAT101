"use strict";
import { TSpriteCanvas, TSpriteButton } from "libSprite";
import { TPoint } from "lib2d";
import { SpriteInfoList, gameLevel } from "./Minesweeper.mjs";

let tiles = [];

export class TTile extends TSpriteButton {
    #isMine;

    constructor(aSpcvs, aSPI, aCol, aRow) {
        const pos = new TPoint(20, 133)
        pos.x += aSPI.width * aCol;
        pos.y += aSPI.height * aRow;
        super(aSpcvs, aSPI, pos.x, pos.y);
        this.#isMine = false;
    }

    get isMine() {
        return this.#isMine;
    }

    set isMine(aValue) {
        this.#isMine = aValue;
    }

    get open() {
        return this.index === 2;
    }

    //Override functions
    onMouseDown(aEvent) {
        this.index = 1;
        super.onMouseDown(aEvent);
    }

    onMouseUp(aEvent) {
        this.index = 2;
        super.onMouseUp(aEvent);
    }


    onMouseLeave(aEvent) {
        if (!this.open) {
            this.index = 0;
            super.onMouseLeave(aEvent);
        }

    }

} //TTile END

export function createMines() {
    mineCount = 0;
    colCount = gameLevel.Tiles.Col;
    rowCount = gameLevel.Tiles.Row;

    do {
        const col = Math.floor(Math.random() * colCount);
        const row = Math.floor(Math.random() * rowCount);
        const tile = tiles[col][row];
        if(tile.isMine === false) {
            tile.isMine = true;
            mineCount++;
        } 
    } while (mineCount <= gameLevel.Mines)
}


export function newTiles(aSpcvs, aSPI) {
    console.log(gameLevel);
    const glTiles = gameLevel.Tiles;
    const colCount = glTiles.Col;
    const rowCount = glTiles.Row;

    switch (gameLevel.caption) {
        case "Level 1": //100 tiles - 5 mines
            tiles = [];
            for (let col = 0; col < colCount; col++) {
                const rows = []
                for (let row = 0; row < rowCount; row++) {
                    const newTile = new TTile(aSpcvs, aSPI, col, row)
                    rows.push(newTile);
                }
                tiles.push(rows);
            }
            break;
        case "Level 2": // 225 tiles - 20 mines
            tiles = [];
            for (let col = 0; col < colCount; col++) {
                const rows = []
                for (let row = 0; row < rowCount; row++) {
                    const newTile = new TTile(aSpcvs, aSPI, col, row)
                    rows.push(newTile);
                }
                tiles.push(rows);
            }
            break;
        case "Level 3": // 600 tiles - 99 mines
            tiles = [];
            for (let col = 0; col < colCount; col++) {
                const rows = []
                for (let row = 0; row < rowCount; row++) {
                    const newTile = new TTile(aSpcvs, aSPI, col, row)
                    rows.push(newTile);
                }
                tiles.push(rows);
            }
            break;
    }
}

export function drawTiles() {
    const colCount = gameLevel.Tiles.Col;
    const rowCount = gameLevel.Tiles.Row;
    for (let col = 0; col < colCount; col++) {
        const rows = tiles[col];
        for (let row = 0; row < rowCount; row++) {
            const tiles = rows[row]
            tiles.draw();
        }
    }
}