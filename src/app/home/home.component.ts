import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_01.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_02.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_03.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_04.jpg',
  ];

  ballons = ['Blanc', 'Bleu', 'Rose', 'Vert'].map(c => (`../../assets/images/BallonTiroClub/Ballon_Tiro_Club_${c}_01.jpg`));
  currentIndex = 0;
  
  mouseOver(index: number) {
    this.ballons[index] = this.ballons[index].replace('01', '02');
  }

  mouseOut(index: number) {
    this.ballons[index] = this.ballons[index].replace('02', '01');
  }

  get currentImage() {
    return this.images[this.currentIndex];
  }

  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  scrollRight() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }
  selectedButton: string = '';

  onButtonClicked(size: string) {
    this.selectedButton = size;
  }

  showParagraph1 = false;
  showParagraph2 = false;

  toggleParagraphs() {
    this.showParagraph1 = !this.showParagraph1;
    this.showParagraph2 = !this.showParagraph2;
  }
  isRotated: boolean = false;

  toggleIcon() {
    this.isRotated = !this.isRotated;
  }
}
