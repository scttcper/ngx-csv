# @ctrl/ngx-csv

[![npm](https://badgen.net/npm/v/@ctrl/ngx-csv)](https://www.npmjs.com/package/@ctrl/ngx-csv)
[![CircleCI](https://badgen.net/circleci/github/scttcper/ngx-csv)](https://circleci.com/gh/scttcper/ngx-csv)
[![coverage](https://badgen.net/codecov/c/github/scttcper/ngx-csv)](https://codecov.io/gh/scttcper/ngx-csv)

> Easily generate a CSV download in the browser with Angular

**Demo**: https://ngx-csv.vercel.app

### Install

```sh
npm install @ctrl/ngx-csv
```

## Dependencies

Latest version available for each version of Angular

| ngx-trend | Angular |
| --------- | ------- |
| 2.1.1     | 8.x     |
| 3.0.1     | 9.x     |
| current   | >= 10.x |

### Import

```ts
import { CsvModule } from '@ctrl/ngx-csv';
```

### Use

Add the csvLink directive to your `<a>` tag

```html
<a csvLink [data]="data">Download</a>
```

### Input

- **data**: The body of the csv
- **headers**: Set the first line of the csv
- **delimiter**: Set the seperator between values. Default `','`
- **filename**: Set the filename of the csv. Default `data.csv`
- **uFEFF**: Adds a Byte order mark to setup the csv as UTF-8. Default `true`
- **target**: Element target. Default `\_blank

### Accepted Data Formats

##### Array of objects

keys are used as the column headers

```ts
const data = [
  { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
];
```

##### Array of strings

first line used as headers if not supplied

```ts
const data = [
  ['firstname', 'lastname', 'email'],
  ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
  ['Raed', 'Labes', 'rl@smthing.co.com'],
  ['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
];
```

##### String

An already formatted csv from an outside source

```ts
const data = `firstname,lastname
Ahmed,Tomi
Raed,Labes
Yezzi,Min l3b
`;
```

##### Array of objects with custom headers

provided headers

```ts
const headers = [
  { label: 'First Name', key: 'firstname' },
  { label: 'Last Name', key: 'lastname' },
  { label: 'Email', key: 'email' },
];

const data = [
  { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
];
```

### See Also

- [react-csv](https://github.com/abdennour/react-csv)
