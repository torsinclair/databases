CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int primary key auto_increment,
  username varchar(30),
  room varchar(30),
  text text  
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.
 *  


login: mysql -u root -p;
show databases
use chat
describe messages
show tables

insert into messages values(0, '...', '...', '...');
select * from messages;

 */

