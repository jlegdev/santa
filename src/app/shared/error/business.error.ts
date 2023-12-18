export class UserIsAlreadyParticipatingError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UserIsAlreadyParticipatingError';
		Object.setPrototypeOf(this, UserIsAlreadyParticipatingError.prototype);
	}
}
