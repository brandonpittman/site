export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["thunder.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.v2h_uI0U.js",app:"_app/immutable/entry/app.DzAS66Z0.js",imports:["_app/immutable/entry/start.v2h_uI0U.js","_app/immutable/chunks/DjSEZCRv.js","_app/immutable/chunks/D49fEAeC.js","_app/immutable/chunks/B-eMqVB_.js","_app/immutable/entry/app.DzAS66Z0.js","_app/immutable/chunks/D49fEAeC.js","_app/immutable/chunks/CoQ_1EBF.js","_app/immutable/chunks/C7XCUjIX.js","_app/immutable/chunks/B-eMqVB_.js","_app/immutable/chunks/CcYOs8RP.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base_path = "";
