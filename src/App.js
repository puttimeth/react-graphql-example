import { useState } from "react";
import User from "./Pages/User";
import Pet from "./Pages/Pet";
import Post from "./Pages/Post";

const App = () => {
  const tabsName = ["user", "pet", "post"];

  const [currentTab, setCurrentTab] = useState(tabsName[0]);

  return (
    <div>
      <select
        onChange={(e) => {
          setCurrentTab(tabsName[e.target.selectedIndex]);
        }}
      >
        {tabsName.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
      {currentTab === "user" && <User />}
      {currentTab === "pet" && <Pet />}
      {currentTab === "post" && <Post />}
    </div>
  );
};

export default App;
