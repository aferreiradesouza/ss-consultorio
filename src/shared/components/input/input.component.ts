import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

type TypeInput = 'text' | 'password';

@Component({
  selector: 'ss-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {

  public teste: string;

  @Input() label: string;
  @Input() mode: string;
  @Input() opcional: boolean;

  constructor(public router: Router) {}

  ngOnInit() {
  }
}
