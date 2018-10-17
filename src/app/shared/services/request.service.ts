import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class RequestService {

	baseUrl = 'https://api.hamovil-sheli.co.il/api/request'
	// baseUrl = 'https://tmctestx.herokuapp.com/api/request'
	// baseUrl = 'http://localhost:8080/api/request'

	addUrl = {
		uploadFile: '/upload',
		getByID: '/get/',
		getByMY: '/getByMY',
		deleteRequest: '/delete',
		updateRequest: '/update',
		closeRequest: '/close',
		getFurniture: '/getFurniture',
		saveNewItemPrice: '/saveNewItemPrice',
		saveNewCoefficient: '/saveNewCoefficient'
	}

	constructor(
		private _http: HttpClient
	) { }

	requestUpload(data, _lng) {
		const headers = new HttpHeaders()
		headers.append('Content-Type', 'multipart/form-data')

		return this._http.post(this.baseUrl + this.addUrl.uploadFile, data, { headers: headers, params: { lng: _lng } })
	}

	getRequestByID(id, qp) {
		let QP: any = {}
		if (qp != null) QP = qp

		return this._http.get(this.baseUrl + this.addUrl.getByID + id, { params: QP })
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

	closeRequest(ID, body) {
		let query = { ID: ID }
		return this._http.put(this.baseUrl + this.addUrl.closeRequest, body, { params: query })
	}

	getFurniture(FLAG) {
		let query = undefined
		if (FLAG !== null) query = { flag: FLAG }

		return this._http.get(this.baseUrl + this.addUrl.getFurniture, { params: query })
	}

	prepareFurnitureObject(FUR) {
		let _FUR = FUR

		let OBJ = {}

		for (let P of _FUR) {
			let parent = JSON.parse(JSON.stringify(P))
			delete parent.id

			let item_types = {}
			for (let ITEM of parent.types || []) {
				item_types[ITEM.id] = ITEM
				delete item_types[ITEM.id].id
			}

			delete item_types['0']
			parent.types = item_types
			OBJ[P.id || '100'] = parent
		}

		return OBJ
	}

	saveNewItemPrice(body) {
		return this._http.put(this.baseUrl + this.addUrl.saveNewItemPrice, body)
	}

	saveNewCoefficient(newcoef) {
		const body = { coef: newcoef }
		return this._http.put(this.baseUrl + this.addUrl.saveNewCoefficient, body)
	}

}