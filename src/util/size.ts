const formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;

const formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;

const map: Record<string, number> = {
  b: 1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: 1024 ** 4,
  pb: 1024 ** 5,
};

/**
 * Format the given value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float,
 * it is rounded.
 */

export interface FormatOptions {
  decimalPlaces?: number;
  fixedDecimals?: boolean;
  thousandsSeparator?: string;
  unit?: string;
  unitSeparator?: string;
}

export function sizeFormat(
  value: number,
  options: FormatOptions = {
    decimalPlaces: 2,
    fixedDecimals: false,
    thousandsSeparator: '',
    unit: '',
    unitSeparator: ' ',
  }
): string | null {
  if (!Number.isFinite(value)) {
    return null;
  }

  const mag = Math.abs(value);
  const thousandsSeparator = (options && options.thousandsSeparator) || '';
  const unitSeparator = (options && options.unitSeparator) || '';
  const decimalPlaces =
    options && options.decimalPlaces !== undefined ? options.decimalPlaces : 2;
  const fixedDecimals = Boolean(options && options.fixedDecimals);
  let unit = (options && options.unit) || '';

  if (!unit || !map[unit.toLowerCase()]) {
    if (mag >= map.pb) {
      unit = 'PB';
    } else if (mag >= map.tb) {
      unit = 'TB';
    } else if (mag >= map.gb) {
      unit = 'GB';
    } else if (mag >= map.mb) {
      unit = 'MB';
    } else if (mag >= map.kb) {
      unit = 'KB';
    } else {
      unit = 'B';
    }
  }

  const val = value / map[unit.toLowerCase()];
  let str = val.toFixed(decimalPlaces);

  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, '$1');
  }

  if (thousandsSeparator) {
    str = str
      .split('.')
      .map((s, i) =>
        i === 0 ? s.replace(formatThousandsRegExp, thousandsSeparator) : s
      )
      .join('.');
  }

  return str + unitSeparator + unit;
}
