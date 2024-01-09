import type * as OAS from '@app/oas';
import type * as RT from '@app/roundTrip';

export const mapServer = (host: RT.Request['host']): OAS.Server => {
	const url = new URL(host);
	return {url: `${url.protocol}//${url.host}`};
};
