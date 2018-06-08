import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {

	baseUrl = 'https://tmctestx.herokuapp.com/api/img/upload';
	// baseUrl = 'http://localhost:8080/api/img/upload';

	constructor(
		private _http: HttpClient
	) { }

	requestUpload(data) {
		// console.log('placing HTTP');
		// console.log(data);

		const headers = new HttpHeaders();
		// headers.append('Content-Type', 'multipart/form-data');

		return this._http.post(this.baseUrl, data, { headers: headers })
	}


}
