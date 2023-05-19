/* eslint-disable no-warning-comments */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

import type * as NEA from 'fp-ts/NonEmptyArray';
import * as O from 'fp-ts/Option';
import {pipe} from 'fp-ts/function';

type RoundTrip = [Request, Response];
export type Request = {
	readonly headers: Headers;
	readonly host: string;
	readonly path: string;
	readonly method: Method;
	readonly body?: Record<string, any>;
};
export type Response = {
	readonly headers: Headers;
	readonly statusCode: StatusCode;
	readonly body?: Record<string, any>;
};
type Headers = Header[];
type StatusCode = number;
const methods = [
	'get',
	'post',
] as const;
type Method = typeof methods[number];
type Required = boolean;
type Header = {readonly name: string; readonly value: string};
type Parameter = {
	readonly in: 'header';
	readonly name: string;
	readonly required?: Required;
	readonly schema: {
		readonly type: ValueType;
		readonly enum?: Enum;
	};
};
type OasResponseHeader = {
	readonly [name: string]: {
		readonly schema: {
			readonly type: ValueType;
			readonly enum?: Enum;
		};
	};
};
type ValueType = 'string' | 'integer' | 'object' | 'array';
type Enum = NEA.NonEmptyArray<string | boolean | number>;
type RequestBody = {
	readonly required?: Required;
	readonly content: {
		readonly [content: string]: {
			readonly schema: {
				readonly type: 'object';
				readonly properties: {
					readonly [p: string]: {
						readonly type: ValueType;
						readonly enum?: Enum;
					};
				};
			};
		};
	};
};
type Oas = {
	readonly openapi: string;
	readonly info: {
		readonly title: string;
		readonly version: string;
	};
	readonly paths: {
		readonly [path: string]: {
			readonly [method in Method]?: {
				readonly parameters?: NEA.NonEmptyArray<Parameter>;
				readonly requestBody?: RequestBody;
				readonly responses: {
					readonly [statusCode: StatusCode]: {
						readonly description: string;
						readonly headers: OasResponseHeader[];
					};
				};
			};
		};
	};
};

export const mapRoundTripToOas = (roundTrip: RoundTrip): Oas => {
	const req = roundTrip[0];
	const res = roundTrip[1];
	const {path, method} = req;
	const {statusCode} = res;
	const oas: Oas = {
		openapi: '3.0.3',
		info: {
			title: 'Test',
			version: '0.0.1',
		},
		paths: {
			[path]: {
				[method]: {
					responses: {
						[statusCode]: {
							description: 'Response description',
						},
					},
				},
			},
		},
	} as const;
	return pipe(
		oas,
		addRequestParameters(req.path, req.method)(req.headers.map(httpRequestHeaderToOasRequestParameter)),
		addResponseHeaders(req.path, req.method, res.statusCode)(res.headers.map(httpResponseHeaderToOasResponseHeader).reduce((pv, cv) => ({...pv, ...cv}), {})),
		addRequestBody(req.path, req.method)(httpRequestBodyToOasRequestBody(req.body, req.headers)),
	);
};

const addRequestParameters = (path: string, method: Method) => (parameters: Parameter[]): ((oas: Oas) => Oas) =>
	// TODO refactor: use lenses
	oas => ({
		...oas,
		paths: {
			...oas.paths,
			[path]: {
				...oas.paths[path],
				[method]: {
					...oas.paths[path][method],
					...(parameters.length > 0
						? {parameters}
						: {}),
				},
			},
		},
	});
const addResponseHeaders = (path: string, method: Method, statusCode: StatusCode) => (headers: OasResponseHeader): ((oas: Oas) => Oas) => oas => ({
	// TODO refactor: use lenses
	...oas,
	paths: {
		...oas.paths,
		[path]: {
			...oas.paths[path],
			[method]: {
				...oas.paths[path][method],
				responses: {
					...oas.paths[path][method]?.responses,
					[statusCode]: {
						...oas.paths[path][method]?.responses[statusCode],
						...(Object.keys(headers).length > 0 ? {
							headers: {...headers},
						} : {}),
					},
				},
			},
		},
	},
});
const addRequestBody = (path: string, method: Method) => (rb: O.Option<RequestBody>): ((oas: Oas) => Oas) => oas => ({
	// TODO refactor: use lenses
	...oas,
	paths: {
		...oas.paths,
		[path]: {
			...oas.paths[path],
			[method]: {
				...oas.paths[path][method],
				...(O.isSome(rb) ? {
					requestBody: rb.value,
				} : {}),
			},
		},
	},
});

const httpRequestHeaderToOasRequestParameter = (header: Header): Parameter => ({
	in: 'header',
	name: header.name,
	required: true,
	schema: {
		type: 'string',
		enum: [header.value],
	},
});
const httpResponseHeaderToOasResponseHeader = (header: Header): OasResponseHeader => ({
	[header.name]: {
		schema: {
			type: 'string',
			enum: [header.value],
		},
	},
});
const httpRequestBodyToOasRequestBody = (body: Request['body'], requestHeaders: Request['headers']): O.Option<RequestBody> => {
	const ct = requestHeaders.find(h => h.name.toLowerCase() === 'content-type');
	if (!ct || !body) {
		return O.none;
	}

	return O.some({
		required: true,
		content: {
			[ct.value]: {
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
	});
};

// Import type * as M from 'fp-ts/Monoid';
// import * as A from 'fp-ts/Array';
// import type * as Eq from 'fp-ts/Eq';

// /*
//  * Input
//  */
// const input: any = [
// 	{
// 		req: {
// 			headers: [
// 				{
// 					name: 'X-Request-Id',
// 					value: '78eb3105-2d3b-4f9a-8062-98f909606bf8',
// 				},
// 				{
// 					name: 'Content-Type',
// 					value: 'application/json',
// 				},
// 				{
// 					name: 'Accept',
// 					value: 'application/json',
// 				},
// 			],
// 			host: 'https://example.com:443',
// 			path: '/products',
// 			method: 'POST',
// 			body: {
// 				foo: 1,
// 				bar: true,
// 				baz: [],
// 			},
// 		},
// 	},
// 	{
// 		req: {
// 			headers: [
// 				{
// 					name: 'X-Request-Id',
// 					value: '3632155e-0a6c-4503-a402-3e60935e78e4',
// 				},
// 				{
// 					name: 'Content-Type',
// 					value: 'application/json',
// 				},
// 				{
// 					name: 'Accept',
// 					value: 'application/json',
// 				},
// 			],
// 			host: 'https://example.com:443',
// 			path: '/products',
// 			method: 'POST',
// 			body: {
// 				foo: 2,
// 				bar: false,
// 				baz: [1],
// 				moo: true,
// 			},
// 		},
// 	},
// 	{
// 		req: {
// 			headers: [],
// 			host: 'http://example.com:80',
// 			path: '/products',
// 			method: 'GET',
// 			body: {},
// 		},
// 	},
// 	{
// 		req: {
// 			headers: [],
// 			host: 'http://example.com:80',
// 			path: '/products',
// 			method: 'POST',
// 		},
// 	},
// ];

// /*
//  * Types & Types predicate
//  */
// type ValidJson = Doc[];
// type Doc = {req: Req};
// type Req = {
// 	headers: Headers;
// 	host: string;
// 	path: string;
// 	method: Method;
// 	body?: Record<string, any>;
// };
// type Headers = Header[];
// const methods = [
// 	'GET',
// 	'HEAD',
// 	'POST',
// 	'PUT',
// 	'DELETE',
// 	'CONNECT',
// 	'OPTIONS',
// 	'TRACE',
// ] as const;
// type Method = typeof methods[number];
// type Header = {name: string; value: string};

// const isRecord = (
// 	a: any,
// ): a is Record<
// string,
// unknown[] | Record<string, unknown> | string | number | boolean
// > => typeof a === 'object' && !Array.isArray(a) && a !== null;

// const isHeader = (a: any): a is Header =>
// 	'name' in a
//   && 'value' in a
//   && typeof a.name === 'string'
//   && typeof a.value === 'string';

// const isMethod = (a: any): a is Method => methods.includes(a);

// const isReq = (a: any): a is Req =>
// 	'headers' in a
//   && Array.isArray(a.headers)
//   && a.headers.every(isHeader)
//   && 'host' in a
//   && 'path' in a
//   && 'method' in a
//   && isMethod(a.method)
//   && (!('body' in a) || isRecord(a.body));

// const isDoc = (a: any): a is Doc => 'req' in a && isReq(a.req);

// const isValidJson = (a: any): a is ValidJson =>
// 	Array.isArray(a) && a.every(isDoc);

// /*
//  * Program
//  */
// export const main = () => {
// 	if (!isValidJson(input)) {
// 		process.exit(1);
// 	}

// 	const headerEq: Eq.Eq<Header> = {
// 		equals: (a, b) =>
// 			a.name.toUpperCase() === b.name.toUpperCase() && a.value === b.value,
// 	};
// 	const headersM: M.Monoid<Headers> = {
// 		concat: (a, b) => A.union(headerEq)(a, b),
// 		empty: [],
// 	};

// 	const reqM: M.Monoid<Req> = {
// 		concat: (a, b) => ({
// 			headers: headersM.concat(a.headers, b.headers),
// 			host: b.host,
// 			path: b.path,
// 			method: b.method,
// 		}),
// 		empty: {headers: headersM.empty, host: '', path: '', method: 'GET'},
// 	};
// 	const docEq: Eq.Eq<Doc> = {
// 		equals: (a, b) =>
// 			a.req.host.toUpperCase() === b.req.host.toUpperCase()
//       && a.req.path === b.req.path
//       && a.req.method === b.req.method,
// 	};
// 	const docM: M.Monoid<Doc> = {
// 		concat: (a, b) => ({req: reqM.concat(a.req, b.req)}),
// 		empty: {req: reqM.empty},
// 	};

// Const chopDocs = A.chop((as: ValidJson) => {
//   const { init, rest } = pipe(
//     as,
//     A.spanLeft((a) => docEq.equals(a, as[0]))
//   );
//   return [init, rest];
// });

// const choppedInput = chopDocs(input);
// const a = pipe(choppedInput, A.map(A.reduce(docM.empty, docM.concat)));
// console.log(a);
// };
