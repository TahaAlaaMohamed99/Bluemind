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
      className={` h-[210px]  w-[474px] p-5  border-2  dark:bg-background-dark  border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-full bg-white shadow-sm`}>
          <IconComponent className={`w-8 h-8`} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-titleColor-dark">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed dark:text-titleColor-dark">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AddComponent;
