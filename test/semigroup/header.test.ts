import {headerSg} from '@app/semigroup/index';
import {describe, expect, it} from 'bun:test';

const emptyHeader = {description: ''};

describe('Header semigroup', () => {
	it.each([
		[{}, {}, {}],
		[emptyHeader, {}, emptyHeader],
		[{}, emptyHeader, emptyHeader],
		[{description: "A longer description"}, emptyHeader, {description: "A longer description"}],
		[emptyHeader, {description: "A longer description"}, {description: "A longer description"}],
	])('base header', (x, y, expected) => {
		expect(headerSg.concat(x, y)).toStrictEqual(expected);
	});
	it.each([
		[{required: true}, {required: true}, {required: true}],
		[{required: false}, {required: false}, {required: false}],
		[{required: true}, {required: false}, {required: false}],
		[{required: false}, {required: true}, {required: false}],
		[{}, {required: true}, {required: true}],
		[{required: true}, {}, {required: true}],
		[{}, {required: false}, {required: false}],
		[{required: false}, {}, {required: false}],
	])('should concat required property', (x, y, expected) => {
		expect(headerSg.concat(x, y)).toStrictEqual(expected);
	})
	it.each([
		[{deprecated: true}, {deprecated: true}, {deprecated: true}],
		[{deprecated: false}, {deprecated: false}, {deprecated: false}],
		[{deprecated: true}, {deprecated: false}, {deprecated: true}],
		[{deprecated: false}, {deprecated: true}, {deprecated: true}],
		[{}, {deprecated: true}, {deprecated: true}],
		[{deprecated: true}, {}, {deprecated: true}],
		[{}, {deprecated: false}, {deprecated: false}],
		[{deprecated: false}, {}, {deprecated: false}],
	])('should concat deprecated property', (x, y, expected) => {
		expect(headerSg.concat(x, y)).toStrictEqual(expected);
	})
	it.each([
		[{allowEmptyValue: true}, {allowEmptyValue: true}, {allowEmptyValue: true}],
		[{allowEmptyValue: false}, {allowEmptyValue: false}, {allowEmptyValue: false}],
		[{allowEmptyValue: true}, {allowEmptyValue: false}, {allowEmptyValue: true}],
		[{allowEmptyValue: false}, {allowEmptyValue: true}, {allowEmptyValue: true}],
		[{}, {allowEmptyValue: true}, {allowEmptyValue: true}],
		[{allowEmptyValue: true}, {}, {allowEmptyValue: true}],
		[{}, {allowEmptyValue: false}, {allowEmptyValue: false}],
		[{allowEmptyValue: false}, {}, {allowEmptyValue: false}],
	])('should concat allowEmptyValue property', (x, y, expected) => {
		expect(headerSg.concat(x, y)).toStrictEqual(expected);
	})
	it.each([
		[{example: 1}, {example: 2}, {example: 1}],
		[{example: 2}, {example: 1}, {example: 2}],
		[{example: true}, {example: false}, {example: true}],
		[{example: false}, {example: true}, {example: false}],
		[{example: 'a'}, {example: 'A longer example'}, {example: 'a'}],
		[{example: false}, {example: 'a'}, {example: false}],
		[{}, {example: 1}, {example: 1}],
		[{example: 1}, {}, {example: 1}],
	])('should concat example property', (x, y, expected) => {
		expect(headerSg.concat(x, y)).toStrictEqual(expected);
	})
});