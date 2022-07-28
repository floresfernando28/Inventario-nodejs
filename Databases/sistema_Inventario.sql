CREATE DATABASE sistema_Inventario;
USE sistema_Inventario;

CREATE TABLE rol(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    NombreRol VARCHAR(60) NOT NULL
);

CREATE TABLE usuarios(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nombres VARCHAR(60) NOT NULL,
    Apellidos VARCHAR(60) NOT NULL,
    Edad INT ,
    FechaNacimiento VARCHAR(60) NOT NULL,
    NombreUsuario VARCHAR(60) NOT NULL,
    Contrasenia VARCHAR(60) NOT NULL,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IdRol INT ,
    FOREIGN KEY FK_ROL_USUARIO(IdRol) REFERENCES rol(id) 
);


CREATE PROCEDURE sp_insertar_user(
    IN Nombres VARCHAR(60),
    IN Apellidos VARCHAR(60),
    IN Edad INT,
    IN FechaNacimiento DATE,
    IN NombreUsuario VARCHAR(60),
    IN Contrasenia VARCHAR(60),
    IN IdRol INT
)
BEGIN
    INSERT INTO usuarios (Nombres,Apellidos,Edad,FechaNacimiento,NombreUsuario,Contrasenia,IdRol)
    VALUES(Nombres, Apellidos, Edad,FechaNacimiento
        NombreUsuario, Contrasenia, IdRol)
END;
