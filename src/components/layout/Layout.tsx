import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main style={{ marginBottom: "10vh" }}>{children}</main>
      <Footer />
    </div>
  );
}
