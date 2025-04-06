import { ChangeEvent, useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";

interface ModalProps {
  addImage: (imageUrl: string) => void;
}

const Modal = ({ addImage }: ModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = () => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      addImage(imageUrl);
      setFile(null); // Clear the file after submission
      (document.getElementById("image_modal") as HTMLDialogElement).close(); // Close the modal
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() =>
          (
            document.getElementById("image_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Add Image
      </button>
      <dialog id="image_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-3">Upload Image</h3>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col items-center space-y-2">
              {!file && (
                <IoCloudUploadSharp size={60} className="opacity-30 mb-4" />
              )}
              {file && (
                <img
                  className="rounded-xl"
                  src={URL.createObjectURL(file)}
                  alt="Uploaded file preview"
                />
              )}
              <input
                type="file"
                className="file-input btn-primary"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit Image
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
