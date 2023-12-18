export class DocumentNotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DocumentNotFoundError';
		Object.setPrototypeOf(this, DocumentNotFoundError.prototype);
	}
}
