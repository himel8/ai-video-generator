"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ContentTopic = ({ onUserSelect }) => {
  const optionList = [
    "custom prompt",
    "random ai story",
    "scary story",
    "historical facts",
    "bed time story",
    "motivational",
    "fun facts",
  ];

  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">Content</h2>
      <p>What is the topic of your video</p>

      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value != "custom prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="w-full capitalize px-6 py-5">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {optionList.map((item, index) => (
            <SelectItem value={item} key={index} className="capitalize">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "custom prompt" && (
        <Textarea
          placeholder="Write prompt on which you want to generate video"
          className="mt-3"
          onChange={(e) => onUserSelect("topic", e.target.value)}
        />
      )}
    </div>
  );
};

export default ContentTopic;
