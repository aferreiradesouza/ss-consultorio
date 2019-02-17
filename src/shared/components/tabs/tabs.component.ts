import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements OnInit {

  @Input() itens: any[];

  @Output() tabClick = new EventEmitter();

  public id: string;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.id = this.itens[0].id;
  }

  activeTab(id) {
    this.id = id;
  }

  public tabAtual(id) {
    this.activeTab(id);
    this.tabClick.emit(id);
  }
}
