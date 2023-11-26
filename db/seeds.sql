INSERT INTO department (name)
VALUES ("hr"),
       ("engineer");

INSERT INTO role (title, salary, department_id)
VALUES ("hr rep", 50000, 1),
       ("software engineer", 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, null),
       ("Katie", "Button", 2, 1);