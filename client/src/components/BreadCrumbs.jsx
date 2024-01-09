import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const pathNames = pathname.split("/").filter((x) => x);
  let breadCrumbPath = "";
  return (
    <div>
      <div className="flex items-center gap-2 text-sm">
        {pathNames.length > 0 && (
          <Link to="/" className="text-gray-400 hover:text-pink-500">
            Home
          </Link>
        )}

        {pathNames.map((name, index) => {
          breadCrumbPath += `/${name}`;

          const isLast = index === pathNames.length - 1;

          return isLast ? (
            <span key={index}>/{name}</span>
          ) : (
            <Link
              to={breadCrumbPath}
              key={index}
              className="text-gray-400 hover:text-pink-500"
            >
              /{name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BreadCrumbs;
