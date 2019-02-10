import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-item-agenda',
  templateUrl: './item-agenda.page.html',
  styleUrls: ['./item-agenda.component.scss']
})

export class ItemAgendaComponent implements OnInit {

  @Input() itens: any[];

  constructor(public router: Router) {}

  ngOnInit() {
  }
}
