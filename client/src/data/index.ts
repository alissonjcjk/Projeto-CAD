interface MockFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  uploadedAt: string; // da pra colocar aqui a url quando for fazer o back 
}

const LOCAL_STORAGE_KEY = 'uploadedFilesMock'; // Chave para o localStorage

// Inicializa uploadedFiles lendo do localStorage, ou com um array vazio
const uploadedFiles: MockFile[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');


export const saveFile = (file: File): Promise<{ success: true; fileName: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadedAt: new Date().toISOString()
      });
      console.log("Arquivo salvo (mock e localStorage):", file.name);
      console.log("Todos os arquivos salvos (mock):", uploadedFiles.map(f => f.name));
      resolve({ success: true, fileName: file.name });
    }, 500);
  });
};

export const getUploadedFiles = (): MockFile[] => {
  return [...uploadedFiles];
};