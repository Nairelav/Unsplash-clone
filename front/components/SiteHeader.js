import UploadModal from "./UploadModal";

const header = () => {
  return (
    <nav className="bg-black py-5 px-20 text-gray-300 lg:flex space-y-8 lg:space-y-0 text-center lg:text-left justify-between">
      <a href="#" className="text-xl text-white font-medium">
        Unsplash clone
      </a>
      <div>
        <a href="#" className="text-gray-200 text-lg py-4 px-6">
          Login/signup
        </a>
        <UploadModal />
      </div>
    </nav>
  );
};

export default header;
