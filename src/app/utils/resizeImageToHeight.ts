import { FileWithPath } from "@mantine/dropzone";

export const resizeImageToHeight = (file: FileWithPath, targetHeight: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = targetHeight / img.height;
      const targetWidth = img.width * scale;

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context is null'));

      // 白背景で塗りつぶす（透過部分を白くする）
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 画像を描画
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Canvas toBlob failed'));
        const resizedFile = new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' });
        resolve(resizedFile);
      }, 'image/jpeg');
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};