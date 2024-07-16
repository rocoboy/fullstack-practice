export interface ProfilePicture {
    size: number; // Tamaño en bytes
    type: string; // Tipo MIME (por ejemplo, 'image/jpeg')
    slice(start?: number, end?: number, contentType?: string): Blob; // Método para obtener una parte del Blob
}