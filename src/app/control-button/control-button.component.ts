import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-control-button',
  templateUrl: './control-button.component.html',
  styleUrl: './control-button.component.css',
})
export class ControlButtonComponent {
  position: any = {
    x: 0,
    y: 0,
    direction: 'NORTH',
    color: 'WHITE',
  };
  firstTimePlace: boolean = true;
  showFirstMoveButtons: boolean = true;

  @Output() place = new EventEmitter<any>();
  @Output() moveAction = new EventEmitter<string>();

  onPlace() {
    if (this.firstTimePlace) {
      if (this.isValidPosition()) {
        this.place.emit({ ...this.position });
        this.moveAction.emit(
          `PLACE ${this.position.x},${this.position.y},${this.position.direction},${this.position.color}`
        );
        this.firstTimePlace = false;
      } else {
        alert(
          'Pawn at edge!! Please change the direction and try Move action again'
        );
      }
    } else {
      const userResponse = window.confirm(
        'This action will reset the pawn and logs, Are you sure want to continue'
      );

      if (userResponse) {
        this.place.emit(null);
        this.moveAction.emit('RESET');
        this.position = {
          x: 0,
          y: 0,
          direction: 'NORTH',
          color: 'WHITE',
        };
        this.firstTimePlace = true;
        this.showFirstMoveButtons = true;
      }
    }
  }

  private isValidPosition(): boolean {
    return (
      this.position.x >= 0 &&
      this.position.x <= 7 &&
      this.position.y >= 0 &&
      this.position.y <= 7
    );
  }

  onFirstMove(steps: number) {
    if (this.firstTimePlace) {
      return;
    }
    if (this.canMove(steps)) {
      this.position = this.calculateNewPosition(steps);
      this.place.emit({ ...this.position });
      this.moveAction.emit(
        this.showFirstMoveButtons ? `MOVE ${steps}` : 'MOVE'
      );
      this.firstTimePlace = false;
      this.showFirstMoveButtons = false;
    } else {
      alert(
        'Pawn at edge!! Please change the direction and try Move action again'
      );
    }
  }

  onRotate(direction: 'LEFT' | 'RIGHT') {
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    let index = directions.indexOf(this.position.direction);
    index =
      direction === 'LEFT'
        ? (index - 1 + directions.length) % directions.length
        : (index + 1) % directions.length;
    this.position.direction = directions[index];
    this.place.emit({ ...this.position });
    this.moveAction.emit(direction);
  }

  private canMove(steps: number): boolean {
    const newPos = this.calculateNewPosition(steps);
    return newPos.x >= 0 && newPos.x <= 7 && newPos.y >= 0 && newPos.y <= 7;
  }

  private calculateNewPosition(steps: number): any {
    const newPos = { ...this.position };
    switch (this.position.direction) {
      case 'NORTH':
        newPos.x += steps;
        break;
      case 'EAST':
        newPos.y += steps;
        break;
      case 'SOUTH':
        newPos.x -= steps;
        break;
      case 'WEST':
        newPos.y -= steps;
        break;
    }
    return newPos;
  }

  onReport() {
    const { x, y, direction, color } = this.position;
    alert(`${x}, ${y}, ${direction}, ${color}`);
    this.moveAction.emit(`REPORT ${x}, ${y}, ${direction}, ${color}`);
  }
}
