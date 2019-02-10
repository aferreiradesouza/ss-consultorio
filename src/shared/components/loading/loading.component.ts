import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent implements OnInit {

  @Input() ativo: boolean;
  @Input() label: string;

  constructor(public router: Router) {}

  ngOnInit() {
  }
}
