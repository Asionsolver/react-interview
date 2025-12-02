import React from "react";
import { useState } from "react";

const checkBoxesData = [
  {
    id: 1,
    name: "Fruits",
    children: [
      {
        id: 2,
        name: "Citrus",
        children: [
          {
            id: 3,
            name: "Orange",
          },
          {
            id: 5,
            name: "Lemon",
          },
        ],
      },
      {
        id: 6,
        name: "Berries",
        children: [
          {
            id: 7,
            name: "Strawberry",
          },
          {
            id: 8,
            name: "BlueBerry",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Tropical",
    children: [
      {
        id: 10,
        name: "Guava",
      },
      {
        id: 11,
        name: "Mango",
      },
    ],
  },
  {
    id: 12,
    name: "Vegetables",
    children: [
      {
        id: 13,
        name: "Leafy",
        children: [
          {
            id: 14,
            name: "Spinach",
          },
          {
            id: 15,
            name: "Lettuce",
          },
        ],
      },
      {
        id: 16,
        name: "Root",
        children: [
          {
            id: 17,
            name: "Carrot",
          },
          {
            id: 18,
            name: "Beetroot",
          },
        ],
      },
    ],
  },
];

const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleChange = (e, node) => {
    setChecked((prev) => {
      const newChecked = { ...prev, [node.id]: e.target.checked };
      const updateCheckChildren = (node) => {
        node.children?.forEach((child) => {
          newChecked[child.id] = e.target.checked;
          child?.children && updateCheckChildren(child);
        });
      };
      updateCheckChildren(node);

      // if all children are checked, mark the parent as checked
      const verifyChecked = (node) => {
        if (!node.children) {
          return newChecked[node.id] || false;
        }
        const allChildrenChecked = node.children?.every((child) =>
          verifyChecked(child)
        );
        newChecked[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };
      checkBoxesData.forEach((node) => verifyChecked(node));
      return newChecked;
    });
  };
  return (
    <div className="">
      {data.map((node) => {
        return (
          <div key={node.id} className="ml-5 mt-0.5">
            <label>
              <input
                type="checkbox"
                checked={checked[node.id] || false}
                onChange={(e) => handleChange(e, node)}
              />
              <span className="ml-2">{node.name}</span>
            </label>
            {node?.children && (
              <CheckBoxes
                data={node.children}
                checked={checked}
                setChecked={setChecked}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const NestedCheckBoxes = () => {
  const [checked, setChecked] = useState({});
  return (
    <div className="p-20 ml-12">
      <CheckBoxes
        data={checkBoxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export default NestedCheckBoxes;
