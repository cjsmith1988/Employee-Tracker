
INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Curtis", "Smith", 9, 8),
("Reginald", "Dowling", 5, 12),
("Allan", "Arellano", 11, 15),
("Marvin", "Downs", 16, 0),
("Lila", "Paterson", 2, 12),
("Roscoe", "Sykes", 15, 4),
("Jaya", "Fellows", 6, 8),
("Gurdeep", "Mackay", 8, 0),
("Yunus", "Berger", 14, 4),
("Asa", "Gardner", 7, 8),
("Austen", "Whitmore", 3, 12),
("Rico", "Ahmed", 1, 0),
("Esme", "Barrera", 2, 12),
("Renesmae", "Archer", 9, 8),
("Mason", "Person", 12, 0),
("Domas", "Macfarlane", 9, 8),
("Blake", "Rosario", 4, 12),
("Ashlee", "Compton", 4, 12),
("Shanae", "Mackenzie", 10, 8),
("Keelan", "Mclean", 13, 15),
("Violet", "O'Reilly", 13, 15);

INSERT INTO Departments (name)
VALUES ("Engineering"),
("Architecture"),
("Business Management Group"),
("Human Resources");

INSERT INTO Roles (title, salary, department_id)
VALUES ("Senior Engineer", 140000, 1),
("Engineer I", 110000, 1),
("Engineer II", 120000, 1),
("Developer I", 80000, 1),
("Developer II", 90000, 1),
("Solution Architect I", 100000, 2),
("Solution Architect II", 110000, 2),
("Senior Architect", 120000, 2),
("Architect Analyst", 70000, 2),
("Support Analyst", 55000, 2),
("Business Management Specialist I", 70000, 3),
("Business Management Specialist II", 80000, 3),
("Business Management analyst", 60000, 3),
("Recruiter", 60000, 4),
("Executive Representative", 90000, 4),
("Director", 110000, 4);