insert into movies
  VALUES
    (default, 'Django Unchained', 2012),
    (default, 'Gangs of New York', 2002),
    (default, 'Spectre', 2015);

insert into actors
  VALUES
    (default, 'Daniel Day Lewis', '4/29/1957', (select id from movies where name = 'Gangs of New York')),
    (default, 'Leonardo DiCaprio', '11/11/1974', (select id from movies where name = 'Django Unchained')),
    (default, 'Christoph Waltz', '10/4/1956', (select id from movies where name = 'Spectre'));
