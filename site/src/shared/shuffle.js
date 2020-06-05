/*
export const shuffleArray = array => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
*/


export const shuffleArray = array => {

  var tmp = [];
  var j = 0;
  for (var i = 0; i < array.length; i++) {
      while (tmp.includes(array[j])) {
        j = Math.floor(Math.random() * array.length);
      }
      tmp.push(array[j]);
    }
    return tmp;
  }
