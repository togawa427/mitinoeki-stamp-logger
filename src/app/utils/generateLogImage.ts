// const fillRouteImage = (routeImage: File, ctx: CanvasRenderingContext2D): CanvasRenderingContext2D => {
//   const img = new Image();
//   img.src = URL.createObjectURL(routeImage);
//   img.onload = () => {
//     // ルート画像を描画
//     const routeWidth = 1000
//     ctx.drawImage(img, 0, 0, routeWidth, 500)
//   }
//   return ctx
// }

const fillImageToCanvas = (imageFile: File, ctx: CanvasRenderingContext2D, startX: number, startY:number, width: number, hight: number): CanvasRenderingContext2D => {
  const img = new Image();
  img.src = URL.createObjectURL(imageFile);
  img.onload = () => {
    // 画像を描画
    ctx.drawImage(img, startX, startY, width, hight)
  }
  return ctx
}

export const generateLogImage = async (files: File[], routeFile: File): Promise<File> => {
  
  return new Promise((resolve, reject) => {

    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // 白背景で塗りつぶす（透過部分を白くする）
    if (!ctx) return reject(new Error('Canvas context is null'));
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 日時を右下に描画
    ctx.fillStyle = 'black';
    ctx.font = "100px serif";
    ctx.textAlign = "right";
    ctx.fillText("2025年7月3日(火)", 1900, 1050)

    // ルート画像
    const routeWidth = canvas.height / 3 * 2
    fillImageToCanvas(routeFile, ctx, 0, 0, routeWidth, canvas.height)

    // スタンプ画像
    fillImageToCanvas(files[0], ctx, routeWidth, 0, 400, 300)

    fillImageToCanvas(files[1], ctx, routeWidth+400, 0, 400, 300)

    setTimeout(() => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Canvas toBlob failed'));
        const outputFile = new File([blob], "output.jpg", { type: 'image/jpeg' });
        resolve(outputFile);
      }, 'image/jpeg');
    }, 500);
  });

};