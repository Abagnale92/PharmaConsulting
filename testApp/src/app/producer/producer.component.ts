import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss']
})
export class ProducerComponent implements OnInit {
  producer: string;
  producerTitle: string;
  website: string;
  address: string;
  number: string;
  r;
  r2: any[] = [];
  r3: any[] = [];

  constructor(private database: DbService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.producer = this.database.getProducer();
    this.producerTitle = this.producer.split('_').join(' ');

    console.log(this.producer);
    this.database.getProducerDetails().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      for (var i = 0; i < n; i++) {
         this.address = this.r.results.bindings[i].indP.value;
         this.number = this.r.results.bindings[i].telP.value;
         this.website = this.r.results.bindings[i].sitoP.value;

      }
    });

    this.database.getProducerPharmacyDetails().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      for (var i = 0; i < n; i++) {
        this.r2.push({farmacia: this.splittingString(this.r.results.bindings[i].farmacie.value) ,
          indFarm: this.r.results.bindings[i].indFarm.value ,
          telFarm: this.r.results.bindings[i].telFarm.value
          });

      }
    });

    this.database.getProducerDrugs().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      for (var i = 0; i < n; i++) {
        this.r3.push({farmaco: this.splittingString(this.r.results.bindings[i].farmaco.value),
          imgF : this.r.results.bindings[i].imgF.value,
          descrizione : this.r.results.bindings[i].descrizione.value.substring(0, 148) + '...'

          });

      }
      console.log(this.r3);
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

  setOnClickDrugId(drug: string) {
    this.database.setDrugID(drug);
  }

}
