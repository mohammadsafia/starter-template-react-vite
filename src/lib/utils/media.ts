export const downloadBlob = async (blob: Blob, fileName: string) => {
  try {
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', fileName);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};
