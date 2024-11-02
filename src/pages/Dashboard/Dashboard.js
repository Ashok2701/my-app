import React from 'react'
import { Button } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider';
const Dashboard = () => {

  const {  currentColor } = useStateContext();

  return (
    <div>
      Dashboard

      <div>
      <Button  color="white"
                  bgColor={currentColor}
                  text="Download"
                  borderRadius="10px" />
      
      </div>
    </div>
  )
}

export default Dashboard
