// const ScaleMap = {
//   0: 0,
//   0.5: 0.125,
//   1: 0.25,
//   1.5: 0.375,
//   2: 0.5,
//   2.5: 0.625,
//   3: 0.75,
//   3.5: 0.875,
//   4: 0.875,
//   5: 1.25,
//   6: 1.5,
//   7: 1.75,
//   8: 2,
//   9: 2.25,
//   10: 2.5,
//   11: 2.75,
//   12: 3,
//   14: 3.5,
//   16: 4,
//   20: 5,
//   24: 6,
//   28: 7,
//   32: 8,
//   36: 9,
//   40: 10,
//   44: 11,
//   48: 12,
//   52: 13,
//   56: 14,
//   60: 15,
//   64: 16,
//   72: 18,
//   80: 20,
//   96: 24
// };

// const prefixes = ['height', 'h', 'width', 'w', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginx', 'marginy', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingx', 'paddingy', 'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py'];


// const result = {};

// prefixes.forEach(key => {
//   key = `${key}`;
//   Object.keys(ScaleMap).forEach(s => {
//     const val = ScaleMap[s]
//     const newKey = key + s.replace(/\./g, '_');
//     result[newKey] = val;
//   });
// });

// Object.keys(ScaleMap).forEach(k => {
//   result[k] = ScaleMap[k] * 16;
// });

// const _map = {
//   mr: [null, 'marginRight'],
//   px: [null, ['paddingRight', 'paddingLeft']]
// }

// function mapper(
//   source, map) {

//   const result = {};

//   for (const k in source) {

//     const value = source[k];
//     if (!Object.keys(map).includes(k)) {
//       result[k] = value;
//     }

//     else {
//       let conf = map[k];
//       if (conf && typeof conf[1] !== 'undefined')
//         conf = conf[1];
//       conf = conf || k;
//       const keys = (!Array.isArray(conf) ? [conf] : conf);
//       keys.forEach(key => {
//         result[key] = value;
//       });
//     }

//   }
//   return result;
// }

// const obj = {
//   mr: 12,
//   px: 4,
//   marginTop: 6
// }

// console.log(mapper(obj, _map));

// export const mergeTheme = (target, source, n) => {
//   for (const k in source) {
//     const val = source[k];
//     if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
//       if (typeof target[k] === 'undefined' || target[k] === null || Array.isArray(target[k]))
//       throw new Error(`Invalid target type for source value: "${val}"`);
//       target[k] = mergeTheme(target[k] || {}, source[k], true);
//     }
//     else {
//       target[k] = source[k];
//     }
//   }

//   const result = { ...target };

//   Object.defineProperty(result, '_extend', {
//     value: (obj) => mergeTheme(result, obj),
//     enumerable: false
//   });

//   return result;

// }

// const target = {
//   margin: 10,
// };

// const source = {
//   page: {
//     margin: 10,
//     padding: 20
//   }
// };

// const result = mergeTheme(target, source);


const result = "borderRadius"
.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')

console.log(result);