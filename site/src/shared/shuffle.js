export const shuffleArray = array => {

  const n = array.length;
  var tmp = [];
  var j = 0;
  for (var i = 0; i < array.length; i++) {
      while (tmp.includes(array[j])) {
        j = Math.floor(Math.random() * n);
      }
      tmp.push(array[j]);
    }
    return tmp;
  }
