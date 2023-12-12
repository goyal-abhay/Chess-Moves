import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  rows = 8;
  columns = 8;
  allBlocks: any = [];
  queen: boolean = false;
  bishop: boolean = false;
  rook: boolean = false;
  knight: boolean = false;
  activeButton: string | null = null;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.boardSetup();
  }

  boardSetup() {
    this.allBlocks = [];
    for (let i = 1; i <= this.rows; i++) {
      let eachColumn = [];
      for (let j = 1; j <= this.columns; j++) {
        if ((i + j) % 2) {
          const block = { row: i, column: j, color: 'black' };
          eachColumn.push(block);
        } else {
          const block = { row: i, column: j, color: 'white' };
          eachColumn.push(block);
        }
      }
      this.allBlocks.push(eachColumn);
    }
  }

  resetBoard() {
    this.boardSetup();
    this.bishop = false;
    this.queen = false;
    this.rook = false;
    this.knight = false;
    this.activeButton = null;
    this.toastr.success('Board reset successfully');
  }

  possibleMoves(block: { row: number; column: number; color: string }) {
    const blockRow = block.row;
    const blockColumn = block.column;
    if (this.queen) {
      // Highlight the entire row, excluding the starting position
      for (let i = 0; i < this.rows; i++) {
        if (i !== blockRow - 1) {
          this.allBlocks[i][blockColumn - 1].color = 'green';
        }
      }

      // Highlight the entire column, excluding the starting position
      for (let j = 0; j < this.columns; j++) {
        if (j !== blockColumn - 1) {
          this.allBlocks[blockRow - 1][j].color = 'green';
        }
      }

      // Highlight diagonals going from top-left to bottom-right, excluding the starting position
      let row = blockRow - 2;
      let column = blockColumn - 2;
      while (row >= 0 && column >= 0) {
        this.allBlocks[row][column].color = 'green';
        row--;
        column--;
      }

      row = blockRow;
      column = blockColumn;
      while (row < this.rows && column < this.columns) {
        this.allBlocks[row][column].color = 'green';
        row++;
        column++;
      }

      // Highlight diagonals going from top-right to bottom-left, excluding the starting position
      row = blockRow - 2;
      column = blockColumn;
      while (row >= 0 && column < this.columns) {
        this.allBlocks[row][column].color = 'green';
        row--;
        column++;
      }

      row = blockRow;
      column = blockColumn - 2;
      while (row < this.rows && column >= 0) {
        this.allBlocks[row][column].color = 'green';
        row++;
        column--;
      }

      this.allBlocks[blockRow - 1][blockColumn - 1].color = 'lightcoral';
    }
    this.queen = false;

    if (this.bishop) {
      // Highlight diagonals going from top-left to bottom-right, excluding the starting position
      let row = blockRow - 2;
      let column = blockColumn - 2;
      while (row >= 0 && column >= 0) {
        this.allBlocks[row][column].color = 'green';
        row--;
        column--;
      }

      row = blockRow;
      column = blockColumn;
      while (row < this.rows && column < this.columns) {
        this.allBlocks[row][column].color = 'green';
        row++;
        column++;
      }

      // Highlight diagonals going from top-right to bottom-left, excluding the starting position
      row = blockRow - 2;
      column = blockColumn;
      while (row >= 0 && column < this.columns) {
        this.allBlocks[row][column].color = 'green';
        row--;
        column++;
      }

      row = blockRow;
      column = blockColumn - 2;
      while (row < this.rows && column >= 0) {
        this.allBlocks[row][column].color = 'green';
        row++;
        column--;
      }

      this.allBlocks[blockRow - 1][blockColumn - 1].color = 'lightcoral';
    }
    this.bishop = false;

    if (this.rook) {
      // Highlight the entire row, excluding the starting position

      for (let i = 0; i < this.rows; i++) {
        if (i !== blockRow - 1) {
          this.allBlocks[i][blockColumn - 1].color = 'green';
        }
      }

      // Highlight the entire column, excluding the starting position
      for (let j = 0; j < this.columns; j++) {
        if (j !== blockColumn - 1) {
          this.allBlocks[blockRow - 1][j].color = 'green';
        }
      }
    }
    this.rook = false;

    if (this.knight) {
      const knightMoves = [
        { row: blockRow - 2, column: blockColumn - 1 },
        { row: blockRow - 2, column: blockColumn + 1 },
        { row: blockRow - 1, column: blockColumn - 2 },
        { row: blockRow - 1, column: blockColumn + 2 },
        { row: blockRow + 1, column: blockColumn - 2 },
        { row: blockRow + 1, column: blockColumn + 2 },
        { row: blockRow + 2, column: blockColumn - 1 },
        { row: blockRow + 2, column: blockColumn + 1 },
      ];

      for (const move of knightMoves) {
        const { row, column } = move;
        if (
          row >= 0 &&
          row < this.rows &&
          column >= 0 &&
          column < this.columns
        ) {
          this.allBlocks[row][column].color = 'green';
        }
      }

      this.allBlocks[blockRow - 1][blockColumn - 1].color = 'lightcoral';
    }
    this.knight = false;
  }

  handleButtonClick(buttonName: string): void {
    this.activeButton = buttonName;

    switch (buttonName) {
      case 'Bishop':
        this.handleBishopClick();
        break;
      case 'Rook':
        this.handleRookClick();
        break;
      case 'Knight':
        this.handleKnightClick();
        break;
      case 'Queen':
        this.handleQueenClick();
        break;
      default:
        break;
    }
  }

  handleBishopClick() {
    this.boardSetup();
    this.bishop = true;
    this.queen = false;
    this.rook = false;
    this.knight = false;
  }

  handleRookClick(): void {
    this.boardSetup();
    this.bishop = false;
    this.queen = false;
    this.rook = true;
    this.knight = false;
  }

  handleKnightClick(): void {
    this.boardSetup();
    this.bishop = false;
    this.queen = false;
    this.rook = false;
    this.knight = true;
  }

  handleQueenClick(): void {
    this.boardSetup();
    this.bishop = false;
    this.queen = true;
    this.rook = false;
    this.knight = false;
  }
}
