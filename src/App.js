import { useEffect, useState } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "red", "purple", "yellow"];

const App = () => {
  //当前数据状态初始
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  // 建板
  const createBoard = () => {
    const randdomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)]; // 随机取值
      randdomColorArrangement.push(randomColor);
    }
    // console.log(randdomColorArrangement);
    setCurrentColorArrangement(randdomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);
  console.log(currentColorArrangement);

  return <div className="app">
    <div className="game">
        {currentColorArrangement.map((candyColor,index)=>(
            <img 
                key={index}
                style={{background:candyColor}}
                alt={candyColor}
            />)
          )
        }
    </div>
  </div>;
};

export default App;
