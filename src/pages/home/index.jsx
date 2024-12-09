import { useSelector } from "react-redux";
import Filter from "../../components/filter";
import Error from "../../components/error";
import Loader from "./../../components/loader/index";
import "./home.scss";
import Card from "../../components/card";

const Home = () => {
  const { isLoading, error, jobs } = useSelector((store) => store.jobReducer);

  return (
    <div className="home-page">
      <Filter />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="cards-wrapper">
          {jobs.map((job) => (
            <div>
              <Card key={job.id} job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
