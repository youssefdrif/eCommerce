import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Define the image arrays
  images = [ '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_01.jpg',
  '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_02.jpg',
  '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_03.jpg',
  '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_04.jpg',
  ];

  imagesBlanc = [
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_01.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_02.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_03.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Blanc_04.jpg',
  ];
  imagesBleu = [
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Bleu_01.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Bleu_02.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Bleu_03.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Bleu_04.jpg',
  ];
  imagesRose = [
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Rose_01.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Rose_02.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Rose_03.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Rose_04.jpg',
  ];
  imagesVert = [
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Vert_01.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Vert_02.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Vert_03.jpg',
    '../../assets/images/BallonTiroClub/Ballon_Tiro_Club_Vert_04.jpg',
  ];

  ballons = ['Blanc', 'Bleu', 'Rose', 'Vert'].map(c => (`../../assets/images/BallonTiroClub/Ballon_Tiro_Club_${c}_01.jpg`));
  currentIndex = 0;

  // Handle mouse over and mouse out events for the buttons
  mouseOver(index: number) {
    this.ballons[index] = this.ballons[index].replace('01', '02');
  }

  mouseOut(index: number) {
    this.ballons[index] = this.ballons[index].replace('02', '01');
  }

  // Get the margin for each button
  getMarginForIndex(i: number): string {
    const margins = ['0px 14px 0px 0px', '0px 21px 0px 21px', '0px 21px 0px 21px', '0px 0px 0px 14px'];
    return margins[i];
  }

  // Handle scrolling left and right through the images
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

  // Handle button click event and update the selected button
  selectedButton: string = '';

  onButtonClicked(size: string) {
    this.selectedButton = size;

    // Update the current image array based on the selected button
    if (size === '3') {
      this.images = this.imagesBlanc;
    } else if (size === '4') {
      this.images = this.imagesBleu;
    } else if (size === '5') {
      this.images = this.imagesRose;
    } else if (size === '6') {
      this.images = this.imagesVert;
    }

    // Reset the current index to the first image
    this.currentIndex = 0;
  }

  // Toggle paragraph visibility
  showParagraph1 = false;
  showParagraph2 = false;

  toggleParagraphs() {
    this.showParagraph1 = !this.showParagraph1;
    this.showParagraph2 = !this.showParagraph2;
  }

  // Toggle expand icon rotation
  isRotated: boolean = false;

  toggleIcon() {
    this.isRotated = !this.isRotated;
  }

  // Get the current image URL
  get currentImage() {
    return this.images[this.currentIndex];
  }
  starsArray: number[] = [1, 2, 3, 4, 5];
}

