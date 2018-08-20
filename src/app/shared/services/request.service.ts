import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class RequestService {

	baseUrl = 'https://tmctestx.herokuapp.com/api/request'
	// baseUrl = 'http://localhost:8080/api/request'

	addUrl = {
		uploadFile: '/upload',
		getByID: '/get/',
		getByMY: '/getByMY',
		deleteRequest: '/delete',
		updateRequest: '/update'
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

	getRequestsByMY(query) {
		return this._http.get(this.baseUrl + this.addUrl.getByMY, { params: query })
	}

	deleteRequest(ID) {
		const query = { ID: ID }
		return this._http.delete(this.baseUrl + this.addUrl.deleteRequest, { params: query })
	}

	updateRequest(ID, body) {
		const query = { ID: ID }
		return this._http.put(this.baseUrl + this.addUrl.updateRequest, body, { params: query })
	}

}