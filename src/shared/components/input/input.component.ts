import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

type TypeInput = 'text' | 'password';

@Component({
  selector: 'ss-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {

  @Input() label: string;
  @Input() type: TypeInput;
  @Input() validacao: boolean;
  @Input() formValidacao: any;
  @Input() mode: string;

  constructor(public router: Router) {}

  ngOnInit() {
    if (this.formValidacao === 'true') {
      this.formValidacao = true;
    } else {
      this.formValidacao = false;
    }
  }
}
