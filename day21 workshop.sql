create database birthday default character set utf8;

use birthday;

create table rsvps (
person_id	int not null AUTO_INCREMENT,
name 	char(64) not null,
response	boolean,
vegetarian	boolean,
UNIQUE INDEX id_UNIQUE (person_id ASC) VISIBLE,
primary key (person_id)
);

ALTER TABLE `birthday`.`rsvps` 
ADD COLUMN `email` VARCHAR(45) not NULL AFTER `vegetarian`;

insert into rsvps (name, response, vegetarian) values 
('alvin', true, true),
('adrian', false, true),
('kenneth', true, false);

select * from rsvps;



drop table rsvp;