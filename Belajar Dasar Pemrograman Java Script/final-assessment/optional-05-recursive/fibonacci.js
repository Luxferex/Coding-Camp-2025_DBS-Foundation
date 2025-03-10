function fibonacci(n) {
  if (n === 0) {
    return [0];
  } else if (n === 1) {
    return [0, 1];
  }

  const fibArray = fibonacci(n - 1);

  const nextFib = fibArray[fibArray.length - 1] + fibArray[fibArray.length - 2];

  fibArray.push(nextFib);
  return fibArray;
}

export default fibonacci;
