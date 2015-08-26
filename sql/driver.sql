
create table driver (
id int not null auto_increment,
name varchar(50),
last_name varchar(80),
id_number int(20),
license_number varchar(30),
city varchar(50),
primary key(id)
);

ALTER TABLE driver
ADD vehicle varchar(100);