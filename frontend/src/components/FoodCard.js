import React from "react";

const FoodCard = ({ item, buttonText, buttonColor, onButtonClick, isActionAllowed = true }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 w-72 hover:shadow-xl transition-shadow duration-300">
    <div
      className={`h-2 w-full`}
      style={{ backgroundColor: buttonColor }}
    ></div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
          {item.foodName}
        </h3>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-semibold">
          {item.foodType}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        Quantity:{" "}
        <span className="font-bold text-gray-800">{item.quantity}</span>
      </p>

      <button
        onClick={() => { if (isActionAllowed) onButtonClick(item._id); }}
        disabled={!isActionAllowed}
        className={`w-full py-2.5 rounded-lg font-bold text-white shadow-sm transition-transform ${isActionAllowed ? 'active:scale-95' : 'opacity-50 cursor-not-allowed'} `}
        style={{ backgroundColor: isActionAllowed ? buttonColor : '#9ca3af' }}
      >
        {isActionAllowed ? buttonText : 'Read-Only'}
      </button>
    </div>
  </div>
);

export default FoodCard;
