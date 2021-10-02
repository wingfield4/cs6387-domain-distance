//made with help from https://gist.github.com/Davidblkx/e12ab0bb2aff7fd8072632b396538560
module.exports = (stringA, stringB) => {
  if(!stringA || !stringB) {
    console.log(`Didn't provide 2 strings!`);
    return;
  }

  let matrix = [];
  for(let i = 0; i <= stringA.length; i++) {
    let newArray = [];
    newArray.length = stringB.length+1;
    matrix.push(newArray);
  }

  if(!stringA.length > 0)
    return stringB.length;

  if(!stringB.length > 0)
    return stringA.length;

  for (let i = 0; i <= stringA.length; matrix[i][0] = i++) { }
  for (let j = 0; j <= stringB.length; matrix[0][j] = j++) { }
  
  //console.log('matrix', matrix);
  for (let i = 0; i < stringA.length; i++) {
    for (let j = 0; j < stringB.length; j++) {
      let cost = stringB[j] === stringA[i] ? 0 : 1;

      matrix[i+1][j+1] = Math.min(
        Math.min(matrix[i][j+1] + 1, matrix[i+1][j] + 1),
        matrix[i][j] + cost);
    }
  }

  return matrix[stringA.length][stringB.length];
}

// // Initialization of matrix with row size source1Length and columns size source2Length
// for (var i = 0; i <= source1Length; matrix[i, 0] = i++) { }
// for (var j = 0; j <= source2Length; matrix[0, j] = j++) { }

// // Calculate rows and collumns distances
// for (var i = 1; i <= source1Length; i++)
// {
//     for (var j = 1; j <= source2Length; j++)
//     {
//         var cost = (source2[j - 1] == source1[i - 1]) ? 0 : 1;

//         matrix[i, j] = Math.Min(
//             Math.Min(matrix[i - 1, j] + 1, matrix[i, j - 1] + 1),
//             matrix[i - 1, j - 1] + cost);
    
