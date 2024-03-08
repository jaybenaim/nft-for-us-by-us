import Navbar from "@components/Organisms/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="text-white">{children}</div>
    </>
  );
};

export default Layout;
