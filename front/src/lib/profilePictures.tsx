
export async function fetchPictureById(idClient: number): Promise<Blob | undefined> {
    try {
      const response = await fetch(`http://localhost:8080/images/${idClient}`); // Realiza la solicitud GET
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const imagen: Blob = await response.blob(); // Parsea la respuesta como JSON
      return imagen; 
    } catch (error) {
      console.error('Error fetching data:', error);
      return undefined; // Retorna undefined en caso de error
    }
  }