import { useEffect, useState } from 'react'
import {Container, Stack, Text} from '@chakra-ui/react'
import Navbar from './components/Navbar'
import ProblemGrid from './components/ProblemGrid'

export const BASEURL = 'http://localhost:5000/api'
function App() {

  const [problems, setProblems] = useState([])

  return (
    <Stack minH={"100vh"}>
      <Navbar setProblems={setProblems} />

      <Container maxW={"1200px"} my={4}>
        <Text
        fontSize={{ base: "3xl", md: "50"}}
        fontWeight={'bold'}
        letterSpacing={"2px"}
        textTransform={"uppercase"}
        textAlign={"center"}
        mb={8}>

          <Text as={"span"}
            bgGradient={"linear(to-r, cyan.400,blue.500)"} bgClip={"text"}>
          My Problems</Text>
          🚀
        </Text>

        <ProblemGrid problems={problems} setProblems={setProblems}/>

      </Container>


    </Stack>
  )
}

export default App
