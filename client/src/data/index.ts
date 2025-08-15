interface MockFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  uploadedAt: string;
}

// Altere de 'let' para 'const' aqui
const uploadedFiles: MockFile[] = []; // <-- Esta é a mudança principal

export const saveFile = (
  file: File
): Promise<{ success: true; fileName: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      uploadedFiles.push({
        // Isso ainda funciona pois estamos modificando o array, não reatribuindo
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadedAt: new Date().toISOString(),
      });
      console.log("Arquivo salvo (mock):", file.name);
      console.log(
        "Todos os arquivos salvos (mock):",
        uploadedFiles.map((f) => f.name)
      );
      resolve({ success: true, fileName: file.name });
    }, 500);
  });
};

export const getUploadedFiles = (): MockFile[] => {
  return [...uploadedFiles];
};
