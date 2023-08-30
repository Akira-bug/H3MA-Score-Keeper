CREATE TABLE `fencers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `club` varchar(60) NOT NULL,
  `weapon` varchar(20) NOT NULL,
  `score` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) 
INSERT INTO fencers VALUES (1, 'test man', 'test club', 'test weapon', 10);
INSERT INTO fencers VALUES (2, 'test dummy', 'test club2', 'test weapon2', 5);
