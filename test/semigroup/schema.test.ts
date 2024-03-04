import {schemaSg} from '@app/semigroup/index';
import {describe, expect, it} from 'bun:test';
import type * as OAS from '@app/oas';

describe('Schema semigroup', () => {
	it('shoul concat 2 boolean schemas into 1 boolean schema', () => {
		const x: OAS.Schema = {type: 'boolean'};
		const y: OAS.Schema = {type: 'boolean'};
		const expected: OAS.Schema = {type: 'boolean'};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('shoul concat 2 empty schema into 1 empty schema', () => {
		const x: OAS.Schema = {};
		const y: OAS.Schema = {};
		const expected: OAS.Schema = {};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: 'number'};
		const y: OAS.Schema = {type: 'boolean'};
		const expected: OAS.Schema = {oneOf: [{type: 'number'}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: 'boolean'};
		const y: OAS.Schema = {type: 'number'};
		const expected: OAS.Schema = {oneOf: [{type: 'boolean'}, {type: 'number'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: 'array', items: {}};
		const y: OAS.Schema = {type: 'number'};
		const expected: OAS.Schema = {oneOf: [{type: 'array', items: {}}, {type: 'number'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: "array", items: { type: "string" }};
		const y: OAS.Schema = {type: "string"};
		const expected: OAS.Schema = {oneOf: [{type: "array", items: { type: "string" }}, {type: 'string'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: "string"};
		const y: OAS.Schema = {type: "array", items: { type: "string" }};
		const expected: OAS.Schema = {oneOf: [{type: 'string'}, {type: "array", items: { type: "string" }}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: 'number'};
		const y: OAS.Schema = {type: 'array', items: {}};
		const expected: OAS.Schema = {oneOf: [{type: 'number'}, {type: 'array', items: {}}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema (one of the 2 schema is already a oneOf schema) into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string'}]};
		const y: OAS.Schema = {type: 'boolean'};
		const expected: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema (one of the 2 schema is already a oneOf schema) into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: 'boolean'};
		const y: OAS.Schema = {oneOf: [{type: 'string'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'boolean'}, {type: 'string'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema (one of the 2 schema is already a oneOf schema) into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		const y: OAS.Schema = {type: 'number'};
		const expected: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}, {type: 'number'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema (one of the 2 schema is already a oneOf schema) into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: 'number'};
		const y: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'number'}, {type: 'string'}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string'}]};
		const y: OAS.Schema = {oneOf: [{type: 'string'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'string'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		const y: OAS.Schema = {oneOf: [{type: 'string'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string'}]};
		const y: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		const y: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas and merged properties', () => {
		const x: OAS.Schema = {description: 'Some stuff', oneOf: [{type: 'string', description: 'A description'}, {type: 'boolean', description: 'Another description'}]};
		const y: OAS.Schema = {description: 'Some other stuff', oneOf: [{type: 'string'}, {type: 'boolean'}]};
		const expected: OAS.Schema = {description: 'Some other stuff', oneOf: [{type: 'string', description: 'A description'}, {type: 'boolean', description: 'Another description'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 same schemas into 1 schema merging enum property', () => {
		const x: OAS.Schema = {type: 'string', enum: ['a', 'b']};
		const y: OAS.Schema = {type: 'string', enum: ['c', 'd']};
		const expected: OAS.Schema = {type: 'string', enum: ['a', 'b', 'c', 'd']};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas and merging properties (such as enum)', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		const y: OAS.Schema = {oneOf: [{type: 'string', enum: ['c', 'd']}, {type: 'boolean'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b', 'c', 'd']}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas and merging properties (such as enum)', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string', enum: ['c', 'd']}, {type: 'boolean'}]};
		const y: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'string', enum: ['c', 'd', 'a', 'b']}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, one oneOf schema and one standard schema, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		const y: OAS.Schema = {type: 'string', enum: ['c', 'd']};
		const expected: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b', 'c', 'd']}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, one oneOf schema and one standard schema, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		const y: OAS.Schema = {type: 'number', enum: [1, 2]};
		const expected: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b']}, {type: 'boolean'}, {type: 'number', enum: [1, 2]}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, one oneOf schema and one standard schema, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {type: 'number', enum: [1, 2]};
		const y: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'number', enum: [1, 2]}, {type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {type: 'number', enum: [1, 2]};
		const y: OAS.Schema = {type: 'string'};
		const expected: OAS.Schema = {oneOf: [{type: 'number', enum: [1, 2]}, {type: 'string'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {type: 'string'};
		const y: OAS.Schema = {type: 'number', enum: [1, 2]};
		const expected: OAS.Schema = {oneOf: [{type: 'string'}, {type: 'number', enum: [1, 2]}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, one oneOf schema and one standard schema, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {type: 'string', enum: ['c', 'd']};
		const y: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'string', enum: ['c', 'd', 'a', 'b']}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, one oneOf schema and one standard schema, into 1 unique schema with oneOf containing only unique schemas', () => {
		const x: OAS.Schema = {type: 'number', enum: [1, 2]};
		const y: OAS.Schema = {oneOf: [{type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		const expected: OAS.Schema = {oneOf: [{type: 'number', enum: [1, 2]}, {type: 'string', enum: ['a', 'b']}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: 'object', properties: {foo: {type: 'string'}}};
		const y: OAS.Schema = {type: 'boolean'};
		const expected: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string'}}}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema into 1 schema with oneOf containing each one schema', () => {
		const x: OAS.Schema = {type: 'boolean'};
		const y: OAS.Schema = {type: 'object', properties: {foo: {type: 'string'}}};
		const expected: OAS.Schema = {oneOf: [{type: 'boolean'}, {type: 'object', properties: {foo: {type: 'string'}}}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different object schema into 1 schemaobject ', () => {
		const x: OAS.Schema = {type: 'object', properties: {foo: {type: 'string'}}};
		const y: OAS.Schema = {type: 'object', properties: {foo: {type: 'string'}}};
		const expected: OAS.Schema = {type: 'object', properties: {foo: {type: 'string'}}};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different object schema into 1 schemaobject ', () => {
		const x: OAS.Schema = {type: 'object', properties: {foo: {type: 'string'}}};
		const y: OAS.Schema = {type: 'object', properties: {bar: {type: 'string'}}};
		const expected: OAS.Schema = {type: 'object', properties: {foo: {type: 'string'}, bar: {type: 'string'}}};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different object schema into 1 object schema', () => {
		const x: OAS.Schema = {type: 'object', properties: {foo: {type: 'string', description: 'A description'}}};
		const y: OAS.Schema = {type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}};
		const expected: OAS.Schema = {type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, one oneOf schema and one object schema, into 1 unique schema with oneOf', () => {
		const x: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A description'}}}]};
		const y: OAS.Schema = {type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}};
		const expected: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, one oneOf schema and one object schema, into 1 unique schema with oneOf', () => {
		const x: OAS.Schema = {type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}};
		const y: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A description'}}}]};
		const expected: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas and merging properties', () => {
		const x: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A description'}}}]};
		const y: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}}]};
		const expected: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different schema, each one with oneOf, into 1 unique schema with oneOf containing only unique schemas and merging properties', () => {
		const x: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A description'}}}, {type: 'boolean'}]};
		const y: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}}]};
		const expected: OAS.Schema = {oneOf: [{type: 'object', properties: {foo: {type: 'string', description: 'A longer description'}}}, {type: 'boolean'}]};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 equals array schema into 1 array schema', () => {
		const x: OAS.Schema = {type: "array", items: { type: "string" }};
		const y: OAS.Schema = {type: "array", items: { type: "string" }};
		const expected: OAS.Schema = {type: "array", items: { type: "string" }};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
	it('should concat 2 different array schema into 1 array schema with items merged into oneOf', () => {
		const x: OAS.Schema = {type: "array", items: { type: "boolean" }};
		const y: OAS.Schema = {type: "array", items: { type: "string" }};
		const expected: OAS.Schema = {type: "array", items: {oneOf: [{ type: "boolean" },{ type: "string" }]}};
		expect(schemaSg.concat(x, y)).toStrictEqual(expected);
	});
});
