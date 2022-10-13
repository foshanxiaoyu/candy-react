import { useEffect, useState } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "red", "purple", "yellow"];

const App = () => {
  //当前数据状态初始化
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  //检查色块的连续情况
  // 纵向
  const checkForColumnOfThree =()=>{//连续三块同色情况
    for(let i =0;i<47;i++){ // 纵向比对，最后一个元素索位是47（0...47）
        const columnOfThree = [i,i+width,i+ width*2] // 例如：[0,8,16]
        const decidedColor = currentColorArrangement[i]

        if ( columnOfThree.every(
            square=>currentColorArrangement[square]===decidedColor // 判断三个位置的值都是一样，则做以下操作
            )){
                columnOfThree.forEach(element=>currentColorArrangement[element]='')
            }
    }
  }
  const checkForColumnOfFour =()=>{//连续四块同色情况
    for(let i =0;i<39;i++){ // 纵向比对，最后一个元素索位是39(0...39）
        const columnOfForu = [i,i+width,i+ width*2,i+width*3] // 例如：[0,8,16,24]
        const decidedColor = currentColorArrangement[i]

        if ( columnOfForu.every(
            square=>currentColorArrangement[square]===decidedColor // 判断纵向四个位置的值都一样，则做以下操作
            )){
                columnOfForu.forEach(element=>currentColorArrangement[element]='')
            }
    }

  }
  // 横向
  const checkForRowOfThree =()=>{//连续三块同色情况
    for(let i =0;i<64;i++){ // 横向比对，最后一个元素索位是62（0...62）
        const rowOfThree = [i, i+1, i+2] // 例如：[0,1,2] 注意这时候需要排除的位置
        const decidedColor = currentColorArrangement[i]
        const noValue = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64] // width*n+6,width*n+7   0<=n<=width-1 数组中这两个位置排除，不能连三
        if(noValue.includes(i)) continue

        if ( rowOfThree.every(
            square=>currentColorArrangement[square]===decidedColor // 判断三个位置的值都是一样，则做以下操作
            )){
                rowOfThree.forEach(element=>currentColorArrangement[element]='')
            }
    }
  }
  const checkForRowOfFour =()=>{//连续四块同色情况
    for(let i =0;i<64;i++){ // 横向比对，最后一个元素索位是61（0...61）
        const rowOfFour = [i, i+1, i+2, i+3] // 例如：[0,1,2,3] 注意这时候需要排除的位置
        const decidedColor = currentColorArrangement[i]
        const noValue = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64] // width*n+6,width*n+7   0<=n<=width-1 数组中这两个位置排除，不能连三
        if(noValue.includes(i)) continue

        if ( rowOfFour.every(
            square=>currentColorArrangement[square]===decidedColor // 判断三个位置的值都是一样，则做以下操作
            )){
                rowOfFour.forEach(element=>currentColorArrangement[element]='')
            }
    }
  }
  

  // 向下填充空白色块
  const moveIntoSquareBelow = ()=>{
    for(let i=0;i<64-width;i++){
        const firstRow = [0,1,2,3,4,5,6,7]
        const ifFirstRow = firstRow.includes(i)

        if (ifFirstRow && currentColorArrangement[i]===''){
            let randomNumber = Math.floor(Math.random()*candyColors.length)
            currentColorArrangement[i]=candyColors[ randomNumber]
        }

        if((currentColorArrangement[i+width])===''){
            currentColorArrangement[i+width] = currentColorArrangement[i]
            currentColorArrangement[i]=''
        }
    }
  }

  
  // 建基板，随机色数组
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

  useEffect(()=>{
    const timerCheck = setInterval(()=>{ // 设置每1000检查一次
        checkForColumnOfFour() // 注意这里 检查纵向四个连续的要在检查三个之前不然会被连三抢改值
        checkForColumnOfThree()
        checkForRowOfFour()
        checkForRowOfThree()
        moveIntoSquareBelow()
        setCurrentColorArrangement([...currentColorArrangement])
    },1000);
    return ()=>clearInterval(timerCheck)

//   },[checkForColumnOfFour,checkForColumnOfThree,checkForRowOfFour,checkForRowOfThree,moveIntoSquareBelow,currentColorArrangement])
  },[moveIntoSquareBelow,currentColorArrangement])
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
