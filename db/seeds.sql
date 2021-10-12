INSERT INTO department (id, dep_name)
VALUES (001, "Entertainers"), (002, "Killer Clowns");

INSERT INTO roles (id, 1
VALUES (001, "Clown Chief", 20000, 001), (002, "Clown Novice", 500, 001), (003, "Scary Clown", 666, 002), (004, "Painted Goblin", 1800, 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Harold", "Dummy", 001, NULL), (002, "Johnny", "Pluto", 003, NULL), (003, "Sally", "Gloom", 004, 002), (004, "Tricia", "Book", 002, 001);