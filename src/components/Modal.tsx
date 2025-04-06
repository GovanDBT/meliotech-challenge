import { ChangeEvent, useState } from "react";

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
    <>
      <button
        className="btn"
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
          <h3 className="font-bold text-lg">Upload File</h3>
          {file && (
            <img src={URL.createObjectURL(file)} alt="Uploaded file preview" />
          )}
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
          <button type="button" onClick={handleSubmit} className="btn">
            Submit Image
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
