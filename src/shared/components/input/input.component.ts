import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {

  @Input() label: string;

  constructor(public router: Router) {}

  ngOnInit() {}

}
