import React from "react";
import StoreItemCard from "./StoreItemCard";

type StoreItem = {
  id: string;
  title: string;
  description: string;
  cost: number | "FREE";
  currency: "CHIPS" | "VS" | "POINTS" | "FREE";
  levelRequired: number;
  image: string;
  tag?: string;
  onPurchase?: () => void;
};

const StoreTabContent: React.FC<{
  items: StoreItem[];
  userLevel: number;
}> = ({ items, userLevel }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {items.map((item) => (
        <StoreItemCard
          key={item.id}
          item={item}
          isLocked={userLevel < item.levelRequired}
          userLevel={userLevel}
        />
      ))}
    </div>
  );
};

export default StoreTabContent;
