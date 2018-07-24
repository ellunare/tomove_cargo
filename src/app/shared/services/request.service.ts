import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class RequestService {

	baseUrl = 'https://tmctestx.herokuapp.com/api/request'
	// baseUrl = 'http://localhost:8080/api/request'

	addUrl = {
		uploadFile: '/upload',
		getByID: '/get/'
	}

	constructor(
		private _http: HttpClient
	) { }

	requestUpload(data) {
		const headers = new HttpHeaders()
		headers.append('Content-Type', 'multipart/form-data')

		return this._http.post(this.baseUrl + this.addUrl.uploadFile, data, { headers: headers })
	}

	getRequestByID(id) {
		return this._http.get(this.baseUrl + this.addUrl.getByID + id)
	}

}