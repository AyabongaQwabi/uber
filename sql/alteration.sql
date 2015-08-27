
ALTER TABLE driver
ADD vehicle varchar(100);

ALTER TABLE issues
ADD status BOOLEAN;

ALTER TABLE driver
ADD username varchar(40);

ALTER TABLE driver
ADD email_address varchar(100);
 