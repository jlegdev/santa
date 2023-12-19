import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	Firestore,
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';
import { DocumentNotFoundError } from 'src/app/shared/error/api.error';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class FirebaseService {
	constructor(private firestore: Firestore, private authService: AuthService) {}

	public getAll<T>(collectionName: string): Observable<T[]> {
		const associatedCollection: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, collectionName);
		// get documents (data) from the collection using collectionData
		const elements$: Observable<T[]> = collectionData(associatedCollection) as Observable<T[]>;
		return elements$;
	}

	public create<T>(collectionName: string, objectToCreate: T): Observable<string> {
		const associatedCollection: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, collectionName);
		return from(addDoc(associatedCollection, objectToCreate as object).then((documentReference: DocumentReference) => documentReference.id));
	}
	public update<T>(collectionName: string, objectId: string, objectToUpdate: T): Observable<void> {
		//  Observable<string>
		const objectCollectionName: string = `${collectionName}/${objectId}`;
		const documentReference: DocumentReference<DocumentData, DocumentData> = this._getOne(objectCollectionName);
		return from(updateDoc(documentReference, objectToUpdate as object).then((value) => console.log(value)));
	}

	public delete(collectionName: string, objectId: string): Observable<void> {
		const objectCollectionName: string = `${collectionName}/${objectId}`;
		const documentReference: DocumentReference<DocumentData, DocumentData> = this._getOne(objectCollectionName);
		return from(deleteDoc(documentReference).then((value) => console.log(value)));
	}
	public getOne<T>(collectionName: string, objectId: string): Observable<T> {
		const objectCollectionName: string = `${collectionName}/${objectId}`;
		const documentReference: DocumentReference<DocumentData, DocumentData> = this._getOne(objectCollectionName);

		return from(
			getDoc(documentReference)
				.then((value: DocumentSnapshot<DocumentData, DocumentData>) => {
					console.log(value);
					console.log(value.data());
					console.log(value.exists());
					return { ...value.data(), id: documentReference.id } as T;
				})
				.catch((error: any) => {
					throw new DocumentNotFoundError('Document not found ' + error);
				})
		);
	}

	private _getOne(path: string): DocumentReference<DocumentData, DocumentData> {
		const element: DocumentReference<DocumentData, DocumentData> = doc(this.firestore, path);
		return element;
	}
}
