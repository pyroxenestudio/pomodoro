export async function audioUrlToBase64(audioUrl: string): Promise<string> {
  const response = await fetch(audioUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        resolve(reader.result); // Esto es un dataURL base64
      } else {
        reject("No se pudo leer el archivo");
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}