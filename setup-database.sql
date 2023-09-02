CREATE TABLE fencers (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  club varchar(60) NOT NULL,
  weapon varchar(20) NOT NULL,
  score int NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
);

CREATE TABLE matches (
  id int NOT NULL AUTO_INCREMENT,
  fighter1 varchar(60) NOT NULL,
  fighter2 varchar(60) NOT NULL,
  score1 int NOT NULL DEFAULT '0',
  score2 int NOT NULL DEFAULT '0',
  weapon1 varchar(60) NOT NULL,
  weapon2 varchar(60) NOT NULL,
  victor varchar(60) NOT NULL,
  doubles int NOT NULL DEFAULT '0',
  exchanges int NOT NULL DEFAULT '0',
  duration int NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
);