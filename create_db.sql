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

ALTER TABLE bus
ADD FOREIGN KEY (rid)
REFERENCES route (rid);

CREATE TABLE `registration` (
  `email_address` varchar(50) PRIMARY KEY,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `gender` varchar(10)  DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL
);

ALTER TABLE ticket
ADD COLUMN `email_address` VARCHAR(50);

ALTER TABLE ticket 
ADD FOREIGN KEY (email_address)
REFERENCES registration (email_address);

INSERT INTO
	route(rid,dist_source, src, dest)
VALUES
	(1, 1000, "Bengaluru","Mumbai"),
    (2, 995,"Bengaluru" ,"Pune"),
    (3, 600,"Bengaluru","Hyderabad" ),
    (4, 1200,"Bengaluru","Delhi" ),
    (5, 1000, "Mumbai","Bengaluru"),
    (6, 200,"Mumbai" ,"Pune"),
    (7, 800,"Mumbai" ,"Hyderabad"),
    (8, 956,"Mumbai" ,"Delhi"),
    (9, 995, "Pune","Bengaluru"),
    (10, 200,"Pune","Mumbai"),
    (11, 700,"Pune","Hyderabad"),
    (12, 1300,"Pune","Delhi"),
    (13, 700,"Hyderabad","Pune"),
    (14, 600,"Hyderabad","Bengaluru"),
    (15, 1100,"Hyderabad","Delhi"),
    (16, 800,"Hyderabad","Mumbai"),
    (17, 1300,"Delhi","Pune"),
    (18, 956,"Delhi","Mumbai"),
    (19, 1100,"Delhi","Hyderabad"),
    (20, 1200,"Delhi","Bengaluru");

INSERT INTO
    bus(bid,dept_time, arr_time, name, number, seats, rid)
VALUES
    (1, '12:00:00', '23:00:00','Volvo-21', 'KA-50-PP-9980', 40, 1),
    (2, '12:00:00', '23:00:00','Volvo-22', 'KA-50-PP-9981', 40, 2),
    (3, '12:00:00', '23:00:00','Volvo-23', 'KA-50-PP-9982', 40, 3),
    (4, '12:00:00', '23:00:00','Volvo-24', 'KA-50-PP-9983', 40, 4),
    (5, '12:00:00', '23:00:00','Volvo-25', 'KA-50-PP-9984', 40, 5),
    (6, '12:00:00', '23:00:00','Volvo-26', 'KA-50-PP-9985', 40, 6),
    (7, '12:00:00', '23:00:00','Volvo-27', 'KA-50-PP-9986', 40, 7),
    (8, '12:00:00', '23:00:00','Volvo-28', 'KA-50-PP-9987', 40, 8),
    (9, '12:00:00', '23:00:00','Volvo-29', 'KA-50-PP-9988', 40, 9),
    (10, '12:00:00', '23:00:00','Volvo-30', 'KA-50-PP-9989', 40, 10),
    (11, '12:00:00', '23:00:00','Volvo-31', 'KA-50-PP-9990', 40, 1),
    (12, '12:00:00', '23:00:00','Volvo-32', 'KA-50-PP-9991', 40, 2),
    (13, '12:00:00', '23:00:00','Volvo-33', 'KA-50-PP-9992', 40, 3),
    (14, '12:00:00', '23:00:00','Volvo-34', 'KA-50-PP-9993', 40, 4),
    (15, '12:00:00', '23:00:00','Volvo-35', 'KA-50-PP-9994', 40, 5),
    (16, '12:00:00', '23:00:00','Volvo-36', 'KA-50-PP-9995', 40, 6),
    (17, '12:00:00', '23:00:00','Volvo-37', 'KA-50-PP-9996', 40, 7),
    (18, '12:00:00', '23:00:00','Volvo-38', 'KA-50-PP-9997', 40, 8),
    (19, '12:00:00', '23:00:00','Volvo-39', 'KA-50-PP-9998', 40, 9),
    (20, '12:00:00', '23:00:00','Volvo-40', 'KA-50-PP-9999', 40, 10);


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