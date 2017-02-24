# Validation library

Validation forms

## Installation

```bash
yarn or npm install validate
```

## Scripts

* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher
* `npm run test` - well ... it runs the tests :)
* `npm run test:watch` - same as above but in a watch mode

## Examples

* React

```javascript
    import React, { Component } from 'react';
    import { createValidation, success, failure } from 'validate';
    ...
    class TodoCreator extends Component {

        isEmpty = (n, input, msg) => {
            return n === '' ? failure([{ key: input, val: msg }]) : success();
        }

        handlerInput = ({ target }) => {
            const { name, value } = target;

            const errors = createValidation().ap(isEmpty('name1', name, 'is empty'))
                                                .ap(isEmpty('name2', name, 'is empty'))
                                                .orElse(new Map())
                                                .chain(e => e);

            this.setState({ [name]: value, errors: errors });
        }

        render() {
            return (
                <form>
                    <label>Name</label>
                    <input name="name" onChange={this.handlerInput} />
                </form>
            );
        }
    }
    ...
```

## References

https://drboolean.gitbooks.io/mostly-adequate-guide/content/
https://github.com/concretesolutions/pareto.js/tree/master
