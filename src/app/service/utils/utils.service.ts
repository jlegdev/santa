import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UtilsService {
	constructor() {}

	/**
	 * Prend en paramètre un objet et une suite de properties nested. renvoie l'attribut associée
	 * @param item
	 * @param property
	 * @returns
	 * @example { adresse: { street: { name: 'rue de l\'eglise' } } }
	 * adress.street.name Renvoie rue de l'eglise
	 */
	public getNestedProperty<T extends object>(item: T | T[keyof T], property: string): any | undefined {
		let result: any | undefined = '';
		const properties: string[] = property.split('.');

		if (properties.length > 1 && (item as object).hasOwnProperty(properties[0])) {
			let indexOfProperty: number = Object.keys(item as object).findIndex((key: string) => key == properties[0]);
			let newItem: T[keyof T] = Object.values(item as object)[indexOfProperty];
			properties.shift();
			result = this.getNestedProperty(newItem as T[keyof T], properties.join('.'));
		} else {
			result = (item as object).hasOwnProperty(properties[0])
				? Object.values(item as object)[Object.keys(item as object).findIndex((key: string) => key == properties[0])]
				: undefined;
		}
		return result;
	}

	public formatURLString(url_str: string, string: string): string {
		return url_str.replace(':id', string);
	}

	public formatDecimalNumber(nombre: number, decimal: number): number {
		if (Number(nombre) && !Number.isInteger(nombre)) {
			return (nombre + '').split('.')[1].length >= decimal ? Number(nombre.toFixed(decimal)) : nombre;
		} else {
			return nombre;
		}
	}

	public isInt(n: any): boolean {
		return !isNaN(n);
	}

	public isFloat(n: any): boolean {
		return Number(n) === n && n % 1 !== 0;
	}

	public clearInt(variable: string): string {
		return variable.replace(/\D/g, '');
	}

	public clearDouble(variable: string): string {
		// On remplace les virgules par des points
		let chaineCleared: string = variable.replace(',', '.');
		// Si il ya plus d'un point dans la chaine. on ne garde que le premier point.
		// on prend toute la chaine jusqu'au premier point
		// on prend le reste de la chaine, dans lequel on supprime tous les points
		if (chaineCleared.indexOf('.') != chaineCleared.lastIndexOf('.')) {
			chaineCleared = `${chaineCleared.slice(0, chaineCleared.indexOf('.') + 1)}${chaineCleared
				.slice(chaineCleared.indexOf('.') + 1, chaineCleared.length)
				.replace('.', '')}`;
		}
		return chaineCleared.replace(/(?![0-9])(?!-)(?!\.)./g, '');
	}

	public resetObjectAttributes<T>(obj: T): T {
		const props: string[] = Object.getOwnPropertyNames(obj);
		for (let i = 0; i < props.length; i++) {
			delete obj[props[i] as keyof T];
		}
		return obj;
	}

	/**
	 * Supprime les attributs null, undefined ou d'objets vides nested de l'objet en paramètre et le renvoit clean
	 * @param item
	 * @returns
	 */
	public cleanObject<T extends object>(item: T): T {
		Object.entries(item).forEach((currentProp: [any, any]) => {
			if (typeof currentProp[1] == 'object' && currentProp[1] != null) {
				// l'attribut checké est un objet et pas une variable primitive.
				// On récursive jusqu'a tomber sur un attribut de type primitif

				item[currentProp[0] as keyof T] = this.cleanObject(currentProp[1]);
				// si objet vide
				if (typeof item[currentProp[0] as keyof T] == 'object') {
					let indexOfProperty: number = Object.keys(item as object).findIndex((key: string) => key == currentProp[0]);
					let newItem: T[keyof T] = Object.values(item as object)[indexOfProperty];
					if (!Object.keys(newItem as object).length) {
						delete item[currentProp[0] as keyof T];
					}
				}
			} else {
				// C'est un attribut de type primitif. on le supprime si il est null ou undefined
				if (currentProp[1] == null || typeof currentProp[1] == 'undefined') {
					delete item[currentProp[0] as keyof T];
				}
			}
		});
		return item;
	}

	public formatBytes(bytes: number, decimals: number = 2): string {
		if (bytes === 0) return '0 Bytes';

		const k: number = 1024;
		const dm: number = decimals < 0 ? 0 : decimals;
		const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i: number = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	public getPromiseFromBooleanValue<T>(value: T): Promise<T> {
		return firstValueFrom(of(value));
	}
}
