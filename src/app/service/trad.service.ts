import { Injectable, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable, Subscriber } from 'rxjs';
import { SubSink } from 'subsink';
import { IconEnum } from '../enum/icon.enum';
import { TraductionComplexe, Variant, VariantLine, instanceOfTraductionComplexe } from '../model/trad.model';
import { StorageService } from './utils/storage.service';

export interface LangIcon {
	index: string;
	label: string;
	icon: IconEnum;
}

@Injectable({
	providedIn: 'root',
})
export class TradService implements OnDestroy {
	public $currentLanguage: Observable<LangChangeEvent>;
	private _subs = new SubSink();
	constructor(private translateService: TranslateService, private storageService: StorageService) {
		this.$currentLanguage = this.translateService.onLangChange;
	}

	ngOnDestroy() {
		this._subs.unsubscribe();
	}

	public init(): void {
		const languageUsed: string = this.storageService.getLang() ?? this.translateService.getBrowserLang() ?? 'fr';
		this.translateService.use(languageUsed.match(/en|fr/) ? languageUsed : 'fr');
	}

	public changeLanguage(languageIndex: string): Observable<any> {
		this.storageService.storeLang(languageIndex);
		return this.translateService.use(languageIndex);
	}
	/**
	 * Cherche traduction associée au  namespace + key et la retourne dans un observable.
	 * @param key key de la valeur
	 * @param namespace namespace de la valeur
	 * @param data paramètres supplémentaire pour interpoler des variables dans la valeur ou pour déterminer la variante à utiliser.
	 * @example get('Somekey','Somenamespace',{ nbMessages: 4, genre: "femme" } )
	 * @example get('Somekey','',{ nbMessages: 4, genre: "femme" } )
	 */
	public get(key: string, namespace?: string, data: object = {}): Observable<string | any> {
		const fullKey: string = namespace ? `${namespace}.${key}` : key;
		const traduction$ = new Observable<string>((obs) => {
			this._subs.add(
				this.traductionObs(fullKey, data).subscribe((traduction$) => {
					obs.next(traduction$);
				})
			);
			this._subs.add(
				this.translateService.onLangChange.subscribe(() => {
					this._subs.add(
						this.traductionObs(fullKey, data).subscribe((traduction$) => {
							obs.next(traduction$);
						})
					);
				})
			);
		});
		return traduction$;
	}

	/**
	 * Renvoie un observable sur une valeur à traduire
	 * @param fullKey La key de la valeur à traduire
	 * @param data Les différents paramètres pour déterminer les variants ou remplir les interpolations
	 */
	public traductionObs(fullKey: string, data: object): Observable<string | any> {
		const traduction$ = new Observable<string>((obs: Subscriber<string>) => {
			this._subs.add(
				this.translateService.get(fullKey, data).subscribe((result: TraductionComplexe | string) => {
					// Traduction Complexe
					if (instanceOfTraductionComplexe(result)) {
						result as TraductionComplexe;
						this._subs.add(
							this._findVariant(result.variant, data).subscribe(
								(traduction: string) => {
									obs.next(this._interpolate(traduction, data));
								},
								// Aucune variante trouvée avec les paramètres. On prend donc le label par défaut.
								(error) => {
									this._subs.add(
										this.translateService.get(fullKey + '.default', data).subscribe((result) => {
											obs.next(result);
										})
									);
								}
							)
						);
					}
					// Traduction simple ou aucune traduction associée
					else {
						obs.next(result);
					}
				})
			);
		});
		return traduction$;
	}
	/**
	 * Cherche la valeur associée à la combinaison namespace + key à un instant donné et la retourne dans un string.
	 * @param key key de la valeur
	 * @param namespace namespace de la valeur
	 * @param data paramètres supplémentaire pour interpoler des variables dans la valeur ou pour déterminer la variante à utiliser.
	 * @example get('Somekey','Somenamespace',{ nbMessages: 4, genre: "femme" } )
	 * @example get('Somekey','',{ nbMessages: 4, genre: "femme" } )
	 */
	public instant(key: string, namespace?: string, data: object = {}): string {
		const fullKey: string = namespace ? `${namespace}.${key}` : key;
		const result: string | TraductionComplexe = this.translateService.instant(fullKey, data);
		let trad: string = '';
		if (instanceOfTraductionComplexe(result)) {
			result as TraductionComplexe;
			this._subs.add(
				this._findVariant(result.variant, data).subscribe(
					(traduction: string) => {
						trad = this._interpolate(traduction, data);
					},
					// Aucune variante trouvée avec les paramètres. On prend donc le label par défaut.
					(error) => {
						this._subs.add(
							this.translateService.get(fullKey + '.default', data).subscribe((result) => {
								trad = result;
							})
						);
					}
				)
			);
		} else {
			return result;
		}
		return trad;
	}

	/**
	 * Interpole les valeurs d'une chaîne de caractère avec les valeurs passées en paramètres et la renvoie.
	 * @param value la chaîne de caractère
	 * @param data objet dont les attributs bind les variables de la chaîne de caractère.
	 * @param delimiterStart delimiter avant les variables de chaines. Par défaut "{{"
	 * @param delimiterEnd delimiter après les variables de chaines. Par défaut "}}"
	 * @example interpolate("Bonjour {{name}} {{surname}}", {name:"Damien", surname:"Matelot"})
	 */
	private _interpolate(value: string, data: object, delimiterStart: string = '{{', delimiterEnd: string = '}}'): string {
		for (let param in data) {
			value = value.replace(delimiterStart + param + delimiterEnd, data[param as keyof object]);
		}
		return value;
	}

	/**
   * Cherche et retourne le bon label parmi les variantes d'un objet IVariantsTranslation
   * @param variants IVariantsTranslation parcouru pour déterminer la bonne variante
   * @param params Valeur des paramètres de la variante recherchée
   * @example findVariants("variants": {
        "params": ["nbMessages", "genre"],
        "labels": [
          {
            "values": [0, "homme"],
            "label": "Vous n'avez pas de messages homme"
          },{nbMessages:0, genre: "homme"});
   */
	private _findVariant(variants: Variant, data: object): Observable<string> {
		return new Observable<string>((obs: Subscriber<string>) => {
			let b: boolean = false;
			let nbMatched: number = 0;
			let valueMatched: string = '';

			variants.variantLines.forEach((variantLine: VariantLine) => {
				const nbMatchedLine: number = this._isVariantLineMatched(variantLine, data);
				if (nbMatchedLine > nbMatched) {
					nbMatched = nbMatchedLine;
					valueMatched = variantLine.value;
					b = true;
				}
			});

			// Si on a trouvé aucune variante associée aux paramètres de la fonction
			if (!b) {
				obs.error();
			} else {
				obs.next(this._interpolate(valueMatched, data));
			}
		});
	}

	/**
	 * Renvoie le nombre de paramètres de la variantLine qui matchent avec les valeurs de data
	 * @param variantLine
	 * @param data
	 * @returns
	 */
	private _isVariantLineMatched(variantLine: VariantLine, data: object): number {
		let nbMatched: number = 0;
		// Ici on compare chaque valeur des parametres de la ligne avec ceux des params. On incrémente à chaque correspondance
		for (let [key, value] of Object.entries(variantLine.params)) {
			if (key in data && value == data[key as keyof object]) {
				nbMatched = nbMatched + 1;
			}
		}
		return nbMatched;
	}

	/**
	 * Retourne un tableau de LangIcon
	 * Associe chaque lang disponible à une icone
	 */
	public getLangsObject(): LangIcon[] {
		const LangObjectsAvailables: LangIcon[] = [
			{ index: 'fr', label: 'Français', icon: IconEnum.FLAG_FRENCH },
			{ index: 'en', label: 'English', icon: IconEnum.FLAG_ENGLISH },
		];
		return LangObjectsAvailables;
	}
}
