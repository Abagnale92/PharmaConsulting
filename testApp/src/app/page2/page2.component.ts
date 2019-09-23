import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {

  patologia: string;
  medico: string;
  struttura: string;
  descrizioneP: string;
  telS: string;
  indS: string;
  drug: string;

  cards: boolean = false;
  details: boolean = false;
  public r;
  public r2: any[] = [];
  constructor(private database: DbService) { }

  ngOnInit() {
  }

  onSubmit() {
    const k = this.r2.length;
    for (let j = 0; j < k ; j++) {
      this.r2.pop();
    }
    this.patologia = this.patologia.toLowerCase();
    this.patologia = this.patologia.split(' ').join('_');
    this.patologia = this.patologia.substring(0, 1).toUpperCase() + this.patologia.substring(1);
    console.log(this.patologia);

    this.database.getPatologyDetails(this.patologia).subscribe(data => {

      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      for (var i = 0; i < n; i++) {

          this.patologia = this.splittingString(this.r.results.bindings[i].patologia.value);
          this.medico = this.splittingString(this.r.results.bindings[i].medico.value);
          this.descrizioneP = this.r.results.bindings[i].descrizioneP.value;
          this.struttura = this.splittingString(this.r.results.bindings[i].struttura.value);
          this.telS = this.r.results.bindings[i].telS.value;
          this.indS = this.r.results.bindings[i].indS.value ;

        }
      this.showDetails();
    }
      );

    this.database.getDrugFromPatology(this.patologia).subscribe(data => {
        this.r = JSON.parse(JSON.stringify(data));
        const n = this.r.results.bindings.length;
        for (var i = 0; i < n; i++) {

            this.r2.push({farmaco: this.splittingString(this.r.results.bindings[i].farmaco.value) ,
               descrizione: this.r.results.bindings[i].descrizioneF.value.substring(0, 148) + '...' ,
               img: this.r.results.bindings[i].imgF.value});

          }
        console.log(this.r2);
        this.showCards();
      }
        );

  }

  setOnClickDrugId(drug: string) {
    this.database.setDrugID(drug);
  }

  private showCards() {

    this.cards = true;

  }

  private showDetails() {
    this.details = true;
  }

  private splittingString(s) {
    let x = s.split('/');
    let element = x[x.length - 1];
    if (!element.includes('#')) {
      if (element.includes('_')) {
        var newElement = element.replace('_', ' ');
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
