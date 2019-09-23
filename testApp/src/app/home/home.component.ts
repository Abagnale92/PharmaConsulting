import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sintomo: string;
  sintomoTitle: string;
  farmaco: string;
  descrizione: string;
  img: string;
  public r;
  public r2: any[] = [];
  visible: boolean = false;
  instruction: boolean = true;

  constructor(private database: DbService) { }

  ngOnInit() {
  }

  onSubmit() {
    const k = this.r2.length;
    for ( let j = 0; j < k ; j++) {
      this.r2.pop();
    }
    this.sintomo = this.sintomoTitle;
    this.sintomo = this.sintomo.toLowerCase();
    this.sintomo = this.sintomo.split(' ').join('_');
    this.sintomo = this.sintomo.substring(0, 1).toUpperCase() + this.sintomo.substring(1);


    this.database.getDrugFromSymptom(this.sintomo).subscribe(data => {

      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      for (let i = 0; i < n; i++) {

          this.r2.push({farmaco: this.splittingString(this.r.results.bindings[i].farmaco.value) ,
             sintomo: this.splittingString(this.r.results.bindings[i].sintomo.value) ,
             descrizione: this.r.results.bindings[i].descrizione.value.substring(0, 148) + '...' ,
             img: this.r.results.bindings[i].imgF.value});

        }

      this.showCards();
    }
      );

  }

  setOnClickDrugId(drug: string) {
    this.database.setDrugID(drug);
  }

  private showCards() {
    this.instruction = false;
    this.visible = true;

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
