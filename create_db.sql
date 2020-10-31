CREATE DATABASE IF NOT EXISTS buses;

USE buses;

CREATE TABLE IF NOT EXISTS bus (
    bid INT PRIMARY KEY,
    rid INT,
    dept_time TIME,
    arr_time TIME,
    name VARCHAR(50),
    number VARCHAR(50),
    seats INT
);

-- CREATE TABLE IF NOT EXISTS station (
--     sname VARCHAR(50) primary key
-- );

CREATE TABLE IF NOT EXISTS route (
    rid INT PRIMARY KEY,
    dist_source INT,
    src VARCHAR(50),
    dest VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS passenger (
    pid INT PRIMARY KEY AUTO_INCREMENT,
    bid INT,
    name VARCHAR(50),
    age INT,
    gender CHAR(1),
    FOREIGN KEY (bid)
        REFERENCES bus(bid)
);

CREATE TABLE IF NOT EXISTS ticket (
    tid INT PRIMARY KEY AUTO_INCREMENT,
    fare INT,
    rid INT,
    pid INT,
    FOREIGN KEY (rid)
        REFERENCES route(rid),
    FOREIGN KEY (pid)
        REFERENCES passenger(pid)
);

CREATE TABLE IF NOT EXISTS employee (
    eid INT PRIMARY KEY,
    ename VARCHAR(50),
    designation VARCHAR(50),
    bid INT,
    FOREIGN KEY (bid)
        REFERENCES bus(bid)
);

-- CREATE TABLE IF NOT EXISTS station_on_routes (
--     rid INT,
--     scode INT,
--     PRIMARY KEY (rid , scode),
--     FOREIGN KEY (rid)
--         REFERENCES route (rid),
--     FOREIGN KEY (scode)
--         REFERENCES station(scode)
-- );

ALTER TABLE bus
ADD FOREIGN KEY (rid)
REFERENCES route (rid);

-- ALTER TABLE passenger
-- ADD FOREIGN KEY (bid)
-- REFERENCES bus (bid);

-- ALTER TABLE ticket
-- ADD FOREIGN KEY (pid)
-- REFERENCES passenger (pid);

-- ALTER TABLE employee
-- ADD FOREIGN KEY (bid)
-- REFERENCES bus (bid);

-- INSERT INTO 
-- 	station(scode, sname)
-- VALUES
-- 	(1, 'Ahmedabad'),
--     (2, 'Bengaluru'),
--     (3, 'Bhopal'),
--     (4, 'Bhubaneshwar'),
--     (5, 'Chennai'),
--     (6, 'Hyderabad'),
--     (7, 'Jaipur'),
--     (8, 'Kolkata'),
--     (9, 'Lucknow'),
--     (10, 'Mumbai'),
--     (11, 'New Delhi'),
--     (12, 'Patna'),
--     (13, 'Pune'),
--     (14, 'Srinagar'),
--     (15, 'Varanasi');

INSERT INTO
	route(rid,dist_source, src, dest)
VALUES
	(1, 1000, "Ahmedabad", "Bengaluru"),
    (2, 1000, "Bhubaneshwar", "Bhopal"),
    (3, 1000, "Chennai", "Hyderabad"),
    (4, 1000, "Bengaluru", "Chennai"),
    (5, 1000, "Bengaluru", "Pune"),
    (6, 1000, "Bengaluru", "Hyderabad"),
    (7, 1000, "Jaipur", "Lucknow"),
    (8, 1000, "Srinagar", "Mumbai"),
    (9, 1000, "Patna", "New Delhi"),
    (10, 1000, "Varansi", "Srinagar");

INSERT INTO
    bus(bid,dept_time, arr_time, name, number, seats, rid)
VALUES
    (1, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 1),
    (2, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 2),
    (3, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 3),
    (4, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 4),
    (5, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 5),
    (6, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 6),
    (7, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 7),
    (8, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 8),
    (9, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 9),
    (10, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 10),
    (11, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 1),
    (12, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 2),
    (13, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 3),
    (14, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 4),
    (15, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 5),
    (16, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 6),
    (17, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 7),
    (18, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 8),
    (19, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 9),
    (20, '12:00:00', '23:00:00','Volvo-20', 'KA-50-PP-9999', 40, 10);


INSERT INTO 
      employee(eid,ename,designation,bid)
VALUES
    (1,'Raju','Driver',1),
    (2,'Rahul','Conductor',1),
    (3,'Raju','Driver',2),
    (4,'Raju','Conductor',2),
    (5,'Raju','Driver',3),
    (6,'Raju','Conductor',3),
    (7,'Raju','Driver',4),
    (8,'Raju','Conductor',4),
    (9,'Raju','Driver',5),
    (10,'Raju','Conductor',5),
    (11,'Raju','Driver',6),
    (12,'Rahul','Conductor',6),
    (13,'Raju','Driver',7),
    (14,'Raju','Conductor',7),
    (15,'Raju','Driver',8),
    (16,'Raju','Conductor',8),
    (17,'Raju','Driver',9),
    (18,'Raju','Conductor',9),
    (19,'Raju','Driver',10),
    (20,'Raju','Conductor',10),
    (21,'Raju','Driver',11),
    (22,'Rahul','Conductor',11),
    (23,'Raju','Driver',12),
    (24,'Raju','Conductor',12),
    (25,'Raju','Driver',13),
    (26,'Raju','Conductor',13),
    (27,'Raju','Driver',14),
    (28,'Raju','Conductor',14),
    (29,'Raju','Driver',15),
    (30,'Raju','Conductor',15),
    (31,'Raju','Driver',16),
    (32,'Rahul','Conductor',16),
    (33,'Raju','Driver',17),
    (34,'Raju','Conductor',17),
    (35,'Raju','Driver',18),
    (36,'Raju','Conductor',18),
    (37,'Raju','Driver',19),
    (38,'Raju','Conductor',19),
    (39,'Raju','Driver',20),
    (40,'Raju','Conductor',20);