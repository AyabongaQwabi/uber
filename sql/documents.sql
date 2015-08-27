create table documents (
	id int not null auto_increment,
	type varchar(40),
	driver_id int,
	url varchar(200),
	primary key(id),
	foreign key(driver_id) references driver(id)
)