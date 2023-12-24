import Layout from "../components/Layout";
import ProductList from "../redux/product-list/ProductList";

const Home = () => {
  return (
    <Layout>
      <h1 className="font-primary text-3xl">Home</h1>
      <p className="font-secondary">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. In optio
        molestiae dicta vero ratione quibusdam consequuntur accusantium vel a
        esse, ullam recusandae fugit quis non. Corrupti sapiente ipsa distinctio
        unde?.
      </p>
      <ProductList />
    </Layout>
  );
};

export default Home;
