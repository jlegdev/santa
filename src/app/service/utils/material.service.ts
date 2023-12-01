import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class MaterialService {
	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

	public init(): void {
		this.matIconRegistry.addSvgIcon('logout', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/icon/logout.svg'));
		// Ajout des drapeaux des pays aux icones material
		this.matIconRegistry.addSvgIcon('flag_fr', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/flags/fr.svg'));
		this.matIconRegistry.addSvgIcon('flag_en', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/flags/en.svg'));
	}
}
