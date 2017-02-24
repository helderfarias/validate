import { curry } from './fp';

class Success {

    constructor(value = null) {
        this.value = value;
        this.valid = true;
    }

    static of(value) {
        return new Success(value);
    }

    ap(self) {
        return self.valid ? self.map(this.value) : self;
    }

    map(fn) {
        return this;
    }

    isNothing() {
        return (this.value === null || this.value === undefined);
    }

    get() {
        return this.value;
    }

    chain(fn) {
        return this.map(fn).get();
    }

    orElse(val) {
        return this.isNothing() ? Success.of(val) : this.value;
    }

    toString() {
        return 'Validation -> Success(' + this.value + ')';
    }

}

class Failure {

    constructor(value = []) {
        this.value = value;
        this.valid = false;
    }

    static of(value) {
        return new Failure(value);
    }

    ap(self) {
        return self.valid ? this : Failure.of(this.value.concat(self.value));
    }

    map(fn) {
        return Failure.of(fn(this.value));
    }

    isNothing() {
        return (this.value === null || this.value === undefined);
    }

    get() {
        return this.value;
    }

    chain(fn) {
        return this.map(fn).get();
    }

    orElse(_) {
        return this;
    }

    toString() {
        return 'Validation -> Failure(' + this.value + ')';
    }

}

export const success = (value) => Success.of(value);
export const failure = (value) => Failure.of(value);
export const createValidation = () => success(curry(() => null, []));
