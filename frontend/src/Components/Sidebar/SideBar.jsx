import React from "react";
import { NavLink } from "react-router-dom";
import { settingOptions, sideBarItems } from "../../utils";

const SideBar = () => {
  return (
    <aside className="sticky top-0 h-screen w-72 bg-white border-r border-gray-200 shadow-lg flex flex-col justify-between px-5 py-6">

      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          Dashboard
        </h2>

        <nav className="space-y-2">
          {sideBarItems.map((page) => {
            const Icon = page.icon;

            return (
              <NavLink
                key={page.pageTitle}
                to={page.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />

                <span className="font-medium">
                  {page.pageTitle}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <div className="border-t border-gray-200 pt-5">
          <p className="mb-3 px-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Settings
          </p>

          <nav className="space-y-2">
            {settingOptions.map((option) => {
              const Icon = option.icon;

              return (
                <NavLink
                  key={option.pageTitle}
                  to={option.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  <Icon
                    size={20}
                    className="transition-transform group-hover:scale-110"
                  />

                  <span className="font-medium">
                    {option.pageTitle}
                  </span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;