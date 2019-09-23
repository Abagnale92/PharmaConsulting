import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { HomeComponent } from './home/home.component';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { NormativaComponent } from './normativa/normativa.component';
import { InteractionDrugComponent } from './interaction-drug/interaction-drug.component';
import { ProducerComponent } from './producer/producer.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    HomeComponent,
    DrugDetailsComponent,
    NormativaComponent,
    InteractionDrugComponent,
    ProducerComponent,
    PharmacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SlimLoadingBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
