import { useState, useCallback, useEffect } from "react";
import ReactModal from "react-modal";
import { useDropzone } from "react-dropzone";

ReactModal.setAppElement("#__next");

const UploadModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={openModal} className="text-gray-500 text-md py-2.5 px-6 bg-white rounded-full focus:outline-none focus:bg-yellow-300">
        Upload your image
      </button>

      <ReactModal
        isOpen={isModalOpen}
        contentLabel="Upload your photo"
        onRequestClose={closeModal}
        className="absolute inset-0 top-20 left-20 right-20 bottom-20 bg-white border-gray-100 shadow-2xl m-48 p-10 rounded-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button onClick={closeModal} className="absolute top-10 right-10">
          Close
        </button>
        <div className="flex flex-col h-full">
          <h2 className="flex-shrink text-4xl font-extrabold mb-12">Upload your photo</h2>
          <div>
            <UploadDropZone />
          </div>
        </div>
      </ReactModal>
    </>
  );
};

function UploadDropZone(props) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:1337/api/photos", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { description: "file", file: files[0] } }),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="h-full flex-col">
      <div
        {...getRootProps({
          className:
            "relative flex-1 items-center border-2 border-dash border-gray-200 rounded-lg py-16 px-10 text-center bg-gray-100 cursor-pointer text-gray-500 hover:bg-blue-100 hover:border-blue-300 hover:text-blue-500 transition duration-200",
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <div className="absolute right-5 bottom-3">
          {files.map((file, index) => (
            <img src={file.preview} key={index} className="w-40 rounded-lg shadow-2xl" />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <button type="submit" className="bg-blue-400 text-blue-50 py-2 px-20 rounded-lg font-medium">
          Upload
        </button>
      </div>
    </form>
  );
}

export default UploadModal;
