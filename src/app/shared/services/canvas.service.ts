import { Injectable } from '@angular/core';

@Injectable()
export class CanvasService {

	_H = 1000;

	constructor() { }

	// Ориентация
	_getOrientation(file) {
		return new Promise((resolve, reject) => {

			var reader = new FileReader();
			reader.onload = (e: any) => {

				// -2: not jpeg
				var view = new DataView(e.target.result);
				if (view.getUint16(0, false) != 0xFFD8) {
					resolve(-2);
				}

				// -1: not defined
				var length = view.byteLength, offset = 2;
				while (offset < length) {
					if (view.getUint16(offset + 2, false) <= 8) {
						resolve(-1);
					};

					// -1: not defined
					var marker = view.getUint16(offset, false);
					offset += 2;
					if (marker == 0xFFE1) {
						if (view.getUint32(offset += 2, false) != 0x45786966) {
							resolve(-1);
						}

						// normal
						var little = view.getUint16(offset += 6, false) == 0x4949;
						offset += view.getUint32(offset + 4, little);
						var tags = view.getUint16(offset, little);
						offset += 2;
						for (var i = 0; i < tags; i++) {
							if (view.getUint16(offset + (i * 12), little) == 0x0112) {
								resolve(view.getUint16(offset + (i * 12) + 8, little));
							}
						}
					}
					else if ((marker & 0xFF00) != 0xFF00) {
						break;
					}
					else {
						offset += view.getUint16(offset, false);
					}
				}
				// -1: not defined
				resolve(-1);
			};
			reader.readAsArrayBuffer(file);

		});
	}

	// Получаем Blob из финального canvas-dataURI
	_dataURItoBlob(dataURI) {
		// base64 --> binary raw
		let byteString;
		byteString = atob(dataURI.split(',')[1]);
		// mime: image/jpeg
		const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		// write the bytes of the string to a typed array
		const ablen = byteString.length;
		const ia = new Uint8Array(ablen);
		for (var i = 0; i < ablen; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		const blob = new Blob([ia], { type: mimeString });
		return blob;
	}

	// Получение URL и инфо фото из исходного файла
	async _loadImage(file) {
		let _orientation = await this._getOrientation(file);

		return new Promise((resolve, reject) => {
			const file_url = window.URL.createObjectURL(file);
			const img = new Image();
			img.onload = () => {

				const new_width = (img.width * this._H) / img.height;

				const rotate_width = (img.height * this._H) / img.width;

				let addwidth;
				switch (_orientation) {
					case 6:
						addwidth = rotate_width;
						break;
					case 8:
						addwidth = rotate_width;
						break;
					default:
						addwidth = new_width;
						break;
				}

				let imgData = {
					img: img,
					width: new_width,
					height: this._H,
					addwidth: addwidth,

					orientation: _orientation
				}
				// console.log(imgData)

				resolve(imgData)
			};
			img.onerror = () => reject(new Error(`load ${file_url} fail`));
			img.src = file_url;
		});
	}

	// Цикл по всем файлам. Получаем:
	// --> Картинки из каждого файла для размещения на canvas, и их размеры
	// --> Итоговую длину canvas
	async _filesLooper(files) {
		let result = {
			summ_width: 0,
			pictures: []
		}

		for (let f of files) {
			await this._loadImage(f)
				.then((img: any) => {
					result.summ_width += img.addwidth;
					result.pictures.push(img);
				})
		}
		return result;
	}

	// Получение финальной панорамы
	async _drawCanvas(files, canvas_) {
		// Для отладки canvas_ заменить на canvas / закоментить ниже
		let canvas: any = document.createElement('canvas')
		//////////////////////////////////////////////////
		let ctx = canvas.getContext('2d');

		let data = await this._filesLooper(files);
		canvas.setAttribute('width', data.summ_width);
		canvas.setAttribute('height', this._H);

		let start = 0;
		for (let p of data.pictures) {

			////////////// ---- Повернуть
			if (p.orientation === 6 || p.orientation === 8 || p.orientation === 3) {

				let CNV = document.createElement('canvas')
				let CTX_CNV = CNV.getContext('2d')

				CNV.width = p.height
				CNV.height = p.width

				let new_w = p.height
				let new_h = p.height * p.height / p.width

				////////////////////////////////////////////////////////
				if (p.orientation === 6) {
					CTX_CNV.rotate(90 * Math.PI / 180)
					CTX_CNV.drawImage(p.img, 0, -p.height, p.width, p.height)
				}

				if (p.orientation === 8) {
					CTX_CNV.rotate(-90 * Math.PI / 180)
					CTX_CNV.drawImage(p.img, -p.width, 0, p.width, p.height)
				}

				if (p.orientation === 3) {
					new_w = p.height
					new_h = p.width
					CNV.width = p.width
					CNV.height = p.height

					CTX_CNV.rotate(180 * Math.PI / 180)
					CTX_CNV.drawImage(p.img, -p.width, -p.height, p.width, p.height)
				}
				////////////////////////////////////////////////////////

				ctx.drawImage(CNV, start, 0, new_h, new_w)

			}
			////////////// ---- Стандарт
			else {

				ctx.drawImage(p.img, start, 0, p.width, p.height);

			}
			/////////////////////////////
			// ctx.font = "160px Arial";
			// ctx.fillStyle = "red";
			// ctx.fillText(p.orientation, start + 50, 150);
			/////////////////////////////

			start += p.addwidth;

		}

		let result_canvas = canvas.toDataURL('image/jpeg', 0.7);
		let result_file = this._dataURItoBlob(result_canvas);

		return Promise.resolve(result_file);
	}

	prepareCanvas(files, canvas, file_name) {
		return this._drawCanvas(files, canvas)
			.then(file => {
				return {
					file: file,
					name: file_name
				}
			})
	}


}
