create table appointments(
	app_id int not null auto_increment,
	appointment_date date,
	appointment_time TIME,
	driver_id int,
	issue_id int,
	agent_id int,
	primary key(app_id),
	foreign key(driver_id) references driver(id),
	foreign key(issue_id) references issues(id),
	foreign key(agent_id) references agent(id)
)