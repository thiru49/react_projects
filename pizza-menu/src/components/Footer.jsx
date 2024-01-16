import React from "react";

const Footer = () => {
  const hour = new Date().getHours();

  const openHour = 12;
  const closeHours = 22;
  const isOpen = hour >= openHour && hour <= openHour;
  return (
    <footer
      className="flex flex-row justify-center items-center
    mt-2"
    >
      {isOpen ? (
        <div className="flex flex-col">
          <p>{new Date().getTime().toString()} currently resturents opens</p>
          <div className="flex justify-center mt-3">
            <button className="block bg-yellow-300 p-2 w-[50%]">
              Order-Now
            </button>
          </div>
        </div>
      ) : (
        <p>
          we're happy to welcome you between {openHour}:00 and {closeHours}:00.
        </p>
      )}
    </footer>
  );
};

export default Footer;
