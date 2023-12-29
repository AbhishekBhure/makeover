import UserProfile from "../features/user/components/UserProfile";

const Profile = () => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-primary my-4 text-center md:my-8">
        My Profile
      </h1>
      <UserProfile />
    </>
  );
};

export default Profile;
