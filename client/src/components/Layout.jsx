import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <div className="max-w-7xl min-h-screen mx-auto md:px-0 px-3">
        {children}
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "MakeOver",
  description: "mern full-stack project",
  keywords: "mern, reactjs ,nodejs, mongoDB, expressjs",
  author: "Abhishek",
};

export default Layout;
