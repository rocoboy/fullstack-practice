
export async function fetchPictureById(idClient: number): Promise<string | undefined> {
  try {
    const response = await fetch(`http://localhost:8080/images/${idClient}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const jsonResponse = await response.json();
      console.log('JSON response:', jsonResponse);
      return jsonResponse.file; // Devuelve la cadena Base64 de la imagen
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
}

