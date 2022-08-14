INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tony', 'Hawk', 1, 0),
('George', 'Clooney', 1, 2);

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Representative', '55000.00', 1);
('Manager', '80000.00', 1);


INSERT INTO departments(name)
    VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');