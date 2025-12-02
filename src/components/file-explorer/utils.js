export const addNode = (tree, parentId, newNode) => {
  return tree.map((node) => {
    if (node.id === parentId && node.isFolder) {
      return {
        ...node,
        children: node.children ? [...node.children, newNode] : [newNode],
      };
    }

    if (node.children) {
      return { ...node, children: addNode(node.children, parentId, newNode) };
    }

    return node;
  });
};

export const deleteNode = (tree, idToDelete) => {
  return tree
    .filter((node) => node.id !== idToDelete)
    .map((node) => {
      if (node.children) {
        return { ...node, children: deleteNode(node.children, idToDelete) };
      }
      return node;
    });
};
