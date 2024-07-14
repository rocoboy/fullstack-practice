import { Client } from "../models/Client";

export async function fetchAllClients(): Promise<Client[] | undefined> {
    try {
      const response = await fetch('http://localhost:8080/clientes'); // Realiza la solicitud GET
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const clientes: Client[] = await response.json(); // Parsea la respuesta como JSON
      return clientes; // Retorna la lista de clientes obtenida
    } catch (error) {
      console.error('Error fetching data:', error);
      return undefined; // Retorna undefined en caso de error
    }
  }

  export async function crearCliente(cliente: Client) {
    try {
        const response = await fetch('http://localhost:8080/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        
        if (!response.ok) {
            throw new Error('Error al crear cliente');
        }

        const nuevoCliente = await response.json();
        return nuevoCliente;
    } catch (error) {
        console.error('Error al crear cliente:', error);
        throw error; // Puedes manejar el error según tus necesidades
    }
}

export async function editarCliente(id: number, cliente: Client) {
  try {
      const response = await fetch(`http://localhost:8080/clientes/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(cliente)
      });
      
      if (!response.ok) {
          throw new Error('Error al editar cliente');
      }

      const clienteActualizado = await response.json();
      return clienteActualizado;
  } catch (error) {
      console.error('Error al editar cliente:', error);
      throw error; // Puedes manejar el error según tus necesidades
  }
}

export async function eliminarCliente(id: number) {
  try {
      const response = await fetch(`http://localhost:8080/clientes/${id}`, {
          method: 'DELETE'
      });
      
      if (!response.ok) {
          throw new Error('Error al eliminar cliente');
      }

      // No se espera contenido en una respuesta DELETE exitosa
      return true; // Indicar éxito si la operación DELETE tuvo éxito
  } catch (error) {
      console.error('Error al eliminar cliente:', error);
      throw error; // Puedes manejar el error según tus necesidades
  }
}

