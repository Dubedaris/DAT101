"use strict";
import { TSpriteButton } from "libSprite";
import { TPoint } from "lib2d";
import { gameLevel, gameInfo } from "./Minesweeper.mjs";

const mineInfoColours = ["blue", "green", "red", "darkblue", "brown", "cyan", "black", "grey"];

let tiles = [];
const ctx = document.getElementById("cvs").getContext("2d");
export let gameIsOver = false;
export let gameIsWon = false;
export let openCount = 0;

export class TTile extends TSpriteButton {
    #mine;
    #col;
    #row;
    #neighbours;

    constructor(aSpcvs, aSPI, aCol, aRow) {
        const pos = new TPoint(20, 133)
        pos.x += aSPI.width * aCol;
        pos.y += aSPI.height * aRow;
        super(aSpcvs, aSPI, pos.x, pos.y);
        this.#mine = false;
        this.#col = aCol;
        this.#row = aRow;
        this.#neighbours = null;
        this.mineInfo = 0;
    }

    get isMine() {
        return this.#mine;
    }

    set isMine(aValue) {
        this.#mine = aValue;
        this.mineInfo = 0;
        this.#getNeighbours();
        for (let i = 0; i < this.#neighbours.length; i++) {
            const tile = this.#neighbours[i];
            if (tile.isMine === false) {
                tile.mineInfo++;
            }
        }
    }

    get open() {
        return this.index === 2;
    }

    draw() {
        super.draw();
        if (this.open && this.mineInfo) {
            ctx.font = "24px Consolas";
            ctx.fillStyle = mineInfoColours[this.mineInfo - 1];
            ctx.fillText(this.mineInfo, this.x + 18, this.y + 34);
        }
    }

    #getNeighbours() {
        if (this.#neighbours !== null) {
            return;
        }
        let colFrom = this.#col - 1;
        let colTo = this.#col + 1;
        let rowFrom = this.#row - 1;
        let rowTo = this.#row + 1;

        if (colFrom < 0) {
            colFrom = 0;
        } if (colTo >= gameLevel.Tiles.Col) {
            colTo = gameLevel.Tiles.Col - 1;
        } if (rowFrom < 0) {
            rowFrom = 0;
        } if (rowTo >= gameLevel.Tiles.Row) {
            rowTo = gameLevel.Tiles.Row - 1;
        } // edgeCases END

        this.#neighbours = [];
        for (let colIndex = colFrom; colIndex <= colTo; colIndex++) {
            for (let rowIndex = rowFrom; rowIndex <= rowTo; rowIndex++) {
                const tile = tiles[colIndex][rowIndex];
                if (this !== tile) {
                    this.#neighbours.push(tile);
                }
            }
        }
    }

    //Override functions
    onMouseDown(aEvent) {
        if (gameIsOver) {
            return;
        }
        if (aEvent.button === 0 && this.index === 0) {
            this.index = 1;
            gameInfo.smileyIndex(1);
        } else if (aEvent.button === 2) {
            if (this.index === 0) {
                this.index = 3;
                if (gameInfo.flagCount > 0) {
                    gameInfo.flagCount--;
                } else {
                    this.index = 0;
                }
            } else if (this.index === 3) {
                this.index = 0;
                if (gameInfo.flagCount < gameLevel.Mines) {
                    gameInfo.flagCount++;
                } else {
                    this.index = 0;
                }
            } // this.index = 3 - this.index; <- this is an easy way to toggle!
        }
        super.onMouseDown(aEvent);
    }



    onMouseUp(aEvent) {
        if (gameIsOver) {
            return;
        }
        if (aEvent.button === 2 || this.index === 3) {
            return;
        }
        if (this.isMine) {
            gameInfo.smileyIndex(2);
        } else {
            gameInfo.smileyIndex(0);
        }
        this.open = true;
        super.onMouseUp(aEvent);
    }


    onMouseLeave(aEvent) {
        if (gameIsOver) {
            return;
        }
        if (this.index === 1) {
            this.index = 0;
            gameInfo.smileyIndex(0);
            super.onMouseLeave(aEvent);
        }
    }

    set open(_aValue) {
        if (this.isMine) {
            gameOver();
            this.index = 4; // Game over!
            return;
        } else {
            this.index = 2;
            openCount++;
            if (openCount === gameLevel.Tiles.Col * gameLevel.Tiles.Row - gameLevel.Mines) {
                console.log(openCount)
                gameInfo.smileyIndex(4)
                gameIsWon = true;
            }
        }

        if (this.mineInfo === 0) {
            this.#getNeighbours();
            for (let i = 0; i < this.#neighbours.length; i++) {
                const tile = this.#neighbours[i];
                if (tile.open === false) {
                    tile.open = true;
                }
            }
        }
    }

} //TTile END



export function gameOver() {
    //gameInfo.smileyIndex(2);
    gameIsOver = true;
    for (let colIndex = 0; colIndex < gameLevel.Tiles.Col; colIndex++) {
        const cols = tiles[colIndex];
        for (let rowIndex = 0; rowIndex < gameLevel.Tiles.Row; rowIndex++) {
            const tile = cols[rowIndex];
            if (tile.isMine) {
                if (tile.index === 3) {
                    tile.index = 7;
                } else {
                    tile.index = 5;
                }
            } else if (tile.index === 3) {
                tile.index = 6;
            } else {
                tile.index = 2;
            }
        }
    }
}

export function createMines() {
    let mineCount = 0;
    const colCount = gameLevel.Tiles.Col;
    const rowCount = gameLevel.Tiles.Row;

    do {
        const col = Math.floor(Math.random() * colCount);
        const row = Math.floor(Math.random() * rowCount);
        const tile = tiles[col][row];
        if (tile.isMine === false) {
            tile.isMine = true;
            mineCount++;
        }
    } while (mineCount < gameLevel.Mines)
}


export function newTiles(aSpcvs, aSPI) {
    gameIsWon = false;
    openCount = 0;
    console.log(gameLevel);
    const glTiles = gameLevel.Tiles;
    const colCount = glTiles.Col;
    const rowCount = glTiles.Row;

    gameIsOver = false;
    tiles = [];
    for (let col = 0; col < colCount; col++) {
        const rows = []
        for (let row = 0; row < rowCount; row++) {
            const newTile = new TTile(aSpcvs, aSPI, col, row)
            rows.push(newTile);
        }
        tiles.push(rows);
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