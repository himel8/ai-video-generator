"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContentDuration from "./_components/ContentDuration";
import ContentStyle from "./_components/ContentStyle";
import ContentTopic from "./_components/ContentTopic";

const CreateNew = ({}) => {
  const [formData, setFormData] = useState([]);
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const hanadleIput = () => {
    console.log(formData);
  };

  return (
    <div className="md:px-20">
      <h2 className="text-4xl font-bold text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-5">
        <ContentTopic onUserSelect={onHandleInputChange} />
        <ContentStyle onUserSelect={onHandleInputChange} />
        <ContentDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-6 w-full" onClick={hanadleIput}>
          Create Short Video
        </Button>
      </div>
    </div>
  );
};

export default CreateNew;
