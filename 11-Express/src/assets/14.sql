DROP TABLE IF EXISTS planets;

CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
);

INSERT INTO planets (name) VALUES ('Earth');
INSERT INTO planets (name) VALUES ('Mars');

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT
);

INSERT INTO users (username, password) VALUES ('dummy', 'dummy');