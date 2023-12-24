import ScratchCard from 'react-scratchcard-v2';
import IMG from '../assets/scratch_card.jpg'


const Scratchcard=({children})=>{
  return (
    <ScratchCard
        width={250}
        height={200}
        image={IMG}
        finishPercent={80}
      >
        {children}
      </ScratchCard>
  )
}

export default Scratchcard