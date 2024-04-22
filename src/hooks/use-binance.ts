import { useEffect, useState } from 'react';
import { IbinanceBookTicker } from 'src/types/interfaces';


interface useBinanceProps{
  socket: WebSocket
}
const useBinance = ({socket}:useBinanceProps) => {
  const [coursesInfo, setCoursesInfo] = useState<IbinanceBookTicker>({ s: '', a: [['', '']], b: [['', '']]})
  const [isAskPriceGoingUp, setIsAskPriceGoingUp] = useState<boolean | null>(null)
  const [isBidPriceGoingUp, setIsBidPriceGoingUp] = useState<boolean | null>(null)

  let usedOnce = false;
  useEffect(() =>{
    if(!usedOnce){
      // eslint-disable-next-line
      usedOnce = true;
      let previousValue: IbinanceBookTicker = { s: '', a: [['', '']], b: [['', '']]};
      socket.onmessage = (event) => {
        const courses: IbinanceBookTicker = JSON.parse(event.data)

        setCoursesInfo(courses)
        setIsAskPriceGoingUp(
          parseFloat(previousValue.a[0][0]) !== parseFloat(courses.a[0][0]) 
          ? parseFloat(previousValue.a[0][0]) < parseFloat(courses.a[0][0])
          : null
        )
        setIsBidPriceGoingUp(
          parseFloat(previousValue.b[0][0]) !== parseFloat(courses.b[0][0])
          ? parseFloat(previousValue.b[0][0]) < parseFloat(courses.b[0][0])
          : null  
        )
        previousValue = courses
      }
    }
  }, [])

  return {
    coursesInfo,
    isAskPriceGoingUp,
    isBidPriceGoingUp
  }
}
export default useBinance;