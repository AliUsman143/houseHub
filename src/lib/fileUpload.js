import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto'; // Built-in Node.js module

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const saveFileLocally = async (fileBuffer, originalName) => {
  try {
    const fileExt = path.extname(originalName);
    const fileName = `${randomUUID()}${fileExt}`; // Using crypto.randomUUID()
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    await fs.promises.writeFile(filePath, fileBuffer);
    
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error saving file locally:', error);
    throw new Error('Failed to save file');
  }
};