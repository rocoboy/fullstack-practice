package com.project.service;

import com.project.model.Cliente;
import com.project.repository.ClienteRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> obtenerTodosLosClientes() {
        return clienteRepository.findAll();
    }

    public java.util.Optional<Cliente> obtenerPorId(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente crear(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente actualizar(Cliente cliente) {
        java.util.Optional<Cliente> clienteExistenteOptional = clienteRepository.findById(cliente.getId());

        if (clienteExistenteOptional.isPresent()) {
            Cliente clienteExistente = clienteExistenteOptional.get();
            clienteExistente.setNombre(cliente.getNombre()); // Actualiza los campos necesarios
            clienteExistente.setApellido(cliente.getApellido());
            // Podes actualizar otros campos según sea necesario

            return clienteRepository.save(clienteExistente); // Guarda y devuelve el cliente actualizado
        } else {
            throw new RuntimeException("Cliente no encontrado con ID: " + cliente.getId());
            // Podes manejar esta excepción según las necesidades de tu aplicación
        }
    }

    public void eliminarCliente(Long id) {
        clienteRepository.deleteById(id);
    }

    public Optional<Long> obtenerIdPorEmail(String email) {
        return clienteRepository.findIdByEmail(email);
    }
}
