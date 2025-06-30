import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const saveFileLocally = async (fileBuffer, originalName) => {
  try {
    const fileExt = path.extname(originalName);
    const fileName = `${randomUUID()}${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    await fs.promises.writeFile(filePath, fileBuffer);
    
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error saving file locally:', error);
    throw new Error('Failed to save file');
  }
};

// import fs from 'fs';
// import path from 'path';
// import { randomUUID } from 'crypto';

// const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

// // Create uploads directory if it doesn't exist
// if (!fs.existsSync(UPLOAD_DIR)) {
//   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

// export const saveFileLocally = async (fileBuffer, originalName) => {
//   try {
//     const fileExt = path.extname(originalName);
//     const fileName = `${randomUUID()}${fileExt}`;
//     const filePath = path.join(UPLOAD_DIR, fileName);
    
//     await fs.promises.writeFile(filePath, fileBuffer);
    
//     return `/uploads/${fileName}`;
//   } catch (error) {
//     console.error('Error saving file locally:', error);
//     throw new Error('Failed to save file');
//   }
// };

// export const deleteLocalFile = async (filePath) => {
//   try {
//     const fileName = path.basename(filePath);
//     const fullPath = path.join(UPLOAD_DIR, fileName);
    
//     if (fs.existsSync(fullPath)) {
//       await fs.promises.unlink(fullPath);
//     }
//   } catch (error) {
//     console.error('Error deleting local file:', error);
//     throw error;
//   }
// };