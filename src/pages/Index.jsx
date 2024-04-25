import { useState } from 'react';
import { Box, VStack, Heading, IconButton, useColorMode, useColorModeValue, Text, Input, Button, HStack, useToast } from '@chakra-ui/react';
import { FaSun, FaMoon, FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <VStack p={5}>
      <IconButton
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        isRound='true'
        size='lg'
        alignSelf='flex-end'
        onClick={toggleColorMode}
      />
      <Heading mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, pink.500, pink.300, blue.500)' bgClip='text'>
        Todo Application
      </Heading>
      <HStack>
        <Input
          variant='filled'
          placeholder='Add a task...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          bg={formBackground}
        />
        <Button onClick={addTask} colorScheme='pink' px='8'>Add Task</Button>
      </HStack>
      <VStack spacing={4} align='stretch'>
        {tasks.map((task) => (
          <HStack key={task.id}>
            <Text as={task.isCompleted ? 's' : ''} flexGrow={1} p={2} bg={formBackground}>
              {task.text}
            </Text>
            <IconButton icon={<FaCheckCircle />} isRound='true' onClick={() => toggleTask(task.id)} />
            <IconButton icon={<FaTrash />} isRound='true' onClick={() => deleteTask(task.id)} />
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;