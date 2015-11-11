create table movies (
  id serial primary key,
  name varchar(80),
  year integer
);

create table actors (
  id serial primary key,
  name varchar(80),
  birthday date,
  movie_id int references movies(id) on delete cascade
);
