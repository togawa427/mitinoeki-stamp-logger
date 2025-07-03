"use client"
import { Group } from '@mantine/core'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload, IconX } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'
// import { resizeImageToHeight } from '../utils/resizeImageToHeight'
import { resizeImagesToHeight } from '../utils/resizeImagesToHeight'

type Props = {
  uploadFiles: FileWithPath[];
  setUploadFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
  idleMessage: string;
}

const ImageForm = ({setUploadFiles, uploadFiles, idleMessage}: Props) => {

  const createThumbnailFiles = async (files: FileWithPath[]) => {
    if(files){
      const resizedFiles = await resizeImagesToHeight(files, 1000)
      setUploadFiles(resizedFiles)
      // setUploadFiles(files)
    }
  }

  return (
    <div className='bg-amber-50'>
      <Dropzone
        onDrop={(files) => {
          createThumbnailFiles(files)
          // ファイル操作
          // console.log(files)
          // setUploadFiles(files)
        }}
        maxSize={20 * 1024 ** 2}  // <- データサイズ上限を指定できる
        accept={IMAGE_MIME_TYPE}  // <- 許容するファイルの拡張子を指定できる
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }} className='min-w-96  border-2 border-slate-200 bg-slate-100'>
          <Dropzone.Accept>
            <div>
              {/* 成功時のアイコン */}
              <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
            </div>
          </Dropzone.Accept>
          <Dropzone.Reject>
            <div>
              {/* 失敗時のアイコン */}
              <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
            </div>
          </Dropzone.Reject>
          <Dropzone.Idle>
            <div>
              <div>
                {/* アイコン */}
                {uploadFiles.length > 0 ? (
                  <div className='flex flex-wrap'>
                    {uploadFiles.map((file) => (
                      <div key={file.name} className="w-32 h-32">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={50}
                          height={50}
                          className='object-cover w-32 h-32'
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-center'>
                    {idleMessage}
                  </p>
                )}
              </div>
            </div>
          </Dropzone.Idle>
        </Group>
      </Dropzone>
    </div>

  )
}

export default ImageForm