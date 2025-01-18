"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContentDuration = ({ onUserSelect }) => {
  const optionList = [
    "5 Seconds",
    "10 Seconds",
    "15 Seconds",
    "20 Seconds",
    "25 Seconds",
    "30 Seconds",
  ];
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-primary">Duration</h2>
      <p>Select the duration of your video</p>

      <Select
        onValueChange={(value) => {
          onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full capitalize px-6 py-5">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
          {optionList.map((item, index) => (
            <SelectItem value={item} key={index} className="capitalize">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ContentDuration;
