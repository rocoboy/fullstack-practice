package com.project.repository;

import com.project.model.Cliente;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query("SELECT c.id FROM Cliente c WHERE c.email = :email")
    Optional<Long> findIdByEmail(String email);
}
