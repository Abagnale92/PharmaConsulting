import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { NormativaComponent } from './normativa/normativa.component';
import { InteractionDrugComponent } from './interaction-drug/interaction-drug.component';
import { ProducerComponent } from './producer/producer.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';

const routes: Routes = [
  {path: 'drug-details' , component: DrugDetailsComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'page1' , component: Page1Component},
  {
    path: 'page2' , component: Page2Component,
      /*children: [
        {path: 'drug-details' , component: DrugDetailsComponent}
      ]*/
  },
  {path: 'normativa' , component: NormativaComponent},
  {path: 'interactiondrug' , component: InteractionDrugComponent},
  {path: 'producer' , component: ProducerComponent},
  {path: 'pharmacy' , component: PharmacyComponent},
  {path: '', redirectTo: '/home' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
