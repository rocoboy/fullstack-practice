package com.project.controller;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClientResponse {
    private String firstname;

    private String lastname;

    private String email;

    private Integer age;
}
