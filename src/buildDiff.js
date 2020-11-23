import _ from 'lodash';

const nodeTemplates = [
  {
    type: 'added',
    check: (key, dataBefore) => !_.has(dataBefore, key),
    create: (key, valueOld, valueNew) => ({ key, type: 'added', value: valueNew }),
  },
  {
    type: 'deleted',
    check: (key, dataBefore, dataAfter) => !_.has(dataAfter, key),
    create: (key, valueOld) => ({ key, type: 'deleted', value: valueOld }),
  },
  {
    type: 'nested',
    check: (key, dataBefore, dataAfter) => (
      _.isPlainObject(dataBefore[key]) && _.isPlainObject(dataAfter[key])
    ),
    create: (key, valueOld, valueNew, buildDiff) => ({ key, type: 'nested', children: buildDiff(valueOld, valueNew) }),
  },
  {
    type: 'unchanged',
    check: (key, dataBefore, dataAfter) => _.isEqual(dataBefore[key], dataAfter[key]),
    create: (key, valueOld) => ({ key, type: 'unchanged', value: valueOld }),
  },
  {
    type: 'changed',
    check: (key, dataBefore, dataAfter) => dataBefore[key] !== dataAfter[key],
    create: (key, valueOld, valueNew) => ({
      key, type: 'changed', value: valueNew, valueOld,
    }),
  },
];

const buildDiff = (dataBefore, dataAfter) => {
  const keysUnion = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  const diff = keysUnion.map((key) => {
    const node = nodeTemplates
      .find(({ check }) => check(key, dataBefore, dataAfter))
      .create(key, dataBefore[key], dataAfter[key], buildDiff);
    return node;
  });

  return diff;
};

export default buildDiff;
