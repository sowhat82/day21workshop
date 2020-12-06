import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient){}

  async onSubmit(f: NgForm){

    const rsvpData = new HttpParams()
    .set('name', f.value.name)
    .set('response', f.value.response)
    .set('vegetarian', f.value.vegetarian)

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin', 'http://localhost:4200');

    console.log(rsvpData.toString());


    // await this.http.post('localhost:3000/rsvp', rsvpData.toString, {headers: httpHeaders}).toPromise()  
    await this.http.post('/rsvp', rsvpData.toString(), {headers: httpHeaders}).toPromise()  
  }



}
