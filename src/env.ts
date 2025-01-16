import 'dotenv/config';
import * as v from 'valibot';

const envSchema = v.object({
	POKEMONTCG_API_KEY: v.string(),
	POSTGRES_DB: v.string(),
	POSTGRES_HOST: v.string(),
	POSTGRES_PORT: v.string(),
	POSTGRES_USER: v.string(),
	POSTGRES_PASSWORD: v.string(),
});

export function getEnvVar() {
	try {
		return v.parse(envSchema, process.env);
	} catch (error) {
		console.error(error);
		// eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit
		process.exit(1);
	}
}
