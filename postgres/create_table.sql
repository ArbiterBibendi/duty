CREATE TABLE tasks (
	id serial PRIMARY KEY,
	title text NOT NULL,
	description text,
	created timestamp NOT NULL DEFAULT 'now',
	due timestamp,
	complete boolean NOT NULL DEFAULT 'false'
);
