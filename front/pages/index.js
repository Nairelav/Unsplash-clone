import Image from "next/image";

const index = ({ photos }) => {
  const { data } = photos;

  return (
    <div className="p-[7rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((photo, index) => (
          <Img
            key={photo.id}
            url={photo.attributes.file.data.attributes.url}
            width={photo.attributes.file.data.attributes.width}
            height={photo.attributes.file.data.attributes.height}
          />
        ))}
      </div>
    </div>
  );
};

function Img(data) {
  return (
    <div className="relative">
      <div className="group relative">
        <div className="absolute h-full w-full -right-3 -bottom-3 bg-black rounded-lg transform group-hover:-translate-x-2 group-hover:-translate-y-2 transition duration-200"></div>
        <Image src={`http://localhost:1337${data.url}`} width={data.width} height={data.height} className="rounded-lg shadow-md" />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:1337/api/photos?populate=*");
  const photos = await res.json();

  return {
    props: {
      photos,
    },
  };
};

export default index;
