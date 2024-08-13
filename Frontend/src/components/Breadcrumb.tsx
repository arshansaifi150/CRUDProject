//@ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items ,className}) => {
  return (
    <nav className="text-sm breadcrumbs">
      <ol className={`flex items-center space-x-1 ${className}`}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-1 text-gray-500">{'>'}</span>}
            {item.link ? (
              <Link to={item.link} className="text-teal-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;