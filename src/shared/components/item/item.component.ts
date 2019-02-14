import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

type TypeInput = 'text' | 'password';

@Component({
  selector: 'ss-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  @Input() type: string;

  constructor(public router: Router) {}

  ngOnInit() {
  }
}
