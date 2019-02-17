import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;

  @Output() clickAgenda = new EventEmitter();

  constructor(public router: Router) {}

  ngOnInit() {
  }

  irAgendaCompleta() {
    this.clickAgenda.emit();
  }
}
