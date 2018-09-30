export class Transporte {
	constructor() {
		this.Id = 0;
		this.IdRota = 0;
	}

	Id: number;
	IdRemetente: number;
	IdDestinatario: number;
	DataColeta: Date;
	DataEntrega: Date;
	IdRota: number;
}