import {
  arrays2csv,
  blob,
  buildURI,
  isArrays,
  isJsons,
  jsons2arrays,
  jsons2csv,
  jsonsHeaders,
  string2csv,
  toCSV,
} from './util';

describe(`core::isJsons`, () => {
  it(`returns true if all items of array are literal objects`, () => {
    const target = [{}, {}, {}, {}];
    expect(isJsons(target)).toBeTruthy();
  });
  it(`returns false if one of array items is not literal object`, () => {
    let target = ['', {}, {}, {}];
    expect(isJsons(target)).toBeFalsy();
    target = [{}, [], {}, {}];
    expect(isJsons(target)).toBeFalsy();
  });
});

describe(`core::isArrays`, () => {
  it(`retruns true if all array items are arrays too`, () => {
    const target = [[], [], [], []];
    expect(isArrays(target)).toBeTruthy();
  });
  it(`retruns false if one of array items is not array`, () => {
    let target = [{}, [], [], []];
    expect(isArrays(target)).toBeFalsy();
    target = [[], new Set([]), [], []];
    expect(isArrays(target)).toBeFalsy();
    target = [[], '[]', [], []];
    expect(isArrays(target)).toBeFalsy();
  });
});

describe(`core::jsonsHeaders`, () => {
  const fixtures = [
    {
      maths: 90,
      phy: 80,
    },
    {
      maths: 50,
      sport: 97,
      ch: 66,
    },
    {
      ch: 77,
      sport: 99,
    },
  ];

  it(`returns union of keys of all array items `, () => {
    const actual = jsonsHeaders(fixtures);
    expect(actual).toEqual([`maths`, `phy`, 'sport', 'ch']);
  });
  it(`does not duplicate keys on the array`, () => {
    const actual = jsonsHeaders(fixtures);
    const keysOfAllItems = fixtures
      .map(object => Object.keys(object))
      .reduce((a, b) => [...a, ...b], []);
    expect(actual.length).toBeLessThanOrEqual(keysOfAllItems.length);
    expect(actual.length).toEqual(new Set(keysOfAllItems).size);
  });
});
describe(`core::jsons2arrays`, () => {
  const fixtures: any[] = [
    {
      maths: '90',
    },
    {
      sport: '97',
    },
    {
      maths: '77',
      sport: 0,
    },
  ];
  it(`converts an Array of literal objects to Array of arrays`, () => {
    const actual = jsons2arrays(fixtures);
    const expected: any[] = [
      ['maths', 'sport'],
      ['90', ''],
      ['', '97'],
      ['77', 0],
    ];
    expect(actual).toEqual(expected);
  });

  it(`converts to Array of arrays following the order of headers`, () => {
    const actual = jsons2arrays(fixtures, ['sport', 'maths']);
    const expected: any[] = [
      ['maths', 'sport'].reverse(),
      ['90', ''].reverse(),
      ['', '97'].reverse(),
      ['77', 0].reverse(),
    ];
    expect(actual).toEqual(expected);
  });
  it(`accepts any size of headers list`, () => {
    const headers = ['maths', 'sport', 'phy', 'ch'];
    const actual = jsons2arrays(fixtures, headers);
    const expected: any[] = [headers, ['90', '', '', ''], ['', '97', '', ''], ['77', 0, '', '']];
    expect(actual).toEqual(expected);
  });
});

describe(`core::arrays2csv`, () => {
  const fixtures = [
    [`a`, `b`],
    [`c`, `d`],
  ];
  it(`converts Array of arrays to string in CSV format`, () => {
    const actual = arrays2csv(fixtures);
    expect(typeof actual).toBe('string');
    expect(actual.split(`\n`).join(`|`)).toEqual(`"a","b"|"c","d"`);
  });

  it(`renders  CSV headers whenever it was given `, () => {
    const headers = [`X`, `Y`];
    const firstLineOfCSV = arrays2csv(fixtures, headers).split(`\n`)[0];
    expect(firstLineOfCSV).toEqual(`"X","Y"`);
  });
});

describe(`core::jsons2csv`, () => {
  const fixtures = [
    {
      X: '88',
      Y: '97',
    },
    {
      X: '77',
      Y: '99',
    },
  ];

  it(`converts Array of literal objects to string in CSV format including headers`, () => {
    const actual = jsons2csv(fixtures);
    const expected = `"X","Y"|"88","97"|"77","99"`;

    expect(typeof actual).toEqual('string');
    expect(actual.split(`\n`).join(`|`)).toEqual(expected);
  });

  it(`renders CSV string according to order of given headers`, () => {
    const otherfixtures = [
      { X: '12', Y: 'bb' },
      { Y: 'ee', X: '55' },
    ];
    const headers = ['Y', 'X', 'Z'];
    const actual = jsons2csv(otherfixtures, headers);
    expect(actual.startsWith(`"Y","X","Z"`)).toBeTruthy();
    expect(actual.endsWith(`"ee","55",""`)).toBeTruthy();
  });

  it(`converts Array of literal objects to string in CSV format including custom header labels`, () => {
    const customHeaders = [
      { label: 'Letter X', key: 'X' },
      { label: 'Letter Y', key: 'Y' },
    ];

    const actual = jsons2csv(fixtures, customHeaders);

    expect(typeof actual).toEqual('string');
    expect(actual.startsWith(`"Letter X","Letter Y"`)).toBeTruthy();
    expect(actual.endsWith(`"77","99"`)).toBeTruthy();
  });
});

describe(`core::string2csv`, () => {
  const fixtures = `33,44\n55,66`;
  it(`returns the same string if no header given`, () => {
    expect(string2csv(fixtures)).toEqual(fixtures);
  });

  it(`prepends headers at the top of input`, () => {
    const headers = [`X`, `Y`];
    expect(string2csv(fixtures, headers)).toEqual(`X,Y\n${fixtures}`);
  });
});

describe(`core::toCSV`, () => {
  const fixtures = { string: 'Xy', arrays: [[], []], jsons: [{}, {}] };
  // it(`requires one argument at least`, () => {
  //   expect(() => toCSV()).toThrow();
  // });

  it(`accepts data as "Array" of jsons `, () => {
    expect(() => toCSV(fixtures.jsons)).toBeTruthy();
  });

  it(`accepts data as "Array" of arrays `, () => {
    expect(() => toCSV(fixtures.arrays)).toBeTruthy();
  });

  it(`accepts data as "string" `, () => {
    expect(() => toCSV(fixtures.string)).toBeTruthy();
  });
});

describe(`core::blob`, () => {
  const fixtures = {
    string: 'Xy',
    arrays: [
      ['a', 'b'],
      ['c', 'd'],
    ],
    jsons: [{}, {}],
  };

  it(`creates blob instance`, () => {
    expect(blob(fixtures.arrays)).toBeTruthy();
    expect(blob(fixtures.string)).toBeTruthy();
  });
});

describe(`core::buildURI`, () => {
  const fixtures = {
    string: 'Xy',
    arrays: [
      ['a', 'b'],
      ['c', 'd'],
    ],
    jsons: [{}, {}],
  };

  it(`generates URI to download data in CSV format`, () => {
    const prefixCsvURI = `blob:`;
    expect(buildURI(fixtures.jsons, false).startsWith(prefixCsvURI)).toBeTruthy();
    expect(buildURI(fixtures.arrays).startsWith(prefixCsvURI)).toBeTruthy();
    expect(buildURI(fixtures.string).startsWith(prefixCsvURI)).toBeTruthy();
  });
});
