"use client"
// import { Button } from '@mantine/core'
import React, { useState } from 'react'
import ImageForm from './ImageForm'
import { FileWithPath } from '@mantine/dropzone'
import { Button } from '@mantine/core'
import Image from 'next/image'
import { generateLogImage } from '../utils/generateLogImage'

function Base() {
  const [uploadFiles, setUploadFiles] = useState<FileWithPath[]>([])
  const [routeImageFiles, setRouteImageFiles] = useState<FileWithPath[]>([])
  const [outputImageFile, setOutputImageFile] = useState<FileWithPath>()

  const generateOutputImage = async () => {
    // const outImg:FileWithPath
    // setOutputImageFile(outImg)
    const outImg: File = await generateLogImage(uploadFiles, routeImageFiles[0])
    setOutputImageFile(outImg)
    console.log("a")
  }
  return (
    <div className='mt-5'>
      <div className='mx-auto w-fit bg-amber-100 px-10 py-3'> 
        <p className='text-2xl'>スタンプ帳</p>
        <div className='w-fit'>
          <ImageForm
            uploadFiles={uploadFiles}
            setUploadFiles = {setUploadFiles}
            idleMessage='ここにスタンプ帳の写真をドロップしてください（最大20枚）'
          />
        </div>
      </div>
      <div className='mx-auto w-fit bg-blue-100 px-10 py-3'> 
        <p className='text-2xl'>ルート</p>
        <div className='w-fit'>
          <ImageForm
            uploadFiles={routeImageFiles}
            setUploadFiles = {setRouteImageFiles}
            idleMessage='ここにルートのスクショをドロップしてください（1枚）'
          />
        </div>
      </div>

      <div className='mx-auto text-center my-2'>
        <Button onClick={generateOutputImage}>生成する</Button>
      </div>

      {outputImageFile ? (
        <div>
          <Image
            src={URL.createObjectURL(outputImageFile)}
            width ={600}
            height={800}
            alt='a'
          />
        </div>
      ) : (
        <div></div>
      )}
      {/* {uploadFiles ? (
        <Images
          images = {uploadFiles}
        />
      ) : (
        <div>
        </div>
      )} */}
    </div>
  )
}

export default Base