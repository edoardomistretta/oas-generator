import {describe, expect, it} from 'bun:test';
import type * as OAS from '@app/oas';
import type * as RT from '@app/roundTrip';
import {mapRoundTripToOas} from '@app/roundTripToOas';

describe('Map RoundTrip to OAS', () => {
	it('should map a round trip', () => {
		const rt: RT.RoundTrip = [{
			headers: [{name: 'Content-type', value: 'application/json'}, {name: 'Accept', value: 'application/json'}],
			host: 'http://localhost/api',
			path: '/quote',
			method: 'post',
			body: {
				foo: 'bar',
			},
		}, {
			headers: [{name: 'Content-type', value: 'application/json'}],
			statusCode: 200,
			body: {
				bar: 'baz',
			},
		}];
		const oas: OAS.Oas = {
			openapi: '**3.0.1**',
			info: {
				title: '**title**',
				version: '**version**',
			},
			servers: [{url: 'http://localhost'}],
			paths: {
				'/quote': {
					post: {
						description: '**description**',
						summary: '**summary**',
						parameters: [
							{
								in: 'header',
								name: 'Content-type',
								required: true,
								description: '**header description**',
								allowEmptyValue: false,
								example: 'application/json',
								schema: {
									type: 'string',
									enum: ['application/json'],
									description: '**schema description**',
									example: 'application/json',
									nullable: false,
								},
							}, {
								in: 'header',
								name: 'Accept',
								required: true,
								description: '**header description**',
								allowEmptyValue: false,
								example: 'application/json',
								schema: {
									type: 'string',
									enum: ['application/json'],
									description: '**schema description**',
									example: 'application/json',
									nullable: false,
								},
							},
						],
						requestBody: {
							description: '**description**',
							required: true,
							content: {
								'application/json': {
									schema: {
										type: 'object',
										nullable: false,
										description: '**description**',
										required: ['foo'],
										properties: {
											foo: {
												type: 'string',
												description: '**description**',
												nullable: false,
												enum: ['bar'],
											},
										},
									},
								},
							},
						},
						responses: {
							200: {
								description: '**description**',
								headers: {
									'Content-type': {
										required: true,
										description: '**header description**',
										allowEmptyValue: false,
										example: 'application/json',
										schema: {
											type: 'string',
											enum: ['application/json'],
											description: '**schema description**',
											example: 'application/json',
											nullable: false,
										},
									},
									Accept: {
										required: true,
										description: '**header description**',
										allowEmptyValue: false,
										example: 'application/json',
										schema: {
											type: 'string',
											enum: ['application/json'],
											description: '**schema description**',
											example: 'application/json',
											nullable: false,
										},
									},
								},
								content: {
									'application/json': {
										schema: {
											type: 'object',
											nullable: false,
											description: '**description**',
											required: ['bar'],
											properties: {
												bar: {
													type: 'string',
													description: '**description**',
													nullable: false,
													enum: ['baz'],
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		};

		expect(mapRoundTripToOas(rt)).toStrictEqual(oas);
	});
});
