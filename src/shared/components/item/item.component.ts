import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {
  }
}
