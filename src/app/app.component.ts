import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Pawn Simulator';
  pawnPosition: any = null;
  moveHistory: string[] = [];

  onPlace(position: any) {
    if (position === null) {
      this.pawnPosition = null;
    } else if (
      position.x >= 0 &&
      position.x <= 7 &&
      position.y >= 0 &&
      position.y <= 7
    ) {
      this.pawnPosition = position;
    } else {
      alert(
        'Pawn at edge!! Please change the direction and try Move action again'
      );
    }
  }

  addToHistory(message: string) {
    this.moveHistory.push(message);
  }

  resetHistory() {
    this.moveHistory = [];
  }

  onMove(action: string) {
    if (action == 'RESET') {
      this.moveHistory = [];
    } else {
      this.addToHistory(action);
    }
  }
}
