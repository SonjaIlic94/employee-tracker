CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
    --constraint fk_manager FOREIGN KEY employee(id) REFERENCES employee(manager_id)
)


CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(7,2),
    department_id INTEGER
    --constraint fk_role FOREIGN KEY role(department_id) REFERENCES employee(role_id) 
);


CREATE TABLE departments(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
    -- constraint -- foreign key department ID references roles department_id
    constraint fk_department FOREIGN KEY departments(id) REFERENCES roles(department_id) ON DELETE SET NULL
);

