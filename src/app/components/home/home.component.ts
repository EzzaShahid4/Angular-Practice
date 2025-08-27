import { ReturnStatement } from '@angular/compiler';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // add: number = 0;
  // title = 'Interpolation practice';
  // HandelEventCall() {
  //   alert('Function Call');
  //   this.OtherFunction();
  // }
  // OtherFunction() {
  //   console.log('Call function from another function');
  // }
  // Sum(a: number, b: number) {
  //   this.add = a + b;
  // }
  // getData(val: string) {
  //   console.log(val);
  // }
  // MouseEffect(val: string) {
  //   console.log(val);
  // }
}
