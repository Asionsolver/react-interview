import AccordionContainer from "./accordion-container";

const Accordion = () => {
  const items = [
    {
      title: "What is React?",
      content:
        "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.",
    },
    {
      title: "What are the main features of React?",
      content:
        "Some of the main features of React include: JSX, Components, Virtual DOM, One-way Data Binding, Performance, and Developer Tools.",
    },
    {
      title: "What is JSX?",
      content:
        "JSX stands for JavaScript XML. It allows us to write HTML in React. JSX makes it easier to write and add HTML in React.",
    },
  ];
  return <AccordionContainer items={items} />;
};

export default Accordion;
