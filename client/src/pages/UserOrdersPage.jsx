import Layout from "../components/Layout";
import UserOrders from "../features/user/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <Layout>
      <h1 className="text-2xl md:text-3xl font-primary my-4 text-center md:my-8">
        My Orders
      </h1>
      <UserOrders />
    </Layout>
  );
};

export default UserOrdersPage;
