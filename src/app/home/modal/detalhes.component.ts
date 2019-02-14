import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

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

  public formaterName(name) {
    const regex = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}?)/;
    return name.match(regex)[0];
  }

  public formaterData(data) {
    return moment(data).format('DD/MM/YYYY');
  }

  close() {
    this.modalController.dismiss();
  }
}
