import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private sparqlData = null;
  private jsonObject: any;
  private result: string;
  results: any[];
  r2: any[];
  /*private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();*/
  private id: string;
  private producer: string;

  constructor(private http: HttpClient) {

   }

  getInteractionbyName(farmaco): Observable<JSON> {
      /*
    const headers = new HttpHeaders()
            .set('Accept', 'q=0.8;application/json;q=0.9');*/

    return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
    'http%3A%2F%2Flocalhost%3A8890%2FDrugs&' +
    'query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
    'select+DISTINCT+%3Fprincipio+%3Ffarmaco1+%3Ffarmaco2+%3Fprincipiononcompatibile%0D%0A' +
    'where%7B+%0D%0A%0D%0A%3Ffarmaco1+farmaco%3AhaPrincipioAttivo+%3Fprincipio.%0D%0A%3Fprincipiononcompatibile+farmaco%3Anon%C3%A8Compatibile+%3Fprincipio.%0D%0A' +
    '%3Ffarmaco2+farmaco%3AhaPrincipioAttivo+%3Fprincipiononcompatibile.%0D%0A%0D%0A' +
    'FILTER+REGEX+%28%3Ffarmaco1%2C+%22' + farmaco + '%22%29%0D%0A%7D%0D%0A%0D%0A&' +
    'format=application%2Fsparql-results%2Bjson&timeout=0&' +
    'signal_void=on&signal_unconnected=on&run=+Run+Query+');
  }

  getInteractionbyEccipient(farmaco): Observable<JSON> {
    /*
  const headers = new HttpHeaders()
          .set('Accept', 'q=0.8;application/json;q=0.9');*/

  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&' +
  'query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Fprincipio+%3Ffarmaco1+%3Ffarmaco2+%3Fprincipiononcompatibile%0D%0A' +
  'where%7B+%0D%0A%0D%0A%3Fprincipiononcompatibile+farmaco%3Anon%C3%A8Compatibile+%3Fprincipio.%0D%0A%0D%0A%3Ffarmaco1+farmaco%3AhaPrincipioAttivo+%3Fprincipio.%0D%0A' +
  '%3Ffarmaco2+farmaco%3AhaPrincipioAttivo+%3Fprincipiononcompatibile.%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Fprincipio%2C+%22' + farmaco + '%22%29%0D%0A%7D%0D%0AORDER+BY+%3Ffarmaco1&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&' +
  'signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

  getDrugFromSymptom(sintomo: string): Observable<JSON> {

  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&' +
  'query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+%3Ffarmaco+%3Fsintomo+%3Fdescrizione+%3FimgF%0D%0A' +
  'where%7B%0D%0A%0D%0A%3Ffarmaco+farmaco%3AusatoPer+%3Fsintomo.%0D%0A%3F' +
  'farmaco+farmaco%3AImmagineFarmaco+%3FimgF.%0D%0A%3Ffarmaco+farmaco%3ADescrizioneFarmaco+%3Fdescrizione.%0D%0A' +
  'FILTER+REGEX+%28%3Fsintomo%2C+%22' + sintomo + '%22%29%0D%0A%7D&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}


getDrugbyName(name: string): Observable<JSON> {
  /*
const headers = new HttpHeaders()
        .set('Accept', 'q=0.8;application/json;q=0.9');*/

return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
'select+%3Ffarmaco+%3FimgF+%3FdescrizioneF%0D%0A'+
'where%7B+%0D%0A++%3Ffarmaco+farmaco%3AImmagineFarmaco+%3FimgF%3B%0D%0A+++++++++++farmaco%3ADescrizioneFarmaco+%3FdescrizioneF.%0D%0A%0D%0A' +
'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + name + '%22%29%0D%0A%7D&' +
'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}


getDrugbyCategory(category: string): Observable<JSON> {
  /*
const headers = new HttpHeaders()
        .set('Accept', 'q=0.8;application/json;q=0.9');*/

return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
'select+DISTINCT+%3Fcategoria+%3Ffarmaco+%3FimgF+%3FdescrizioneF%0D%0A'+
'where%7B+%0D%0A++%3Ffarmaco+farmaco%3A%C3%A8diCategoria+%3Fcategoria.%0D%0A++%3Ffarmaco+farmaco%3AImmagineFarmaco+%3FimgF.%0D%0A++%3Ffarmaco+farmaco%3A' +
'DescrizioneFarmaco+%3FdescrizioneF.%0D%0A%0D%0A' +
'FILTER+REGEX+%28%3Fcategoria%2C+%22' + category + '%22%29%0D%0A%7D%0D%0A%0D%0A%0D%0A&' +
'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

setDrugID(id: string) {
 // this.messageSource.next(mes);
 this.id = id;
}

getDrugDetails(){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
'select+DISTINCT+%3Ffarmaco+%3Fdescrizione+%3FimgF+%3FcodiceF+%3Fformato+%3Fsomministrazione+%3Fdose+%3Fricetta+%3Fprezzo+%3Fproduttore%0D%0A'+
'where%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3AImmagineFarmaco+%3FimgF%3B%0D%0A++farmaco%3ADescrizioneFarmaco+%3Fdescrizione%3B%0D%0A++' +
'farmaco%3ACodiceFarmaco+%3FcodiceF%3B%0D%0A++farmaco%3AFormato+%3Fformato%3B%0D%0A++farmaco%3ASomministrazione+%3Fsomministrazione%3B%0D%0A++farmaco%3ADose+%3F' +
'dose%3B%0D%0A++farmaco%3ARicetta+%3Fricetta%3B%0D%0A++farmaco%3A%C3%A8Prodotto+%3Fproduttore%3B%0D%0A++farmaco%3APrezzo+%3Fprezzo.%0D%0A%0D%0A' +
'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + this.id + '%22%29%0D%0A%7D%0D%0A&' +
'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getDrugDetailsEccipient(){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
'select+DISTINCT+%3Ffarmaco+%3Fprincipio%0D%0A'+
'where%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3AhaPrincipioAttivo+%3Fprincipio%0D%0A%0D%0A' +
'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + this.id + '%22%29%0D%0A%7D&' +
'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');


}

getPatologyDrug(){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Ffarmaco+%3Fpatologia%0D%0Awhere%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3A%C3%A8Indicato+%3Fpatologia%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + this.id + '%22%29%0D%0A%7D%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getDrugWithCategory(){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Ffarmaco+%3Fcategoria%0D%0Awhere%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3A%C3%A8diCategoria+%3Fcategoria%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + this.id + '%22%29%0D%0A%7D%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getControindication(){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Ffarmaco+%3Fcontroindicazioni%0D%0Awhere%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3A%C3%A8Controindicato+%3Fcontroindicazioni%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + this.id + '%22%29%0D%0A%7D%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getCollateralEffect(){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Ffarmaco+%3Feffetto%0D%0Awhere%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3AhaEffettoCollaterale+%3Feffetto%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + this.id + '%22%29%0D%0A%7D%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getPharmacy(){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Ffarmaco+%3Ffarmacia%0D%0Awhere%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3AsiTrova+%3Ffarmacia%0D%0A%0D%0A'+
  'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + this.id + '%22%29%0D%0A%7D%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getDoctor(){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Ffarmaco+%3Fmedico%0D%0Awhere%7B+%0D%0A%0D%0A%3Fmedico+farmaco%3APrescrive+%3Ffarmaco%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + this.id + '%22%29%0D%0A%7D%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getPatologyDetails(patologia) {
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Fpatologia+%3FdescrizioneP+%3Fmedico+%3Fstruttura+%3FtelS+%3FindS%0D%0A' +
  'where%7B+%0D%0A%0D%0A%3Fpatologia+farmaco%3A%C3%A8Curata+%3Fmedico%3B%0D%0A+++++++++++farmaco%3ADescrizionePatologia+%3F' +
  'descrizioneP%3B%0D%0A+++++++++++farmaco%3AhaStrutturaConsigliata+%3Fstruttura.%0D%0A%0D%0A%3Fstruttura+farmaco%3ATelefonoStruttura+%3FtelS%3B%0D%0A+++++++++++farmaco%3AIndirizzoStruttura+%3FindS.%0D%0A%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Fpatologia%2C+%22' + patologia +'%22%29%0D%0A%7D%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getDrugFromPatology(patologia) {
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Fpatologia+%3Ffarmaco+%3FdescrizioneF+%3FimgF%0D%0A' +
  'where%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3A%C3%A8Indicato+%3Fpatologia%3B%0D%0A+++++++++++farmaco%3ADescrizioneFarmaco+%3FdescrizioneF%3B%0D%0A+++++++++++farmaco%3AImmagineFarmaco+%3FimgF.%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Fpatologia%2C+%22' + patologia + '%22%29%0D%0A%7D%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');
}

getEccipientDetails(eccipient: string){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Fprincipio+%3FimgP+%3Fformula%0D%0A' +
  'where%7B+%0D%0A++%3Fprincipio+farmaco%3AFormula+%3Fformula%3B%0D%0A++farmaco%3AImmaginePrincipio+%3FimgP.%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Fprincipio%2C+%22' + eccipient + '%22%29%0D%0A%7D%0D%0A%0D%0A%0D%0A&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');

}

getEccipientDetailsbyDrugName(drugname: string){
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+DISTINCT+%3Fprincipio+%3Ffarmaco+%3FimgP+%3Fformula%0D%0A' +
  'where%7B+%0D%0A%0D%0A%3Ffarmaco+farmaco%3AhaPrincipioAttivo+%3Fprincipio.%0D%0A%3Fprincipio+farmaco%3AImmaginePrincipio+%3FimgP.%0D%0A%3Fprincipio+farmaco%3AFormula+%3Fformula.%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Ffarmaco%2C+%22' + drugname  + '%22%29%0D%0A%7D&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');

}

setDataProducer(producer: string) {
  this.producer = producer;
}

getProducer() {
  this.producer = this.producer.split(' ').join('_');
  this.producer = this.producer.substring(0, 1) + this.producer.substring(1);
  return this.producer;
}

getProducerPharmacyDetails() {
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+%3Fproduttore+%3Ffarmacie+%3FindFarm+%3FtelFarm+%3Forari%0D%0A' +
  'where%7B+%0D%0A++%3Fproduttore+farmaco%3AFornisce+%3Ffarmacie.%0D%0A++%3Ffarmacie+farmaco%3ATelefonoFarmacia+%3FtelFarm.%0D%0A++%3Ffarmacie+farmaco%3AIndirizzoFarmacia+%3FindFarm.%0D%0A++%3Ffarmacie+farmaco%3AOrari+%3Forari%0D%0A' +
  'FILTER+REGEX+%28%3Fproduttore%2C+%22' + this.producer  + '%22%29%0D%0A%7D&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');


}

getProducerDetails() {
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+%3Fproduttore+%3FindP+%3FtelP+%3FsitoP%0D%0A' +
  'where%7B+%0D%0A++%3Fproduttore+farmaco%3AIndirizzoProduttore+%3FindP%3B%0D%0A++++++++++++++farmaco%3ATelefonoProduttore+%3FtelP%3B%0D%0A++++++++++++++farmaco%3ASito+%3FsitoP.%0D%0A%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Fproduttore%2C+%22' + this.producer  + '%22%29%0D%0A%7D&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');

}

getProducerDrugs() {
  return this.http.get<JSON>('http://localhost:8890/sparql?default-graph-uri=' +
  'http%3A%2F%2Flocalhost%3A8890%2FDrugs&query=prefix+farmaco%3A+%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fdrugs%2Fontology%2Fdrugsconsulting%23%3E%0D%0A%0D%0A' +
  'select+%3Fproduttore+%3Ffarmaco+%3FimgF+%3Fdescrizione%0D%0A' +
  'where%7B+%0D%0A++%3Ffarmaco+farmaco%3A%C3%A8Prodotto+%3Fproduttore.%0D%0A++%3Ffarmaco+farmaco%3AImmagineFarmaco+%3FimgF.%0D%0A++%3Ffarmaco+farmaco%3ADescrizioneFarmaco+%3Fdescrizione.%0D%0A%0D%0A' +
  'FILTER+REGEX+%28%3Fproduttore%2C+%22' + this.producer + '%22%29%0D%0A%7D&' +
  'format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on&signal_unconnected=on&run=+Run+Query+');

}

}

