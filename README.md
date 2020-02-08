<div align="center">
  <h1>ngx-csv</h1>
  <br>
  <a href="https://www.npmjs.com/package/@ctrl/ngx-csv">
    <img src="https://badge.fury.io/js/%40ctrl%2Fngx-csv.svg" alt="npm">
  </a>
  <a href="https://travis-ci.org/TypeCtrl/ngx-csv">
    <img src="https://travis-ci.org/TypeCtrl/ngx-csv.svg?branch=master" alt="travis">
  </a>
  <a href="https://codecov.io/github/typectrl/ngx-csv">
    <img src="https://img.shields.io/codecov/c/github/typectrl/ngx-csv.svg" alt="codecov">
  </a>
  <br>
  <br>
</div>

> Easily generate a CSV download in the browser with Angular

**Demo**: https://ngx-csv.netlify.com/

### Install

```sh
npm install @ctrl/ngx-csv
```

## Dependencies

Latest version available for each version of Angular

| ngx-trend | Angular |
| --------- | ------- |
| 2.1.1     | 8.x     |
| current   | >= 9.x  |

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

* **data**: The body of the csv
* **headers**: Set the first line of the csv
* **delimiter**: Set the seperator between values. Default `','`
* **filename**: Set the filename of the csv. Default `data.csv`
* **uFEFF**: Adds a Byte order mark to setup the csv as UTF-8. Default `true`
* **target**: Element target. Default `\_blank

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

* [react-csv](https://github.com/abdennour/react-csv)
