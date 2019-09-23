import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-interaction-drug',
  templateUrl: './interaction-drug.component.html',
  styleUrls: ['./interaction-drug.component.scss']
})
export class InteractionDrugComponent implements OnInit {
farmaco: string;
nome: string;
principioattivo: string;
formula: string;
imgP: string;
categoria: string;
Drug: object;
public r;
public r2: any[] = [];
public r3: any[] = [];
visible: boolean = false;
eccipientVisible: boolean = false;


  constructor(private database: DbService) { }

  ngOnInit() {

  }



  onSubmit(nameDrugOrEccipient: JSON) {
    const k = this.r2.length;
    for(let j=0; j < k ; j++){
      this.r2.pop();
    }
    let o = JSON.parse(JSON.stringify(nameDrugOrEccipient));
    if (o.options === 'Nome') {

      this.farmaco = this.farmaco.toLowerCase();
      this.farmaco = this.farmaco.substring(0, 1).toUpperCase() + this.farmaco.substring(1);
      console.log(this.farmaco);
      this.database.getInteractionbyName(this.farmaco).subscribe(data => {

        this.r = JSON.parse(JSON.stringify(data));
        const n = this.r.results.bindings.length;
        for (var i = 0; i < n; i++) {

            this.r2.push({principio: this.splittingString(this.r.results.bindings[i].principio.value) ,
               farmaco1: this.splittingString(this.r.results.bindings[i].farmaco1.value) ,
               farmaco2: this.splittingString(this.r.results.bindings[i].farmaco2.value) ,
               principiononcompatibile: this.splittingString(this.r.results.bindings[i].principiononcompatibile.value) });

          }
        this.showDrugs();
      }
        );

      this.database.getEccipientDetailsbyDrugName(this.farmaco).subscribe(data => {

          this.r = JSON.parse(JSON.stringify(data));
          const n = this.r.results.bindings.length;
          for (var i = 0; i < n; i++) {
            this.formula = this.r.results.bindings[i].formula.value;
            this.imgP = this.r.results.bindings[i].imgP.value;

            }
          this.showEccipientDetails();
        }
          );
    }

    if (o.options === 'PrincipioAttivo') {

      this.database.getEccipientDetails(this.farmaco).subscribe(data => {

        this.r = JSON.parse(JSON.stringify(data));
        const n = this.r.results.bindings.length;
        for (var i = 0; i < n; i++) {
          this.formula = this.r.results.bindings[i].formula.value;
          this.imgP = this.r.results.bindings[i].imgP.value;

          }
          this.showEccipientDetails();
      }
        );


      this.farmaco = this.farmaco.toLowerCase();
      this.farmaco = this.farmaco.substring(0, 1).toUpperCase() + this.farmaco.substring(1);
      console.log(this.farmaco);
      this.database.getInteractionbyEccipient(this.farmaco).subscribe(data => {

        this.r = JSON.parse(JSON.stringify(data));
        const n = this.r.results.bindings.length;
        for (var i = 0; i < n; i++) {
            this.r2.push({principio: this.splittingString(this.r.results.bindings[i].principio.value) ,
               farmaco1: this.splittingString(this.r.results.bindings[i].farmaco1.value) ,
               farmaco2: this.splittingString(this.r.results.bindings[i].farmaco2.value) ,
               principiononcompatibile: this.splittingString(this.r.results.bindings[i].principiononcompatibile.value) });

          }
        this.showDrugs();
      }
        );
    }





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

  private showDrugs() {
    this.visible = true;

  }

  private showEccipientDetails(){
    this.eccipientVisible = true;
  }

}

