import {type Request, type Response, mapRoundTripToOas} from '@app/index';

/* eslint-disable @typescript-eslint/naming-convention */
describe('Map RoundTrip to Oas', () => {
	it('should map a get request', () => {
		const req: Request = {
			host: 'https://facile.it:443',
			headers: [],
			path: '/products',
			method: 'get',
		};
		const res: Response = {
			statusCode: 201,
			headers: [],
		};

		const expectedOas = {
			openapi: '3.0.3',
			info: {
				title: 'Test',
				version: '0.0.1',
			},
			paths: {
				'/products': {
					get: {
						responses: {
							201: {
								description: 'Response description',
							},
						},
					},
				},
			},
		};

		expect(mapRoundTripToOas([req, res])).toStrictEqual(expectedOas);
	});
	it('should map a post request', () => {
		const req: Request = {
			host: 'https://facile.it:443',
			headers: [{name: 'Content-Type', value: 'application/json'}, {name: 'Accept', value: 'application/json'}],
			path: '/products',
			method: 'post',
			body: {
				foo: 'bar',
			},
		};
		const res: Response = {
			statusCode: 201,
			headers: [{name: 'Content-Type', value: 'application/json'}],
		};

		const expectedOas = {
			openapi: '3.0.3',
			info: {
				title: 'Test',
				version: '0.0.1',
			},
			paths: {
				'/products': {
					post: {
						parameters: [
							{
								in: 'header',
								name: 'Content-Type',
								schema: {
									type: 'string',
									enum: ['application/json'],
								},
								required: true,
							},
							{
								in: 'header',
								name: 'Accept',
								schema: {
									type: 'string',
									enum: ['application/json'],
								},
								required: true,
							},
						],
						requestBody: {
							required: true,
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											foo: {
												type: 'string',
												enum: ['bar'],
											},
										},
									},
								},
							},
						},
						responses: {
							201: {
								description: 'Response description',
								headers: {
									'Content-Type': {
										schema: {
											type: 'string',
											enum: ['application/json'],
										},
									},
								},
							},
						},
					},
				},
			},
		};

		expect(mapRoundTripToOas([req, res])).toStrictEqual(expectedOas);
	});
	it.todo('should map request header to oas parameter');
});
