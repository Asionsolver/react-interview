import { useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { addNode } from "./utils";

const List = ({ list, setData }) => {
  const [expanded, setExpanded] = useState({});

  const handleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleAdd = (parentId) => {};
  const handleDelete = (node) => {};
  return (
    <div className="mt-1 pl-4 w-full max-w-[220px]">
      {list.map((node) => {
        const isOpen = expanded[node.id];

        return (
          <div key={node.id} className="group relative">
            <span className="mt-1  flex items-center gap-2 bg-amber-100 p-1 rounded border border-amber-400">
              {node.isFolder && (
                <span
                  onClick={() => handleExpand(node.id)}
                  className={`inline-block cursor-pointer transition-transform duration-200 ${
                    !isOpen ? "-rotate-90" : "rotate-0"
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              )}

              <span>
                {node.isFolder ? (
                  <FcOpenedFolder size={25} />
                ) : (
                  <FcFile size={20} />
                )}
              </span>
              <span>{node.name}</span>
              <div className="absolute right-2 hidden group-hover:flex items-center gap-2">
                {/* Add button only for folders */}
                {node.isFolder && (
                  <button
                    onClick={() => handleAdd(node.id)}
                    className="p-1 cursor-pointer bg-green-200 hover:bg-green-300 rounded-full text-sm text-green-500"
                  >
                    <MdAdd />
                  </button>
                )}

                {/* Delete button for all */}
                <button
                  onClick={() => handleDelete(node.id)}
                  className="p-1 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer text-sm text-red-500"
                >
                  <AiTwotoneDelete color="red" />
                </button>
              </div>
            </span>
            {isOpen && node?.children && <List list={node.children} />}
          </div>
        );
      })}
    </div>
  );
};

export default List;
