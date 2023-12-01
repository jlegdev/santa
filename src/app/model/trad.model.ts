export interface TraductionComplexe {
	default: string;
	variant: Variant;
}
// Fonction qui teste si un objet est une "instance" de l'interface TraductionComplexe
export function instanceOfTraductionComplexe(data: any): data is TraductionComplexe {
	return typeof data == 'object' && 'default' in data && 'variant' in data;
}

export interface Variant {
	params: string[];
	variantLines: VariantLine[];
}

export interface VariantLine {
	value: string;
	params: { [key: string]: string | boolean | number };
}

export interface TraductionParam {
	[key: string]: string | boolean | number;
}
