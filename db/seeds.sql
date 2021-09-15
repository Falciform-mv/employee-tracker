
INSERT INTO departments (title)
VALUES
  ('Engineering'),
  ('Marketing'),
  ('Sales');


INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', 100000, 3),
  ('Engineer', 70000, 1),
  ('Marketer', 60000, 2);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Shane', 'Cross', 2, 2),
  ('Rob', 'Dyrdek', 1, 0),
  ('Kelly', 'Hart', 2, 1),
  ('Bob', 'Burnquist', 2, 1),
  ('Kareem', 'Campbell', 3, 1);