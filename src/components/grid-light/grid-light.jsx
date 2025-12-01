import { useState } from "react";
import Cell from "./Cell";

const GridLight = () => {
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const handleDeActiveCell = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  const handleActiveCell = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    console.log(newOrder);
    // deactivate
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      handleDeActiveCell();
    }
  };
  return (
    <div className="w-full  min-h-screen  flex justify-center flex-col items-center gap-4">
      <div className="grid grid-cols-3 max-w-[300px] w-full p-5 gap-5 border">
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              label={`Cell ${index}`}
              filled={order.includes(index)}
              onClick={() => handleActiveCell(index)}
              isDisabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <span key={index}></span>
          );
        })}
      </div>
    </div>
  );
};

export default GridLight;
