

create table issues (
	id int not null auto_increment,
	driver_id int,
	issue varchar(200),
	status BOOLEAN,
	primary key(id),
	foreign key (driver_id) references driver(id)
)