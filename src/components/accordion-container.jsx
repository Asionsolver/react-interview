import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const AccordionContainer = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return !items || items.length === 0 ? (
    <div className="accordion">No items available</div>
  ) : (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="accordion-item ">
            <button
              id={`accordion-title-${index}`}
              onClick={() => toggleAccordion(index)}
              className="accordion-title flex justify-between items-center w-full"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <span>{item.title}</span>
              <IoIosArrowDown
                className={`accordion-icon transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id={`accordion-content-${index}`}
              role="region"
              aria-labelledby={`accordion-title-${index}`}
              className={`accordion-content overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                isOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="p-3">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionContainer;
