import BackButton from "../components/BackButton";
import Layout from "../components/Layout";
import ProductDetail from "../features/product-list/components/ProductDetail";

function ProductDetailPage() {
  return (
    <Layout>
      <BackButton />
      <ProductDetail />
    </Layout>
  );
}

export default ProductDetailPage;
