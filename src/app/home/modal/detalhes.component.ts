import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'detalhes-page',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.component.scss']
})

export class DetalhesComponent implements OnInit {

  @Input() value: any;

  constructor(public router: Router,
              public modalController: ModalController,
              public storageService: LocalStorageService,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
