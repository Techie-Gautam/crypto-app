import React from "react";

function Footer() {

    let date = new Date().getFullYear()
  return (
    <footer className="bg-gray-800 text-white py-4 text-center h-[10vh] flex flex-col items-center justify-center">
      <div className="container mx-auto">
        <p>&copy; {`${date}  CryptoHorizon. All rights reserved.`}</p>
        <p>
          Follow us on{" "}
          <a href="#" className="text-blue-400 hover:text-blue-600">
            Twitter
          </a>{" "}
          |{" "}
          <a href="#" className="text-blue-400 hover:text-blue-600">
            Facebook
          </a>{" "}
          |{" "}
          <a href="#" className="text-blue-400 hover:text-blue-600">
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
