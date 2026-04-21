import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="bg-background min-h-screen">
      <Sidebar />
      <Header />

      <main className="md:ml-64 pt-20 px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;