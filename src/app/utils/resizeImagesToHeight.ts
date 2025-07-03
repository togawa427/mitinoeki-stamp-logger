import { FileWithPath } from "@mantine/dropzone";
import { resizeImageToHeight } from "./resizeImageToHeight";

export const resizeImagesToHeight = async (files: FileWithPath[], targetHeight: number): Promise<File[]> => {
  const resizedFiles = await Promise.all(
    files.map(async (file) => {
      const resized = await resizeImageToHeight(file, targetHeight);
      return resized; // resizeImageToHeightがFile[]を返すようになったので[0]を取る
    })
  );
  return resizedFiles;
};