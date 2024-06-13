import {useCallback, useEffect, useState} from "react";
import {motion} from "framer-motion";


const CoinIcon = ({increment, currentSpark, guru, sendMessage}: {
  increment: number,
  currentSpark: number,
  guru: boolean,
  sendMessage: any
}) => {

  const [texts, setTexts] = useState<{ position: { x: number; y: number }; opacity: number; value: string }[]>([]);

  const handleCoinClick = useCallback(() => {
    sendMessage(JSON.stringify({topic: "tap", request: ""}));
  }, [sendMessage]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTexts(prevItems => {
        return prevItems.map(item => ({
          ...item,
          position: {
            ...item.position,
            y: item.position.y - 11
          },
          opacity: item.opacity - 0.04 // Decrease opacity over time
        })).filter(item => item.opacity > 0); // Remove items with opacity <= 0
      });
    }, 60); // Increase interval duration to 100 ms
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTexts(prevTexts => prevTexts.slice(1));
    }, 1000);
    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, [texts.length > 0]); // Only set a new timeout if there are texts to remove

  return (
      <div className="w-full flex justify-center items-center">
        <motion.div
            // whileHover={{ scale: 1 }}
            whileTap={{scale: 0.93}}
            className={`w-[66vw] h-[66vw] rounded-full relative`}
        >
          <div
              id="LinkArea"
              onTouchStart={(ev) => {
                ev.preventDefault();
                for (let i = 0; i < ev.targetTouches.length; i++) {
                  let total = Math.trunc(currentSpark / increment)
                  if (total > 0) {
                    handleCoinClick();
                    total -= 1;
                }else{
                    break
                }
              }
              }
          }
              onTouchEnd={(ev) => {
                ev.preventDefault();
                let total_point_available = Math.trunc(currentSpark / increment)
                for (let i = 0; ev.changedTouches.length > i; i += 1) {
                  if (total_point_available > 0) {
                    const {pageX, pageY} = ev.changedTouches[i];
                    const newText: { position: { x: number; y: number }; opacity: number; value: string } = {
                      value: `+${increment}`,
                      position: {x: pageX, y: pageY},
                      opacity: 1,

                    };

                    setTexts(old => [...old, newText]);
                    total_point_available = total_point_available - 1
                  } else {
                    break
                  }

                }
              }}
              className="absolute w-[66vw] h-[66vw] rounded-full bg-transparent z-20 top-0 right-0"
          >
            <img src="./coin.png" alt="coin" className="h-full aspect-square z-50 relative mt-4"/>
            {guru && <img src="./images/coin-guru.png" alt="coin" className="h-full aspect-square z-40 mt-3 absolute -top-0 right-0 scale-[1.5]"/>}
          </div>
        </motion.div>
        {texts.map((text, index) => (
            <div
                key={index}
                style={{
                  color: "#c72d70",
                  fontSize: "8vw",
                  fontWeight: "bold",
                  position: "absolute",
                  top: text.position.y - 30,
                  left: text.position.x,
                  padding: "5px",
                  zIndex: 9999,
                  pointerEvents: "none",
                  transition: "opacity 0.5s ease", // Add a smooth fading transition
                  opacity: text.opacity,
                }}
            >
              {text.value}
            </div>
        ))}
      </div>
  );
};

export default CoinIcon;
