const factorial = (n) => {
    if(n < 0) return n ? n * factorial(n + 1) : 1;
    return n ? n * factorial(n - 1) : 1;
}

module.exports = factorial;