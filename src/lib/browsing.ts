import fs from 'fs';
import path from 'path';
import mime from 'mime';

const mainDir = '/home/enrico';

type FileStats = {
    name: string;
    path: string;
    isDirectory: boolean;
}

// function getFiles(directory: string) : void {
//     fs.readdir(directory, (err: Error | null, files: Array<string>) => {
//         if (err) {
//             return [];
//         }

//         return files.map((file: string) => {
//             const fullPath = path.join(mainDir, file);
//             const isDirectory = fs.lstatSync(fullPath).isDirectory();

//             return {
//                 name: file,
//                 path: fullPath,
//                 isDirectory: isDirectory
//             }
//         });
//     });
// }


function checkImageByExtension(fileName: string) : boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
    const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(fileExtension);
  }

function checkImageByMimeType(filePath: string) : boolean {
    const type = mime.getType(filePath);
    return type !== null && type.startsWith('image/');
}