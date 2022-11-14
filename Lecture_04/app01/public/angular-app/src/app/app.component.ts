import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';
  people:string[]=['Jack','John','Joe','Jim','Jack'];
  students=[
              {name: "Jack",course: "MWA", gpa: 3.0},
              {name: "Jill",course: "MPP", gpa: 3.5},
              {name: "Jim",course: "MWA", gpa: 3.2},
            ];
  today:Date=new Date();
  onBtnClick(){
    this.title="Button Clicked";
  }
}
