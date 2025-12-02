import { useState } from "react";
import json from "./data.json";

import List from "./list";

const FileExplorer = () => {
  const [data, setData] = useState(json);
  return (
    <div className="w-full pt-8 min-h-screen bg-amber-50 flex flex-col">
      <h1 className="text-center text-2xl uppercase font-semibold">
        File Explorer
      </h1>
      <div className="flex flex-col items-center justify-center mt-10 w-full bg-red-700">
        <List list={data} setData={setData} />
      </div>
    </div>
  );
};

export default FileExplorer;
