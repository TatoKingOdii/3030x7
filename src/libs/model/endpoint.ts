export enum Endpoint {
  TV_SHOWS
}

export const ENDPOINT_BASE: string = 'https://json-server-vercel-vert.vercel.app/';

export const EndpointPaths = new Map<Endpoint, String>(
  [
    [Endpoint.TV_SHOWS, 'tv-shows']
  ]
)
