import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
})
export class ChessBoardComponent {
  @Input() pawnPosition: any | null = null;
  board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  isBlackSquare(row: number, col: number): boolean {
    return (row + col) % 2 === 1;
  }

  isPawnPosition(row: number, col: number): boolean {
    return this.pawnPosition?.x === col && this.pawnPosition?.y === row;
  }

  getDirectionStyle(): any {
    if (!this.pawnPosition) {
      return {};
    }
    console.log(this.pawnPosition);
    const directionMap: any = {
      NORTH: {
        top: '-2px',
        left: '50%',
        transform: 'translateX(-50%) rotate(0deg)',
      },
      EAST: {
        top: '50%',
        right: '0px',
        transform: 'translateY(-50%) rotate(90deg)',
      },
      SOUTH: {
        bottom: '0px',
        left: '50%',
        transform: 'translateX(-50%) rotate(180deg)',
      },
      WEST: {
        top: '50%',
        left: '0px',
        transform: 'translateY(-50%) rotate(270deg)',
      },
    };

    return directionMap[this.pawnPosition.direction || 'NORTH'];
  }

  getArrowClass(): string {
    switch (this.pawnPosition?.direction) {
      case 'NORTH':
        return 'arrow-north';
      case 'SOUTH':
        return 'arrow-south';
      case 'EAST':
        return 'arrow-east';
      case 'WEST':
        return 'arrow-west';
      default:
        return '';
    }
  }
}
