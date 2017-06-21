import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { MdMenuTrigger }     from '@angular/material';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  @Input() title: string;
  @Output() onChangeUserType = new EventEmitter();

  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  constructor() { }

  ngOnInit() {
  }

  changeUserType(){
    this.onChangeUserType.emit();
  }
}
