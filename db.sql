USE pruebafinal;

-- Crear la tabla clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(100),
    age INT
);

-- Insertar los registros en la tabla clientes
INSERT INTO clientes (firstname, lastname, email, age)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 30),
    ('Jane', 'Smith', 'jane.smith@example.com', 25),
    ('Michael', 'Johnson', 'michael.johnson@example.com', 35),
    ('Emily', 'Davis', 'emily.davis@example.com', 28),
    ('David', 'Brown', 'david.brown@example.com', 42),
    ('Emma', 'Wilson', 'emma.wilson@example.com', 22),
    ('James', 'Garcia', 'james.garcia@example.com', 31),
    ('Olivia', 'Martinez', 'olivia.martinez@example.com', 27),
    ('Robert', 'Rodriguez', 'robert.rodriguez@example.com', 38),
    ('Sophia', 'Lee', 'sophia.lee@example.com', 24);

