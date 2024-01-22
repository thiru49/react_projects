export function App() {
  return (
    <>
      <NavBar />
    </>
  );
}

const NavBar = () => {
  return (
    <div className="flex flex-row justify-between items-center px-12 py-4 bg-indigo-600 rounded-xl shadow-xl text-md">
      <div className="flex gap-2">
        <span>🍿</span>
        <h1 className="text-2xl font-bold">MoviePicker</h1>
      </div>
      <input
        className="px-4 py-2 rounded-md hover:-translate-y-1 transition-all text-indigo-100 font-semibold border-none max-w-xl sm:min-w-[30rem] shadow-md focus:outline-none  bg-indigo-500"
        placeholder="Search Movies "
      />
      <p>
        Found <strong>X</strong> results
      </p>
    </div>
  );
};
