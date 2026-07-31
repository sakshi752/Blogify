import React from "react";
import { NavLink } from "react-router-dom";
import { settingOptions, sideBarItems } from "../../utils";

const SideBar = () => {
  console.log("sdas")
  return (
    <aside className="sticky top-0 h-screen w-72 bg-white/70 backdrop-blur-md border-r border-gray-200 shadow-md px-5 py-8">
      <div>
        {sideBarItems.map((page) => {
          const Icon = page.icon;

          return (
            <div key={page.pageTitle} className="">
              <NavLink
                to={page.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {page.pageTitle}
                </span>
              </NavLink>
            </div>
          )

        })}
      </div>
      <div>
        <p>Settings</p>
        {settingOptions.map(option=>(
          <div>
            
          </div>
        ))}
      </div>

    </aside>
  );
};

export default SideBar;