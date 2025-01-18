import Image from "next/image";
import { useState } from "react";

const ContentStyle = ({ onUserSelect }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const styleList = [
    { name: "Realstic", image: "/real.jpg" },
    { name: "Cartoon", image: "/cartoon.jpg" },
    { name: "Comic", image: "/comic.jpg" },
    { name: "WaterColor", image: "/water.jpg" },
    { name: "GTA", image: "/gta.jpg" },
  ];
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-primary">Style</h2>
      <p>Select your video style</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mt-3 ">
        {styleList.map((item, index) => (
          <div
            onClick={() => {
              setSelectedItem(item);
              onUserSelect("style", item?.name);
            }}
            key={index}
            className={`relative hover:scale-105 transition-all ease-in-out cursor-pointer ${
              selectedItem.name === item.name &&
              "border-4 border-primary rounded-lg"
            }`}
          >
            <Image
              src={item.image}
              height={100}
              width={100}
              className="h-48 object-cover w-full rounded-md"
            />
            <p className="text-center absolute p-1 bottom-0 rounded-b-md bg-black text-white w-full">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentStyle;
