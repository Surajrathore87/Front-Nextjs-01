import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useRef } from "react";

const ImagePicker = (props) => {
  const { file, setFile, photo } = props;

  const fileRef = useRef();
  const imgRef = useRef();
  let reader;

  useEffect(() => {
    reader = new FileReader();
    reader.onload = function (e) {
      imgRef.current.src = e.target.result;
    };
  }, [file]);

  useEffect(() => {
    if (file) {
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <>
      <div
        className="imagePicker cursor-pointer"
        onClick={() => fileRef.current.click()}
      >
        {file ? (
          <img ref={imgRef} className="img-fluid h-100 w-100" />
        ) : (
          <div className="w-100 h-100 rounded text-center shadow d-flex flex-column align-items-center justify-content-center">
            <span>
              <FontAwesomeIcon icon={faFileUpload} className="label-color-3" />
            </span>
            <p className="label-color-3 m-0">Upload</p>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileRef}
        onChange={(e) => {
          if (e.target.files[0]) {
            setFile((prevState) => ({
              ...prevState,
              [photo]: e.target.files[0],
            }));
          }
        }}
        accept=".png, .gif, .jpeg, .svg"
      />
    </>
  );
};

export default ImagePicker;
