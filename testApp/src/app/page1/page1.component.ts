import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  farmaco: string;
  public r;
  public r2: any[] = [];
  visible: boolean = false;

  constructor(private database: DbService) { }

  ngOnInit() {
  }

  onSubmit(nameDrugOrCategory){
    const k = this.r2.length;
    for(let j=0; j < k ; j++){
      this.r2.pop();
    }

    let o = JSON.parse(JSON.stringify(nameDrugOrCategory));
    if (o.options === 'Nome') {
      this.farmaco = this.farmaco.toLowerCase();
      this.farmaco = this.farmaco.substring(0, 1).toUpperCase() + this.farmaco.substring(1);
      console.log(this.farmaco);
      this.database.getDrugbyName(this.farmaco).subscribe(data => {

        this.r = JSON.parse(JSON.stringify(data));
        const n = this.r.results.bindings.length;
        for (var i = 0; i < n; i++) {
            this.r2.push({farmaco: this.splittingString(this.r.results.bindings[i].farmaco.value) ,
               imgF: this.r.results.bindings[i].imgF.value ,
               descrizioneF: this.r.results.bindings[i].descrizioneF.value.substring(0, 148) + '...' ,
                });

          }
        this.showDrugs();
      }
        );
    }



    if (o.options === 'Categoria') {
      this.farmaco = this.farmaco.toLowerCase();
      this.farmaco = this.farmaco.substring(0, 1).toUpperCase() + this.farmaco.substring(1);
      console.log(this.farmaco);
      this.database.getDrugbyCategory(this.farmaco).subscribe(data => {

        this.r = JSON.parse(JSON.stringify(data));
        const n = this.r.results.bindings.length;
        for (var i = 0; i < n; i++) {
          this.r2.push({farmaco: this.splittingString(this.r.results.bindings[i].farmaco.value) ,
            imgF: this.r.results.bindings[i].imgF.value ,
            descrizioneF: this.r.results.bindings[i].descrizioneF.value.substring(0, 148) + '...' ,
             });

          }
        this.showDrugs();
      }
        );
    }
  }

  setOnClickDrugId(drug: string) {
    this.database.setDrugID(drug);
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


}
