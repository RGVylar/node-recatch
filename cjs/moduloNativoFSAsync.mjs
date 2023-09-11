export async function moduloNativoFSAsync() {
    try {
        // Simula una operación asincrónica, como una consulta a una base de datos
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos

        // Después de esperar, devuelve un mensaje
        return 'Operación asincrónica completada';
    } catch (error) {
        // Maneja los errores si ocurren
        console.error('Error en la operación asincrónica:', error.message);
        throw error;
    }
}

