// import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,

} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
// import { FaReact } from "react-icons/fa";
// import { GiArtificialIntelligence } from "react-icons/gi";
// // import { IoGameController ,  MdAccountBalance,
//   MdOutlineAnimation,} from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
     
  ];
  return (
    <div className="categories">
      <h3 style={{textAlign:"center"}}>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id} style={{borderRadius:"10px"}}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
