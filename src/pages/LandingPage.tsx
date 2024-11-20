import Header from "../components/header/Header";
import PolicyList from "../components/policy/PolicyList";

const LandingPage = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <section>
        <PolicyList />
      </section>
    </>
  );
};

export default LandingPage;
