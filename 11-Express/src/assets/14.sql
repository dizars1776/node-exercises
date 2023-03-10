DROP TABLE IF EXISTS planets;

CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);
INSERT INTO planets (name) VALUES ('Earth');
INSERT INTO planets (name) VALUES ('Mars');