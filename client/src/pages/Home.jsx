import { Link } from "react-router-dom";
function Home() {
  return (
    <main className="home">
      <h1>Local Services Booking</h1>
      <p>
        Find local services, book a date and time, and track your reservations.
      </p>
      <div className="actions">
        <Link to="/services" className="primary-action">
          Browse services
        </Link>
        <Link to="/reservations">My reservations</Link>
      </div>
    </main>
  );
}

export default Home;
