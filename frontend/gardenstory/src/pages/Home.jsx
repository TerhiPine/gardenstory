import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import Calendar from "../components/Calendar";

export default function Home() {
  return (
    <Layout>
      <Container>
        <div className="py-10">
          <h2 className="text-2xl font-bold text-green-900 mb-4">
            Tervetuloa puutarhaan
          </h2>


          <p className="text-green-800">
            Valitse päivä kalenterista tai lisää uusi merkintä.
          </p>

          <Calendar />
        </div>
      </Container>
    </Layout>
  );
}