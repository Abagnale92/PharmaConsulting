import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbService } from '../db.service';

@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.scss']
})
export class DrugDetailsComponent implements OnInit {
  private sparqlData = null;
  message: string;
  public jsonObject: any;
  nome: string;
  imgF: string;
  descrizione: string;
  codiceF: string;
  formato: string;
  somministrazione: string;
  dose: string;
  ricetta: string;
  produttore: string;
  prezzo: string;
  patologia: string;
  medico: string;
  effetto: string;
  farmacia: string;
  controindicazioni: string;
  categoria: string;
  eccipient: string;
  public r;

  constructor(private http: HttpClient, private database: DbService) {

   }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.database.getDrugDetails().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      for (var i = 0; i < n; i++) {
         this.nome = this.splittingString(this.r.results.bindings[i].farmaco.value);
         this.imgF = this.r.results.bindings[i].imgF.value;
         this.descrizione = this.r.results.bindings[i].descrizione.value;
         this.codiceF = this.r.results.bindings[i].codiceF.value;
         this.formato = this.r.results.bindings[i].formato.value;
         this.somministrazione = this.r.results.bindings[i].somministrazione.value;
         this.dose = this.r.results.bindings[i].dose.value;
         this.ricetta = this.r.results.bindings[i].ricetta.value;
         this.produttore = this.splittingString(this.r.results.bindings[i].produttore.value);
         this.database.setDataProducer(this.produttore);
         this.prezzo = this.r.results.bindings[i].prezzo.value;
      }
    });

    this.database.getPatologyDrug().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      this.patologia = this.splittingString(this.r.results.bindings[0].patologia.value) + ' ';
      for (var i = 1; i < n; i++) {
        this.patologia += this.splittingString(this.r.results.bindings[i].patologia.value) + ' ';
      }
    });

    this.database.getDrugWithCategory().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      this.categoria = this.splittingString(this.r.results.bindings[0].categoria.value) + ' ';
      for (var i = 1; i < n; i++) {
        this.categoria += this.splittingString(this.r.results.bindings[i].categoria.value) + ' ';
      }
    });

    this.database.getDrugDetailsEccipient().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      this.eccipient = this.splittingString(this.r.results.bindings[0].principio.value) + ' ';
      for (var i = 1; i < n; i++) {
        this.eccipient += this.splittingString(this.r.results.bindings[i].principio.value) + ' ';
      }
    });

    this.database.getCollateralEffect().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      this.effetto = this.splittingString(this.r.results.bindings[0].effetto.value) + ' ';
      for (var i = 1; i < n; i++) {
        this.effetto += this.splittingString(this.r.results.bindings[i].effetto.value) + ' ';
      }
    });

    this.database.getControindication().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      this.controindicazioni = this.splittingString(this.r.results.bindings[0].controindicazioni.value) + ' ';
      for (var i = 1; i < n; i++) {
        this.controindicazioni += this.splittingString(this.r.results.bindings[i].controindicazioni.value) + ' ';
      }
    });

    this.database.getDoctor().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      this.medico = this.splittingString(this.r.results.bindings[0].medico.value) + ' ';
      for (var i = 1; i < n; i++) {
        this.medico += this.splittingString(this.r.results.bindings[i].medico.value) + ' ';
      }
    });

    this.database.getPharmacy().subscribe(data => {
      this.r = JSON.parse(JSON.stringify(data));
      const n = this.r.results.bindings.length;
      this.farmacia = this.splittingString(this.r.results.bindings[0].farmacia.value) + ' ';
      for (var i = 1; i < n; i++) {
        this.farmacia += this.splittingString(this.r.results.bindings[i].farmacia.value) + ' ';
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
  /*
  public getDrugsDetails(drug: JSON) {
    let obj = JSON.parse(JSON.stringify(this.sparqlData));
    let n = obj.results.bindings.length;
    for (var i = 0; i < n; i++) {
      console.log(this.splittingString(obj.results.bindings[i].farmaco.value));
    }
  }
  */



}


