/**
 * @description 
 * From a path or url of an audio, it returns the base64 of that audio in a Promise.
 * @param audioUrl path or url of you audio
 * @returns Promise
 * @example
 * audioToBase64(pathToAudio).then((audioInBase64) => {
 *  console.log('Audio in base64', audioInBase64)
 * })
 */
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