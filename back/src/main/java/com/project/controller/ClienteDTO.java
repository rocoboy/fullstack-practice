package com.project.controller;

public class ClienteDTO {

    private String firstname;
    private String lastname;
    private String email;
    private Integer age;

    public ClienteDTO() {
        // Constructor vacío necesario para deserialización JSON
    }

    public ClienteDTO(String nombre, String apellido, String email, Integer age) {
        this.firstname = nombre;
        this.lastname = apellido;
        this.email = email;
        this.age = age;
    }

    // Getters y setters para todos los campos
    public String getFirstname() {
        return this.firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public String getEmail() {
        return this.email;
    }

    public Integer getAge() {
        return this.age;
    }

    public void setFirstName(String nombre) {
        this.firstname = nombre;
    }

    public void setLastName(String apellido) {
        this.lastname = apellido;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
