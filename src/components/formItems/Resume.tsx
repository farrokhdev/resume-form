import React from "react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { Box, IconButton, Typography, FormHelperText } from "@mui/material";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Props = {
  control: any;
  watch: any;
  setValue: any;
  errors: any;
};

export const Resume = (props: Props) => {
  const { control, watch, setValue, errors } = props;

  const DropzoneComponent = ({ onDrop }: any) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <Box
        {...getRootProps()}
        className={`w-full h-[300px] flex flex-col gap-2 items-center justify-center rounded-md transition-all duration-100 ${
          isDragActive ? "bg-primary text-white" : "bg-white text-black"
        }`}
        sx={{
          border: "2px dashed #cccccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>
            <span>داخل این قسمت رها کن</span>
          </Typography>
        ) : (
          <>
            <IconButton color="primary">
              <CloudUploadIcon />
            </IconButton>
            <Typography>
              <span className="text-primary font-bold">انتخاب فایل</span>
              <span> رها کردن فایل در این قسمت</span>
            </Typography>
            <Typography fontSize={"sm"}>
              <span className="text-gray-500">
                {" "}
                یک فایل انتخاب کنید با حجم حداکثر 2 mb{" "}
              </span>
            </Typography>
          </>
        )}
      </Box>
    );
  };

  const files = watch("files");

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_: any, i: number) => i !== index);
    setValue("files", updatedFiles);
  };

  return (
    <div className="w-full flex flex-col gap-2 text-black col-span-2 relative">
      <h3 className="text-base font-bold">رزومه</h3>
      <Controller
        name="files"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <>
            <DropzoneComponent
              onDrop={(acceptedFiles: any) => {
                const fileStrings = acceptedFiles.map((file: any) => file.name);
                onChange(fileStrings);
              }}
            />
            {errors.files && (
              <FormHelperText className="resume-error-message">
                {errors.files?.message}
              </FormHelperText>
            )}
            <Box>
              {value && value.length > 0 && (
                <Box>
                  {value.map((fileName: string, index: number) => (
                    <Box
                      className="w-100 min-h-[50px] flex justify-between items-center gap-2 border border-primary rounded-md px-2 py-4"
                      key={index}
                      sx={{ mt: 1 }}
                    >
                      <div className="flex gap-2">
                        <Box>
                          <Typography variant="body1">{fileName}</Typography>
                        </Box>
                      </div>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </>
        )}
      />
    </div>
  );
};
