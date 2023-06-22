SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS fan_artist_rank;
DROP TABLE IF EXISTS fan_music_rank;
DROP TABLE IF EXISTS music_info;
DROP TABLE IF EXISTS spotify_rank;
DROP TABLE IF EXISTS peak;
DROP TABLE IF EXISTS music_age;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `heroku_54e3f38f2db2aeb`.`artist` (
  `artist_ID` INT NOT NULL AUTO_INCREMENT,
  `artist_name` VARCHAR(45) NOT NULL,
  `artist_rank` INT NOT NULL,
  PRIMARY KEY (`artist_ID`));


CREATE TABLE `heroku_54e3f38f2db2aeb`.`music_info` (
  `music_ID` INT NOT NULL AUTO_INCREMENT,
  `music_title` VARCHAR(45) NOT NULL,
  `artist_ID` INT NOT NULL,
  PRIMARY KEY (`music_ID`),
  FOREIGN KEY (`artist_ID`)
  REFERENCES `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);


CREATE TABLE `heroku_54e3f38f2db2aeb`.`spotify_rank` (
  `music_ID` INT NOT NULL AUTO_INCREMENT,
  `ave_rank` INT NOT NULL,
  `total_stream` INT NOT NULL,
  `top_10_frequency` INT NOT NULL,
  PRIMARY KEY (`music_ID`),
  FOREIGN KEY (`music_ID`)
  REFERENCES `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);
    
    
CREATE TABLE `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (
  `rank_ID` INT NOT NULL AUTO_INCREMENT,
  `artist_ID` INT NOT NULL,
  `rank` INT NOT NULL,
  PRIMARY KEY (`rank_ID`),
  FOREIGN KEY (`artist_ID`)
  REFERENCES `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);


CREATE TABLE `heroku_54e3f38f2db2aeb`.`fan_music_rank` (
  `rank_ID` INT NOT NULL AUTO_INCREMENT,
  `music_ID` INT NOT NULL,
  `rank` INT NOT NULL,
  PRIMARY KEY (`rank_ID`),
  FOREIGN KEY (`music_ID`)
  REFERENCES `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);
  

CREATE TABLE `heroku_54e3f38f2db2aeb`.`music_age` (
  `music_ID` INT NOT NULL,
  `days` INT NOT NULL,
  PRIMARY KEY (`music_ID`),
  FOREIGN KEY (`music_ID`)
  REFERENCES `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);


CREATE TABLE `heroku_54e3f38f2db2aeb`.`peak` (
  `music_ID` INT NOT NULL,
  `peak_position` INT NOT NULL,
  `peak_frequency` INT NOT NULL,
  `peak_stream` INT NOT NULL,
  PRIMARY KEY (`music_ID`),
  FOREIGN KEY (`music_ID`)
  REFERENCES `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);
  
  
  

USE `heroku_54e3f38f2db2aeb`;
DROP procedure IF EXISTS `check_constraint_insert_on_fan_music_rank`;
DROP procedure IF EXISTS `check_constraint_insert_on_fan_artist_rank`;
DROP procedure IF EXISTS `check_constraint_insert_on_artist`;
DROP procedure IF EXISTS `check_constraint_insert_on_music_info`;
DROP procedure IF EXISTS `actual_update_peak`;
DROP procedure IF EXISTS `auto_update_peak`;





DELIMITER $$
USE `heroku_54e3f38f2db2aeb`$$
CREATE PROCEDURE `check_constraint_insert_on_fan_music_rank` (IN rank INT, IN music_ID INT, IN rank_ID INT)
BEGIN
    IF rank < 0 THEN
        SIGNAL SQLSTATE '45000'
           SET MESSAGE_TEXT = 'check_constraint_insert_on_fan_music_rank failed';
    END IF;
    IF music_ID NOT IN (SELECT music_ID FROM music_info) THEN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'check_constraint_insert_on_fan_music_rank failed';
    END IF;
END$$



DELIMITER $$ 
USE `heroku_54e3f38f2db2aeb`$$
CREATE PROCEDURE `check_constraint_insert_on_fan_artist_rank` (IN rank INT, IN artist_ID INT, IN rank_ID INT)
BEGIN
    IF rank < 0 THEN
        SIGNAL SQLSTATE '45000'
           SET MESSAGE_TEXT = 'check_constraint_insert_on_fan_artist_rank failed';
    END IF;
    IF artist_ID NOT IN (SELECT artist_ID FROM artist) THEN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'check_constraint_insert_on_fan_artist_rank failed';
    END IF;
END$$


DELIMITER $$ 
USE `heroku_54e3f38f2db2aeb`$$
CREATE PROCEDURE `check_constraint_insert_on_artist` (IN artist_ID INT, IN artist_name VARCHAR(45), IN artist_rank INT)
BEGIN
    IF artist_ID IN (SELECT artist_ID FROM artist) THEN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'check_constraint_insert_on_artist failed';
    END IF;
    IF artist_rank IN (SELECT artist_rank FROM artist) THEN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'check_constraint_insert_on_artist failed';
    END IF;
END$$



DELIMITER $$ 
USE `heroku_54e3f38f2db2aeb`$$
CREATE PROCEDURE `check_constraint_insert_on_music_info` (IN music_ID INT, IN music_title VARCHAR(45), IN artist_ID INT)
BEGIN
    IF artist_ID NOT IN (SELECT artist_ID FROM artist) THEN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'check_constraint_insert_on_music_info failed';
    END IF;
    IF music_ID IN (SELECT music_ID FROM music_info) THEN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'check_constraint_insert_on_music_info failed';
    END IF;
END$$


DELIMITER $$ 
USE `heroku_54e3f38f2db2aeb`$$
CREATE PROCEDURE `actual_update_peak` (IN music_ID INT, IN new_peak INT)
BEGIN
	UPDATE peak
	SET `peak_position` = new_peak,
		`peak_frequency` = 1,
		`peak_stream` = 0
	WHERE `music_ID` = music_ID;
END$$



DELIMITER $$ 
USE `heroku_54e3f38f2db2aeb`$$
CREATE PROCEDURE `auto_update_peak` (IN music_ID INT, IN old_peak INT)
BEGIN
	IF old_peak != (
	SELECT AVG(f.rank) ranking_pos
	FROM fan_music_rank f
	GROUP BY f.music_ID
	HAVING f.music_ID = music_ID
	)
    THEN CALL `actual_update_peak`(music_ID, (
	SELECT AVG(f.rank) ranking_pos
	FROM fan_music_rank f
	GROUP BY f.music_ID
	HAVING f.music_ID = music_ID
	));
    END IF;
END$$


-- Triggers with those stored procedures

-- USE `heroku_54e3f38f2db2aeb`$$
-- CREATE DEFINER = CURRENT_USER TRIGGER `heroku_54e3f38f2db2aeb`.`fan_music_rank_BEFORE_INSERT` BEFORE INSERT ON `fan_music_rank` FOR EACH ROW
-- BEGIN
-- 	CALL `heroku_54e3f38f2db2aeb`.`check_constraint_insert_on_fan_music_rank`(new.rank, new.music_ID, new.rankID);
-- END$$

-- USE `heroku_54e3f38f2db2aeb`$$
-- CREATE DEFINER = CURRENT_USER TRIGGER `heroku_54e3f38f2db2aeb`.`fan_music_rank_BEFORE_UPDATE` BEFORE UPDATE ON `fan_music_rank` FOR EACH ROW
-- BEGIN
-- 	CALL `heroku_54e3f38f2db2aeb`.`check_constraint_insert_on_fan_music_rank`(new.rank, new.music_ID, new.rankID);
-- END$$

-- USE `heroku_54e3f38f2db2aeb`$$
-- CREATE DEFINER = CURRENT_USER TRIGGER `heroku_54e3f38f2db2aeb`.`fan_music_rank_AFTER_UPDATE` AFTER INSERT ON `fan_music_rank` FOR EACH ROW
-- BEGIN
-- 	CALL `heroku_54e3f38f2db2aeb`.`auto_update_peak`(new.music_ID, old.peak);
-- END$$
-- DELIMITER ;



INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('1', 'Pharaoh', '1');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('2', 'Capper', '2');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('3', 'Higher Brothers', '3');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('4', 'MC HotDog', '4');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('5', 'Gai', '5');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('6', 'Vava', '6');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('7', 'Vinida', '7');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('8', 'Tizzy T', '8');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('9', 'MaSiWei', '9');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('10', 'Knowknow', '10');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('11', 'MC Jin', '11');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('12', 'Jony J', '12');
INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ('13', 'Key NG', '13');


INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('1', 'Ghost Face', '1');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('2', 'Snow', '2');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('3', 'Mr. Bentley', '3');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('4', 'Mr. Almost', '4');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('5', 'Dummy Song Name1', '5');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('6', 'Dummy Song Name2', '6');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('7', 'Dummy Song Name3', '7');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('8', 'Dummy Song Name4', '8');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('9', 'Dummy Song Name5', '9');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('10', 'Dummy Song Name6', '10');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('11', 'Dummy Song Name7', '11');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('12', 'Dummy Song Name8', '12');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ('13', 'Dummy Song Name9', '13');

INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('1', '1', '1');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('2', '2', '2');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('3', '3', '3');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('4', '4', '4');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('5', '5', '5');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('6', '6', '6');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('7', '7', '7');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('8', '8', '8');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('9', '9', '9');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('10', '10', '10');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('11', '11', '11');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('12', '12', '12');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_artist_rank` (`rank_ID`, `artist_ID`, `rank`) VALUES ('13', '13', '13');

INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('1', '1', '1');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('2', '2', '2');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('3', '3', '3');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('4', '4', '4');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('5', '5', '5');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('6', '6', '6');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('7', '7', '7');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('8', '8', '8');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('9', '9', '9');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('10', '10', '10');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('11', '11', '11');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('12', '12', '12');
INSERT INTO `heroku_54e3f38f2db2aeb`.`fan_music_rank` (`rank_ID`, `music_ID`, `rank`) VALUES ('13', '13', '13');

INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('1', '25');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('2', '15');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('3', '25');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('4', '15');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('5', '25');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('6', '15');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('7', '25');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('8', '15');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('9', '25');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('10', '15');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('11', '25');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('12', '15');
INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ('13', '25');

INSERT INTO `heroku_54e3f38f2db2aeb`.`peak` (`music_ID`, `peak_position`, `peak_frequency`, `peak_stream`) VALUES ('1', '1', '2', '256');
INSERT INTO `heroku_54e3f38f2db2aeb`.`peak` (`music_ID`, `peak_position`, `peak_frequency`, `peak_stream`) VALUES ('2', '2', '1', '100');

INSERT INTO `heroku_54e3f38f2db2aeb`.`spotify_rank` (`music_ID`, `ave_rank`, `total_stream`, `top_10_frequency`) VALUES ('1', '1', '2345', '2');
INSERT INTO `heroku_54e3f38f2db2aeb`.`spotify_rank` (`music_ID`, `ave_rank`, `total_stream`, `top_10_frequency`) VALUES ('2', '2', '1234', '1');
