
ALTER TABLE driver
ADD vehicle varchar(100);

ALTER TABLE issues
ADD status BOOLEAN;

ALTER TABLE driver
ADD username varchar(40);

ALTER TABLE driver
ADD email_address varchar(100);


ALTER TABLE driver
ADD ratings decimal(10,2);

ALTER TABLE driver
ADD cell_no int (14) AFTER last_name;

ALTER TABLE issues
ADD issue_name varchar(200);