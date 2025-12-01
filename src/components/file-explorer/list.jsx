import { useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";

const List = ({ list }) => {
  const [expanded, setExpanded] = useState({});

  const handleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className="mt-1 pl-4">
      {list.map((node) => {
        const isOpen = expanded[node.id];

        return (
          <div key={node.id}>
            <span className="mt-1  flex items-center gap-2 bg-amber-100 p-1 rounded border border-amber-400">
              {node.isFolder && (
                <span
                  onClick={() => handleExpand(node.id)}
                  className={`cursor-pointer transition-transform duration-200 ${
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
            </span>
            {isOpen && node?.children && <List list={node.children} />}
          </div>
        );
      })}
    </div>
  );
};

export default List;
