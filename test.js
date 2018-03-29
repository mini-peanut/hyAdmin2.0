var n = parseInt(readline());
var arr, length, diff;
for(var i = 0;i < 2; i++){
  var lines = readline().split(" ")
  if (i === 0) {
    length = +lines[0];
    diff = +lines[1];
  }
  if (i === 1) {
    arr = lines.map(v => +v);
  }
}

findDiff(arr, diff, length);
function findDiff(arr, diff, length) {
  if (length <= 1) return;
  let i = 0;
  let j = 1;
  let cache = {};

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const result = arr[j] - arr[i];
      let key;
      if (result === diff) {
        key = arr[i] + '_' + arr[j];
      }

      if (result === -diff) {
        key = arr[j] + '_' + arr[i];
      }

      if (key && !cache[key]) cache[key] = '';
    }
  }

  return Object.keys(cache).length;
}
