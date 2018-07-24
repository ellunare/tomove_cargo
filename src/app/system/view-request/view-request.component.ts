import { Component, OnInit, ElementRef } from '@angular/core'
import { RequestService } from '../../shared/services/request.service'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'view-request',
	templateUrl: './view-request.component.html',
	styleUrls: ['./view-request.component.sass']
})
export class ViewRequestComponent implements OnInit {

	request: any

	constructor(
		// private _request: RequestService,
		private _AR: ActivatedRoute,
	) { }

	ngOnInit() {
		// Получение объявления от резолвера
		this._AR.data
			.subscribe(data => {
				this.request = data.request
				console.log(this.request)
			})
	}

	getPhoto(r, axes) {
		const baseURL = 'https://tmctestrequests.s3.amazonaws.com/requests/' + this.request.requestID + '/'
		const N = r.name[0]
		let rAdd = (N === 'r') ? r.name.slice(5) : ''

		return baseURL + N + rAdd + '.jpg'
	}

	getTagCoords(tag, roomimg, C) {
		// console.log(tag)
		// const H = 400
		const H = roomimg.clientHeight

		return (H * tag['tag' + C]) / this.request.rawh - 10
	}

	show(e) {
		console.log(e.clientHeight)
	}

}
