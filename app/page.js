import NavBar from "./NavBar";
import HomeBanner from "./HomeBanner";
import { PropList } from "./PropList";
import { Custom } from "./Custom";
import { Footer } from "./Footer";

export default function Home() {
  return (
    <div>
      <NavBar></NavBar>
      <HomeBanner></HomeBanner>
      <PropList></PropList>
      <Custom></Custom>
      <Footer></Footer>
    </div>
  );
}
