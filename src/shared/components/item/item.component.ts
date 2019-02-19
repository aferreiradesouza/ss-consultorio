import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  @Input() label: string;
  @Input() text: string;
  @Input() type: string;

  constructor(public router: Router) {}

  ngOnInit() {
  }
}
