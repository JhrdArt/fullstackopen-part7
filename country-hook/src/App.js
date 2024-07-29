import React, { useState, useEffect } from "react";
import { useField, useCountry } from "./hooks/index";
import { Country } from "./components/Country";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  console.log("name", name)
  console.log("nameInput",nameInput)
  console.log("country", country)

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
