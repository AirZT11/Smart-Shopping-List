import React from 'react';

const GroceryCard = ({ item }) => {
  return (
    <div>
      <p>ITEM: {item.itemName}</p>
      <p>LAST PURCHASE DATE: {item.lastPurchase}</p>
      <p>FREQUENCY: {item.frequency}</p>
    </div>
  );
};

export default GroceryCard;
