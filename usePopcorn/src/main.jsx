import { render } from "preact";
import StarRating from "./components/StarRating";
/* import { App } from './app.jsx'
import './index.css' */

render(
  <>
    <StarRating maxRates={5} />
    <StarRating maxRates={10} />
    <StarRating />
  </>,
  document.getElementById("app")
);
