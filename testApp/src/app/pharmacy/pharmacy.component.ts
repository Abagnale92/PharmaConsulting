import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  r;
  r2: any[] = [];
  constructor(private database: DbService) { }

  ngOnInit() {

    this.database.getProducerPharmacyDetails().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      for (var i = 0; i < n; i++) {
        this.r2.push({farmacia: this.splittingString(this.r.results.bindings[i].farmacie.value) ,
          indFarm: this.r.results.bindings[i].indFarm.value ,
          telFarm: this.r.results.bindings[i].telFarm.value,
          orario: this.r.results.bindings[i].orari.value
          });

      }
    });
  }

  public splittingString(string) {
    let x = string.split('/');
    let element = x[x.length - 1];
    if (!element.includes('#')) {
      if (element.includes('_')) {
        var newElement = element.replace("_"," ");
        return newElement;
      }
      return element;
    }
    else {
      element = x[x.length - 1].split('#')[1];
      if (element.includes('_')) {
        let newElement = element.replace(/_/g, ' ');
        return newElement;
      }
      return element;
    }
  }

}
