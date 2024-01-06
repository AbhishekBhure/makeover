import BackButton from "../components/BackButton";
import Layout from "../components/Layout";
import Cart from "../features/cart/Cart";

function CartPage() {
  return (
    <Layout>
      <BackButton />
      <Cart />
    </Layout>
  );
}

export default CartPage;
