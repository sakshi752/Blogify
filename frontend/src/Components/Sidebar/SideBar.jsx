import React from "react";
import { NavLink } from "react-router-dom";
import { sideBarItems } from "../../utils";

const SideBar = () => {
  return (
    <aside className="sticky top-0 h-screen w-72 bg-white/70 backdrop-blur-md border-r border-gray-200 shadow-md px-5 py-8">

      {sideBarItems.map((section) => (
        <div key={section.title} className="mb-8 ">

          <h2 className="text-lg font-semibold uppercase tracking-widest text-slate-900 mb-3 border-b-1">
            {section.title}
          </h2>

          <div className="space-y-2">

            {section.pages.map((page) => {
              const Icon = page.icon;

              return (
                <NavLink
                  key={page.path}
                  to={page.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive
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
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default SideBar;