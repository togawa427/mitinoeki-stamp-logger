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

export const generateLogImage = async (files: File[], routeFile: File, date: Date, area: string, sumMitinoeki: number, visitedMitinoeki: number): Promise<File> => {
  
  return new Promise((resolve, reject) => {

    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // 白背景で塗りつぶす（透過部分を白くする）
    if (!ctx) return reject(new Error('Canvas context is null'));
    ctx.fillStyle = 'rgb(9 56 113)';  // 9 56 113
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 日時を右下に描画
    ctx.fillStyle = 'white';
    ctx.font = "70px 'MS PGothic', san-serif";
    // 日付
    ctx.textAlign = "right";
    ctx.fillText(`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${days[date.getDay()]})`, 1900, 980)
    // 
    ctx.font = "40px 'MS PGothic', san-serif";
    ctx.fillText(`( ${area}の達成度 ${visitedMitinoeki}/${sumMitinoeki} )`, 1900, 1050)

    // ルート画像
    const routeWidth = canvas.height / 3 * 2
    fillImageToCanvas(routeFile, ctx, 0, 0, routeWidth, canvas.height)

    // スタンプ画像
    let stampWidth = 400
    let stampHeight = 300
    if(files.length <= 9){
      stampWidth = (canvas.width - routeWidth) / 3
    } else if (files.length <= 16){
      stampWidth = (canvas.width - routeWidth) / 4
    } else if (files.length <= 25){
      stampWidth = (canvas.width - routeWidth) / 5
    }
    stampHeight = (stampWidth/4)*3

    let startX = routeWidth
    let startY = 0
    files.map((file) => {
      fillImageToCanvas(file, ctx, startX, startY, stampWidth, stampHeight)
      startX += stampWidth
      if(startX >= canvas.width){
        startX = routeWidth
        startY += stampHeight
      }
    })

    setTimeout(() => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Canvas toBlob failed'));
        const outputFile = new File([blob], "output.jpg", { type: 'image/jpeg' });
        resolve(outputFile);
      }, 'image/jpeg');
    }, 500);
  });

};