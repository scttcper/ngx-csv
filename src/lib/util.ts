export const isJsons = array =>
  Array.isArray(array) &&
  array.every(row => typeof row === 'object' && !(row instanceof Array));

export const isArrays = array =>
  Array.isArray(array) && array.every(row => Array.isArray(row));

export const jsonsHeaders = (array: object[]) =>
  Array.from(
    new Set(
      array.map(item => Object.keys(item)).reduce((a, b) => [...a, ...b], []),
    ),
  );

export const jsons2arrays = (jsons, headers?) => {
  headers = headers || jsonsHeaders(jsons);

  // allow headers to have custom labels, defaulting to having the header data key be the label
  let headerLabels = headers;
  let headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map(header => header.label);
    headerKeys = headers.map(header => header.key);
  }

  const data = jsons.map(object =>
    headerKeys.map(header => (header in object ? object[header] : '')),
  );
  return [headerLabels, ...data];
};

export const elementOrEmpty = element =>
  element || element === 0 ? element : '';

export const joiner = (data, delimiter = ',') =>
  data
    .map((row, index) =>
      row.map(element => '"' + elementOrEmpty(element) + '"').join(delimiter),
    )
    .join(`\n`);

export function arrays2csv(data, headers?, delimiter?: string) {
  return joiner(headers ? [headers, ...data] : data, delimiter);
}

export function jsons2csv(data, headers?, delimiter?: string) {
  return joiner(jsons2arrays(data, headers), delimiter);
}

export function string2csv(data, headers?, delimiter?: string) {
  return headers ? `${headers.join(delimiter)}\n${data}` : data;
}

export function toCSV(data, headers?, delimiter?: string) {
  if (isJsons(data)) {
    return jsons2csv(data, headers, delimiter);
  }
  if (isArrays(data)) {
    return arrays2csv(data, headers, delimiter);
  }
  if (typeof data === 'string') {
    return string2csv(data, headers, delimiter);
  }
  throw new TypeError(
    `Data should be a "String", "Array of arrays" OR "Array of objects" `,
  );
}

export function buildURI(
  data,
  uFEFF = true,
  headers?: string[],
  delimiter?: string,
) {
  const csv = toCSV(data, headers, delimiter);
  const blob = new Blob([uFEFF ? '\uFEFF' : '', csv], { type: 'text/csv' });
  return URL.createObjectURL(blob);
}
