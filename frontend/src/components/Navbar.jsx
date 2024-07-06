import { Box, Button, Container, Flex, useColorMode, Text, useColorModeValue} from "@chakra-ui/react"
import { IoMoon} from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import CreateProblemModal from "./CreateProblemModal"

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return <Container maxW={"900px"}>
        <Box
            px={4}
            my={4}
            borderRadius={5}
            bg={useColorModeValue("gray.200", "gray.700")}
        >
            <Flex h="20"
                alignItems="center"
                justifyContent="space-between"
            >
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={3}
                    display={{base:"none", sm:"flex"}}
                >
                    <img src="/leetcode.png" alt="logo" width={200} height={0} />
                
                </Flex>

                <Flex gap={3} alignItems={"center"}>
                <Text fontSize={'lg'} fontWeight={500} display={{ base: "none", md: "block"}}>
                    LCTracker 🔥
                </Text>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}

                </Button>
                <CreateProblemModal />
                </Flex>


            </Flex>
        </Box>

    </Container>
}

export default Navbar