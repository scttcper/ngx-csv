export interface HeaderObj {
  label: string;
  key: string;
}

export const isJsons = (array: any[]) =>
  Array.isArray(array) &&
  array.every(row => typeof row === 'object' && !(row instanceof Array));

export const isArrays = (array: any[]) =>
  Array.isArray(array) && array.every(row => Array.isArray(row));

export function jsonsHeaders(array: object[]) {
  return Array.from(
    new Set(
      array.map(item => Object.keys(item)).reduce((a, b) => [...a, ...b], []),
    ),
  );
}

export function jsons2arrays(
  jsons: { [key: string]: string }[],
  headers?: string[] | HeaderObj[],
) {
  headers = headers || jsonsHeaders(jsons);

  // allow headers to have custom labels, defaulting to having the header data key be the label
  let headerLabels: string[] = headers as string[];
  let headerKeys: string[] = headers as string[];
  if (isJsons(headers)) {
    headerLabels = (headers as HeaderObj[]).map(header => header.label);
    headerKeys = (headers as HeaderObj[]).map(header => header.key);
  }

  const data = jsons.map(object =>
    headerKeys.map(header => (header in object ? object[header] : '')),
  );
  return [headerLabels, ...data];
}

export const elementOrEmpty = (element: any) =>
  element || element === 0 ? element : '';

export function joiner(data: any, delimiter = ',') {
  return data
    .map((row: any, index: number) =>
      row.map((element: any) => '"' + elementOrEmpty(element) + '"').join(delimiter),
    )
    .join(`\n`);
}

export function arrays2csv(
  data: string[][],
  headers?: string[] | HeaderObj[],
  delimiter?: string,
) {
  return joiner(headers ? [headers, ...data] : data, delimiter);
}

export function jsons2csv(
  data: { [key: string]: string }[],
  headers?: string[] | HeaderObj[],
  delimiter?: string,
) {
  return joiner(jsons2arrays(data, headers), delimiter);
}

export function string2csv(
  data: string,
  headers?: string[],
  delimiter?: string,
) {
  return headers ? `${headers.join(delimiter)}\n${data}` : data;
}

export function toCSV(
  data: string | string[][] | { [key: string]: string }[] | any[],
  headers?: string[] | HeaderObj[],
  delimiter?: string,
) {
  if (isJsons(data as any)) {
    return jsons2csv(data as { [key: string]: string }[], headers, delimiter);
  }
  if (isArrays(data as any)) {
    return arrays2csv(data as string[][], headers, delimiter);
  }
  if (typeof data === 'string') {
    return string2csv(data, headers as string[], delimiter);
  }
  throw new TypeError(
    `Data should be a "String", "Array of arrays" OR "Array of objects" `,
  );
}

export function buildURI(
  data: string | string[][] | { [key: string]: string }[] | any[],
  uFEFF = true,
  headers?: string[] | HeaderObj[],
  delimiter?: string,
) {
  const csv = toCSV(data, headers, delimiter);
  const blob = new Blob([uFEFF ? '\uFEFF' : '', csv], { type: 'text/csv' });
  return URL.createObjectURL(blob);
}
