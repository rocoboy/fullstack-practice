package com.project.controller;

import org.springframework.web.bind.annotation.RestController;

import com.project.model.Cliente;
import com.project.service.ClienteService;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<Cliente> crearCliente(@RequestBody ClienteDTO clienteDTO) {
        Cliente nuevoCliente = new Cliente();
        nuevoCliente.setNombre(clienteDTO.getNombre());
        nuevoCliente.setApellido(clienteDTO.getApellido());
        // Configura otros campos según sea necesario

        Cliente clienteCreado = clienteService.crear(nuevoCliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteCreado);
    }

    // Endpoint para obtener todos los clientes
    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerTodosClientes() {
        List<Cliente> clientes = clienteService.obtenerTodosLosClientes();
        return ResponseEntity.ok(clientes);
    }

    // Endpoint para obtener un cliente por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obtenerClientePorId(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteService.obtenerPorId(id);
        return cliente.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para actualizar un cliente existente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        Optional<Cliente> clienteExistente = clienteService.obtenerPorId(id);
        if (clienteExistente.isPresent()) {
            cliente.setId(id); // Asegura que el cliente tenga el ID correcto
            Cliente clienteActualizado = clienteService.actualizar(cliente);
            return ResponseEntity.ok(clienteActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para eliminar un cliente por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable Long id) {
        clienteService.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para obtener el ID de un cliente por su email
    @GetMapping("/id")
    public ResponseEntity<Long> obtenerIdClientePorEmail(@RequestParam String email) {
        Optional<Long> clienteId = clienteService.obtenerIdPorEmail(email);

        return clienteId.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}