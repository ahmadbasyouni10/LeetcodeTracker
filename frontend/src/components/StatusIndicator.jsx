import { Circle } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const StatusIndicator = ({ status }) => {
  const [color, setColor] = useState('gray');

  useEffect(() => {
    switch (status) {
      case 'Solved':
        setColor('green.500');
        break;
      case 'Unsolved':
        setColor('red.500');
        break;
      case 'In Progress':
        setColor('yellow.500');
        break;
      default:
        setColor('gray');
    }
  }, [status]);

  return (
    <Circle size="30px" bg={color} border="2px" borderColor="gray.200" transition="background-color 0.5s ease" />
  );
};

export default StatusIndicator;