package com.project.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstname;

    private String lastname;

    private String email;

    private Integer age;

    public Object getNombre() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getNombre'");
    }

    public Object getApellido() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getApellido'");
    }

    public void setNombre(Object nombre) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setNombre'");
    }

    public void setApellido(Object apellido) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setApellido'");
    }

}
