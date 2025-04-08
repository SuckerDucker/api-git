import fs from 'fs';

export const deleteFile = (dir: string) => {
  fs.unlink(dir, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`El archivo ${dir} ha sido eliminado exitosamente.`);
  });
};

export const deleteDir = (path: string) => {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true });
    console.log(`Folder ${path} deleted successfully`);
  } else {
    console.log(`Folder ${path} does not exist`);
  }
};

export const reedFile = async (dir: string) =>
  new Promise((resolve) => {
    fs.readdir(dir, (error, archivos) => {
      if (error) {
        resolve([]);
      } else {
        resolve(archivos);
      }
    });
  });
