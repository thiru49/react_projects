import CreateUser from "../features/user/CreateUser";
function Home() {
  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold">
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
        <span className="text-yellow-500">
          Straight out the ovent ,straight to you
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
