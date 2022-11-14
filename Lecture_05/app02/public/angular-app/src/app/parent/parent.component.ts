import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  parentX:number=5;
  parentY:number=3;
  parentZ!:number;
  constructor() { }

  ngOnInit(): void {
  }

  setParentZ(val:number):void{
    this.parentZ=val;
  }
}
