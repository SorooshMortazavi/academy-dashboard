import React from "react";

interface IVideoInputProps {
  changeCallBack(file: File): any;
  setVideoDuration: any;
}
export default function VideoInput({
  changeCallBack,
  setVideoDuration,
}: IVideoInputProps) {
  const inputRef = React.useRef<any>(null);
  const [videoPreview, setVideoPreview] = React.useState("");

  function handleInputChange(e: React.ChangeEvent) {
    if (inputRef.current) {
      const files = inputRef.current.files as FileList;
      changeCallBack(files[0]);
      changePreview(files[0]);
    }
  }

  function changePreview(file: File) {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (ev: ProgressEvent<FileReader>) => {
      if (ev.target) {
        setVideoPreview(ev.target.result as string);
      }
    };
    fileReader.readAsDataURL(file as Blob);
  }
  return (
    <div className="card shadow-sm w-50 p-2">
      <h5 className="card-title text-success text-center">انتخاب ویدیو</h5>
      <video
        id="video-player"
        style={{ width: "100%", maxHeight: "400px", display: "block" }}
        controls={true}
        src={videoPreview}
        onDurationChange={(e: any) => setVideoDuration(e.target.duration)}
      ></video>
      <input
        ref={inputRef}
        onChange={handleInputChange}
        className="btn btn-success mt-1 "
        title="انتخاب ویدیو"
        type="file"
        accept="video/mp4"
      />
    </div>
  );
}
