CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "parks_visited" (
"id" SERIAL PRIMARY KEY,
"user_id" INT,
"park_id" INT,
"date_visited_1" DATE,
"date_visited_2" DATE,
"date_visited_3" DATE,
"notes" VARCHAR(1000)
);

CREATE TABLE "all_parks" (
"id" SERIAL PRIMARY KEY,
"park_full_name" VARCHAR(200) UNIQUE,
"park_name" VARCHAR(50),
"park_description" VARCHAR(2000),
"latLong" VARCHAR(500),
"image_path_1" VARCHAR(200),
"image_path_2" VARCHAR(200),
"image_path_3" VARCHAR(200),
"image_path_4" VARCHAR(200),
"image_path_5" VARCHAR(200)
)
