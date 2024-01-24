import { render } from "preact";
import StarRating from "./components/StarRating";
/* import { App } from './app.jsx'
import './index.css' */

render(
  <>
    <StarRating
      maxRating={5}
      size={25}
      color="red"
      messages={["good", "bad", "honest", "extreme", "fine"]}
    />
    <StarRating maxRating={10} />
  </>,
  document.getElementById("app")
);
