import { useEffect, useState } from "react";
import i18next from "i18next";
import { navLogo } from "../utils";
import { recipes } from "../constants";
import { useTranslation } from "react-i18next";

const RecipeBook = () => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );
  const [recipe, setRecipes] = useState(recipes && recipes[0]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const toggleButton = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("default-sidebar");
    const toggleSidebar = () => {
      sidebar.classList.toggle("-translate-x-full");
    };
    toggleButton.addEventListener("click", toggleSidebar);
    return () => {
      toggleButton.removeEventListener("click", toggleSidebar);
    };
  }, []);

  useEffect(() => {
    if (language === "ar") document.body.dir = "rtl";
    else document.body.dir = "ltr";
  }, [language]);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);
    i18next.changeLanguage(selectedLanguage);
    setDropdownOpen(false);
  };

  const itemDetails = (recipe) => {
    const result = recipes.find((item) => item.name == recipe.name);
    setRecipes(result);
    setCheckedItems({});
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
                id="sidebar-toggle"
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <a className="flex items-center justify-between mr-4">
                <img
                  src={navLogo}
                  className="mr-3 ml-5 h-8"
                  alt="Flowbite Logo"
                />
                <span className=" ml-10 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  {t("Restro Guru")}
                </span>
              </a>
            </div>
            <div className="flex justify-start items-center">
              <span className=" hidden md:block md:pl-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {t("Recipe book")}
              </span>
            </div>
            <div className="flex items-center lg:order-2">
              {/* language */}
              <div className="relative">
                <button
                  className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"></path>
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleLanguageChange("en")}
                      >
                        EN
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleLanguageChange("ar")}
                      >
                        AR
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* <!-- Sidebar --> */}

        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          // id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            <span className="flex justify-center items-center md:hidden mb-2 md:pl-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {t("Recipe book")}
            </span>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700 md:border-0 md:pt-2 md:mt-2">
              {recipes &&
                recipes.map((item, index) => (
                  <li key={index} onClick={() => itemDetails(item)}>
                    <a
                      href="#"
                      className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="ml-3">{item.name}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </aside>

        <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
                <img
                  alt={`${recipe ? recipe.name : "noImage"}`}
                  className="w-full h-64 object-cover object-center rounded lg:h-auto"
                  src={`${recipe && recipe.imageurl}`}
                />
              </div>
              <div className="w-full lg:w-1/2 px-4 ">
                <div className="lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {"By "} {recipe && recipe.author}
                  </h2>
                  <h1 className="text-white text-3xl title-font font-medium mb-1">
                    {recipe && recipe.name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <span className="ml-3">4 Reviews</span>
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
                      <a>
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                      </a>
                      <a>
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                      <a>
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                      </a>
                    </span>
                  </div>
                  {recipe &&
                  recipe.ingredients &&
                  recipe.ingredients.length != 0 ? (
                    <>
                      <h3 className="text-white text-2xl title-font font-medium mb-1 ">
                        Ingredients :{" "}
                        <span
                          style={{
                            fontSize: "17px",
                            color: "#39ff14",
                            textShadow:
                              "0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14, 0 0 80px #39ff14",
                          }}
                        >
                          You can checkList
                        </span>
                      </h3>
                      <ul className="ml-2 text-white text-1xl title-font font-medium border-b-2 pb-5 border-gray-800 mb-5">
                        {recipe.ingredients.length !== 0 &&
                          recipe.ingredients.map((item, index) => (
                            <li
                              key={index}
                              className={
                                checkedItems[index] ? "line-through" : ""
                              }
                            >
                              <input
                                className="mr-1"
                                type="checkbox"
                                checked={checkedItems[index] || false}
                                onChange={() => handleCheckboxChange(index)}
                              />
                              {item}
                            </li>
                          ))}
                      </ul>
                    </>
                  ) : null}

                  {recipe && recipe.description ? (
                    <>
                      <h3 className="text-white text-2xl title-font font-medium mb-1 mt-4">
                        Description :
                      </h3>
                    </>
                  ) : null}

                  <p className="leading-relaxed border-b-2 pb-5 border-gray-800 mb-5">
                    {recipe && recipe.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecipeBook;
