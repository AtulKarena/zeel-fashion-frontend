import { Metadata } from "next";
import Home from "./Home";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Home - Zeel Fashion`,
  };
}

const HomePage = async () => {
  return <Home />;
};

export default HomePage;
