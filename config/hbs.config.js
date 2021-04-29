const { join } = require('path')
const hbs = require('hbs')

hbs.registerPartials(join(__dirname, '..', 'views', 'partials'))


// https://stackoverflow.com/a/33316734/6279885
hbs.registerHelper("when", function (operand_1, operator, operand_2, options) {
    var operators = {
        'eq': function (l, r) { return l == r; },
        'noteq': function (l, r) { return l != r; },
        'gt': function (l, r) { return Number(l) > Number(r); },
        'gte': function (l, r) { return Number(l) >= Number(r); },
        'lt': function (l, r) { return Number(l) < Number(r); },
        'lte': function (l, r) { return Number(l) <= Number(r); },
        'or': function (l, r) { return l || r; },
        'and': function (l, r) { return l && r; },
        '%': function (l, r) { return (l % r) === 0; }
    }
        , result = operators[operator](operand_1, operand_2);

    if (result) return options.fn(this);
    else return options.inverse(this);
});