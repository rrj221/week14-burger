USE burgers_db;

INSERT INTO burgers (burger_name, devoured, date)
	VALUES ('Plain Cheese Burger', true, current_timestamp());
INSERT INTO burgers (burger_name, devoured, date)
	VALUES ('Wendys Bacon Cheeseburger', true, current_timestamp());
INSERT INTO burgers (burger_name, devoured, date)
	VALUES ('BK Baconator', false, current_timestamp());
