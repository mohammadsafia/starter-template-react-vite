export const generateToken = async (token: string): Promise<void> => {
  try {
    // Create a temporary element to hold the token
    const temporaryTokenElement: HTMLTextAreaElement = document.createElement('textarea');
    temporaryTokenElement.value = token;

    // Add the temporary element to the document body
    document.body.appendChild(temporaryTokenElement);

    // Select the contents of the temporary element
    temporaryTokenElement.select();

    // Copy the contents of the temporary element to the clipboard
    document.execCommand('copy');

    // Remove the temporary element from the document body
    document.body.removeChild(temporaryTokenElement);

    // Log a success message to the console
    console.info('Token successfully generated and copied to clipboard!');
  } catch (error) {
    // Log an error message to the console if an error occurs
    console.error('Error generating token:', error);
  }
};
