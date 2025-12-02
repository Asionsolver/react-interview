import CheckoutStepper from "./checkout-stepper";

const CHECKOUT_STEPS = [
  {
    name: "Contact Info",
    Component: () => <div>Please Provided your contact information.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Please provide your shipping information.</div>,
  },
  {
    name: "Review Order",
    Component: () => <div>Please review your order.</div>,
  },
  {
    name: "Confirmation",
    Component: () => <div>Thank you for your order!</div>,
  },
];
const Stepper = () => {
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center">Checkout</h2>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </div>
  );
};

export default Stepper;
