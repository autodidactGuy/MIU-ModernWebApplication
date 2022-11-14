import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input()
  childX!:number;
  @Input()
  childY!:number;
  childZ!:number;

  @Output()
  addEvent:EventEmitter<number>=new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  add():void{
    this.childZ=this.childX+this.childY;
    this.addEvent.emit(this.childZ);
  }
}
