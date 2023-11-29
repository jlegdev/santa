export enum RegexPatternEnum {
	NUMBER = '^[-+]?[0-9]*$',
	NUMBER_POSITIF = '/^[+]?[0-9]d*$/',
	NUMBER_POSITIF_NO_ZERO = '/^[+]?[1-9]d*$/',
	DOUBLE_REGEX = '^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$',
	TGI = '^([Tt]|[Ss])[0-9]{7,7}|^[S][0-9]{7,7}$',
	EMAIL = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
}
