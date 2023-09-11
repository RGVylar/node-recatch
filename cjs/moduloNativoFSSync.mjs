import fs from 'fs';

export function moduloNativoFSSync() {
    const directoryPath = './txt';
    const listOfFiles = fs.readdirSync('./txt');
    const fileData = [];
    
    for (let i = 0; i < listOfFiles.length; i++) {
        const fileName = listOfFiles[i];
        const filePath = `${directoryPath}/${fileName}`;
        const stats = fs.statSync(filePath);
        const isFile = stats.isFile();
        const isDirectory = stats.isDirectory();
        const isSymbolicLink = stats.isSymbolicLink();
        const size = stats.size;
        
        let text = null;
        if (isFile) {
            text = fs.readFileSync(filePath, 'utf-8');
        }
        fileData.push({
            fileName,
            filePath,
            isFile,
            isDirectory,
            isSymbolicLink,
            size,
            text,
        });
    }
    // Construye la respuesta como un objeto JSON
    const response = {
        listOfFiles,
        fileData,
    };
  
    return response;
  }
  