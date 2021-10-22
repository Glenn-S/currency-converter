import React, { FC, ReactElement } from 'react';

const Header : FC = ({ children }) : ReactElement => {
  return (
    <div className="block bg-gray-300">
      <ul className="text-right">
        {React.Children.map(children, child => 
          <li className="inline-block px-4 py-3 transition duration-200 ease-in-out bg-gray-300 hover:bg-gray-500">
            {child}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;