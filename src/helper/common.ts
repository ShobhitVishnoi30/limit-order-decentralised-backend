/**
 * @description For check if the array is valid or not
 * @param array Array of data
 * @returns true or false
 */
export function checkArray(array): boolean {
  return Array.isArray(array) && array.length ? true : false;
}

export const noExponents = function (num: any) {
  const data = String(num).split(/[eE]/);
  if (data.length === 1) return data[0];
  let z = '';
  const sign = num < 0 ? '-' : '',
    str = data[0].replace('.', '');
  let mag = Number(data[1]) + 1;
  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
};
