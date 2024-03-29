import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuFilter,
  LuMinus,
  LuPlus,
  LuStar,
  LuX,
  noResult,
} from "../../../icons";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProduct,
  fetchProductsByFiltersAsync,
  selectTotalItems,
  selectCategories,
  selectBrands,
  fetchCategoriesAsync,
  fetchBrandsAsync,
  selectProductLoading,
  selectSearchTerm,
} from "../productListSlice";
import { ITEMS_PER_PAGE } from "../../../constants/constants";
import Loader from "../../../components/Loader";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();

  //states
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  //selectors
  const products = useSelector(selectAllProduct);
  const totalItems = useSelector(selectTotalItems);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const searchTerm = useSelector(selectSearchTerm);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
  }, []);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="bg-white mt-4">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            handleFilter={handleFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
              <h1 className="text-4xl tracking-tight text-gray-900 font-primary">
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <LuChevronDown
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0  group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <NavLink
                                href={option.href}
                                onClick={(e) => handleSort(e, option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </NavLink>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2  hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <LuFilter className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter handleFilter={handleFilter} />

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Product Lists */}
                  <ProductGrid products={products} />
                </div>
              </div>
            </section>
            {/* Productlist and filter section end here */}

            {/* Pagination handlePage totalitmes totalPages Item_per_page */}
            <Pagination page={page} setPage={setPage} handlePage={handlePage} />
            {/* Pagination */}
          </main>
        </div>
      </div>
    </>
  );
}

function MobileFilter({
  handleFilter,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) {
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  return (
    <>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 "
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <LuX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3  hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <LuMinus
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <LuPlus
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options &&
                                section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

// Desktop Filters
function DesktopFilter({ handleFilter }) {
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];
  return (
    <>
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm  hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <LuMinus className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <LuPlus className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options &&
                      section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            onChange={(e) => handleFilter(e, section, option)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
}
// Desktop Filters End

//Pagination
function Pagination({ page, setPage, handlePage }) {
  const totalItems = useSelector(selectTotalItems);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={() => handlePage(page > 1 ? page - 1 : page)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <button
            onClick={() => handlePage(page < totalPages ? page + 1 : page)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>
              to
              <span className="font-medium">
                {page * ITEMS_PER_PAGE > totalItems
                  ? totalItems
                  : page * ITEMS_PER_PAGE}
              </span>
              of
              <span className="font-medium"> {totalItems} </span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={() => handlePage(page > 1 ? page - 1 : page)}
                className="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <LuChevronLeft className="h-5 w-5" aria-hidden="true" />
              </div>

              {Array.from({
                length: totalPages,
              }).map((el, index) => (
                <div key={index}>
                  <div
                    onClick={() => handlePage(index + 1)}
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center cursor-pointer ${
                      index + 1 === page
                        ? "bg-pink-500 text-white"
                        : "text-gray-900 bg-gray-300 hover:bg-gray-50"
                    }  px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}

              <div
                onClick={() => handlePage(page < totalPages ? page + 1 : page)}
                className="relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <LuChevronRight className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
//Pagination End

//Product Grid
function ProductGrid({ products }) {
  const productLoading = useSelector(selectProductLoading);
  const searchTerm = useSelector(selectSearchTerm);

  return (
    <>
      {productLoading ? (
        <Loader />
      ) : (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="group relative shadow p-3">
                    <Link to={`/product-detail/${product.id}`}>
                      <div className="aspect-w-1 h-[340px] w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none transition-opacity duration-500 group-hover:opacity-75">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm font-secondary">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            <span className="line-clamp-2">
                              {product.title}
                            </span>

                            <span className="text-xs bg-pink-500 rounded-full px-2 text-white">
                              {product.brand}
                            </span>
                          </h3>
                          <div className="mt-1 items-center gap-1 flex text-gray-600">
                            <LuStar className="w-4 h-4" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                        <div className="">
                          <p className="text-sm font-medium text-gray-700">
                            ₹{product.discountPrice}
                          </p>
                          <p className="text-sm text-gray-400 mt-1 line-through font-medium ">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                      {product.deleted && (
                        <div>
                          <p className="text-red-500 text-xs">
                            product deleted
                          </p>
                        </div>
                      )}
                      {product.stock <= 0 && (
                        <div>
                          <p className="text-red-500 text-sm">Out of stock</p>
                        </div>
                      )}
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <div className="flex items-center justify-center flex-col gap-2">
                    <img className="mx-auto" src={noResult} alt="noresult" />
                    <p className="font-secondary text-xl text-center font-bold">
                      Thanks for visiting our website!
                    </p>
                    <p className="text-sm font-secondary text-center">
                      {`Unfortunately, we couldn’t find any matches for ${searchTerm}`}
                      . <br />
                      {`Please try searching with another term.`}
                    </p>
                    <Link className="" to="/">
                      <button className="p-3 rounded-full bg-pink-500 text-white font-secondary">
                        Back to Home
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
//Product Grid End
