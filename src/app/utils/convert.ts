export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const fullResult = reader.result as string;
      const base64Data = fullResult.split(',')[1];
      resolve(base64Data);
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      reject(error);
    };
  });
};
