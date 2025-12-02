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

// ! Another way to solve this problem

// Recursive Checkbox Component

// const CheckBoxTree = ({ data }) => {
//   const [checked, setChecked] = useState({});

//   // Build a parent lookup table: childId → parentId
//   const parentMap = useMemo(() => {
//     const map = {};

//     const build = (node, parent = null) => {
//       if (parent) map[node.id] = parent.id;
//       if (node.children) node.children.forEach((child) => build(child, node));
//     };

//     data.forEach((root) => build(root));
//     return map;
//   }, [data]);

//   // Mark all children for parent check/uncheck
//   const updateChildren = (node, value, temp) => {
//     temp[node.id] = value;
//     node.children?.forEach((child) => updateChildren(child, value, temp));
//   };

//   // Update ancestors safely (no infinite recursion)
//   const updateParents = (nodeId, temp) => {
//     const parentId = parentMap[nodeId];
//     if (!parentId) return;

//     // Get parent node reference
//     const parentNode = findNode(data, parentId);

//     const allChildrenChecked = parentNode.children.every(
//       (child) => temp[child.id]
//     );

//     temp[parentId] = allChildrenChecked;

//     updateParents(parentId, temp);
//   };

//   // Utility: Find node by id
//   const findNode = (list, id) => {
//     for (const node of list) {
//       if (node.id === id) return node;
//       if (node.children) {
//         const found = findNode(node.children, id);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   const handleChange = (node, value) => {
//     const temp = { ...checked };

//     // Update clicked node
//     temp[node.id] = value;

//     // Update all children
//     updateChildren(node, value, temp);

//     // Update parents
//     updateParents(node.id, temp);

//     setChecked(temp);
//   };

//   return (
//     <div>
//       {data.map((node) => (
//         <TreeNode
//           key={node.id}
//           node={node}
//           checked={checked}
//           onChange={handleChange}
//         />
//       ))}
//     </div>
//   );
// };

// Recursive item renderer
// const TreeNode = ({ node, checked, onChange }) => {
//   return (
//     <div style={{ marginLeft: 20 }}>
//       <label>
//         <input
//           type="checkbox"
//           checked={!!checked[node.id]}
//           onChange={(e) => onChange(node, e.target.checked)}
//         />
//         {node.name}
//       </label>

//       {node.children?.map((child) => (
//         <TreeNode
//           key={child.id}
//           node={child}
//           checked={checked}
//           onChange={onChange}
//         />
//       ))}
//     </div>
//   );
// };

// export default function NestedCheckBoxes() {
//   return (
//     <div>
//       <CheckBoxTree data={checkBoxesData} />
//     </div>
//   );
// }
