import React from "react";

function AddComponent({
  onCardClick,
  IconComponent,

  title,
  description,
}) {
  return (
    <div
      onClick={() => onCardClick()}
      className={`p-5  border-2  dark:bg-background-cardDark bg-background-cardLight border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg`}
    >
      <div className="flex flex-col items-center text-center space-y-1 ">
        <IconComponent className={`w-6 h-6`} />
        <h3 className="text-xl font-semibold text-secondary dark:text-titleColor-dark">
          {title}
        </h3>
        <p className="text-gray-600 text-sm font-medium leading-relaxed dark:text-titleColor-dark">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AddComponent;
