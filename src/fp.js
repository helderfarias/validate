export const curry = (fn, ...args) => {
    if (args.length === fn.length) {
        return fn(...args);
    }
    return curry.bind(this, fn, ...args);
};

export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
