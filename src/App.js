import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import BookTicket from "./pages/bookTicket/BookTicket";
import Checkout from "./pages/checkout/Checkout";
import Context from "./Context";
import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./pages/search/Search";
function App() {
    return (
        <div className="App">
            <Context>
                <Router>
                    <Header />
                    <Routes>
                        <Route index element={<Home />}></Route>
                        <Route path="movie/:id" element={<Movie />}></Route>
                        <Route
                            path="movies/:type"
                            element={<MovieList />}
                        ></Route>
                        <Route
                            path="movie/bookticket/:id"
                            element={<BookTicket />}
                        ></Route>
                        <Route
                            path="movie/bookticket/checkout/:id"
                            element={<Checkout />}
                        ></Route>
                        <Route
                            path="search/:query"
                            element={<Search />}
                        ></Route>
                        <Route path="/*" element={<h1>Error Page</h1>}></Route>
                    </Routes>
                </Router>
            </Context>
        </div>
    );
}

export default App;
