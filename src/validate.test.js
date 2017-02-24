import { createValidation, success, failure } from './index';

test('should create success', () => {
    expect(success().get()).toBe(null);
    expect(success('ok').get()).toBe('ok');
});

test('should create failure', () => {
    expect(failure().get()).toEqual([]);
    expect(failure(null).get()).toEqual(null);
    expect(failure([]).get()).toEqual([]);
    expect(failure({ id: 1 }).get()).toEqual({id: 1});
    expect(failure('nops').get()).toEqual('nops');
});

test('should create validation', () => {
    expect(createValidation()).not.toEqual(null);
});

test('should evaluate validation rules when failure', () => {
    const isempty = (n, msg) => n === '' ? failure([msg]) : success();

    const result = createValidation().ap(isempty('', 'name1 is empty'))
                                     .ap(isempty('', 'name2 is empty'))
                                     .ap(isempty('', 'name3 is empty'))
                                     .orElse(new Map())
                                     .chain(e => e);

    expect(result).not.toEqual(null);
    expect(result).toEqual([ 'name1 is empty', 'name2 is empty', 'name3 is empty' ]);
});

test('should evaluate validation rules when success', () => {
    const isempty = (n, msg) => n === '' ? failure([msg]) : success();

    const result = createValidation().ap(isempty('name1', 'name1 is empty'))
                                     .ap(isempty('name2', 'name2 is empty'))
                                     .chain(e => e);

    expect(result).toEqual(null);
});

test('should return default value when success', () => {
    const isempty = (n, msg) => n === '' ? failure([msg]) : success();

    const result = createValidation().ap(isempty('name1', 'name1 is empty'))
                                     .ap(isempty('name2', 'name2 is empty'))
                                     .orElse(new Map())
                                     .chain(e => e);

    expect(result).toEqual(new Map());
});

test('should converter list to map when failure', () => {
    const isempty = (n) => n === '' ? failure([{key: 'name', val: 'is empty'}]) : success();

    const result = createValidation().ap(isempty(''))
                                     .orElse([])
                                     .chain(arr => new Map(arr.map(i => [i.key, i.val])));

    expect(result).not.toEqual(null);
    expect(result).toEqual(new Map().set("name", "is empty"));
});
