"use client"
import { Text } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import Image from 'next/image';
import React from 'react'

type Props = {
  images: FileWithPath[];
}

export const Images = ({images}: Props) => {
  return (
    <div>
      {images?.length && images.length > 0 ? (
        <div>
          <Text>
            {/* {uploadFiles} */}
            これだよ
          </Text>
          {images.map((image) => (
            <Image
              key={image.name}
              src={URL.createObjectURL(image)}
              alt={image.name}
              width ={300}
              height={300}
            />
          ))}
          {/* <img
            src={URL.createObjectURL(uploadFiles[1])}
            alt={uploadFiles[1].name}
          /> */}
        </div>
      ) : (
        <Text>
          ファイルが選択されていません
        </Text>
      )}
    </div>
  )
}
