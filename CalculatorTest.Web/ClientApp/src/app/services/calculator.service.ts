import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Model } from '../model/calculator-view-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Service {

  url = 'https://localhost:44485/api/Calculator';
  header = { 'Content-Type': 'application/json' };

  // putting HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Calculator
  Calculate(calculator: Model): Observable<Model> {

    return this.httpClient.post<Model>(this.url + '/calc/', JSON.stringify(calculator), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError))
  }

  // erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro client
      errorMessage = error.error.message;
    } else {
      // Erro server
      errorMessage = `Error code: ${error.status}, ` + `Msn: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
