import { Button, Modal, Radio, ModalFooter, ModalBody, Textarea, Flex, FormLabel, Input, ModalHeader, ModalCloseButton, FormControl, ModalContent, ModalOverlay, useDisclosure, useToast, RadioGroup} from "@chakra-ui/react"
import { BiAddToQueue } from "react-icons/bi"
import { useState } from "react"
import { BASEURL } from "../App"

const CreateProblemModal = ({setProblems}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: "",
        difficulty: "",
        url: "",
        notes: "",
        status: ""
    })
    const toast = useToast()

    const handleChange = (e) => {   
        const {name, value} = e.target
        setInputs((prevInputs) => ({...prevInputs, [name]: value}))
    }

    const handleCreateProblem = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(BASEURL + '/problems', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)

            })
            const data = await res.json()
            if(!res.ok) {
                throw new Error(data.error)
            }
            toast({
                title: "W in the chat 🎉",
                description: "Your problem has been added successfully",
                status: "success",
                duration: 2000,
                position: "top-center"
            })
            onClose();
            setProblems((prevProblems) => [...prevProblems, data])
            setInputs({
                name: "",
                difficulty: "",
                url: "",
                notes: "",
                status: ""
            })
        }
        catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 2000,
                position: "top-center"
            })
        }
        finally {
            setIsLoading(false)

    }
}

    return (
    <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20} />
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
 				<ModalOverlay />
                <form onSubmit={handleCreateProblem}>
 				<ModalContent>
                <ModalHeader>My new LC problem 😍</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={4}>
                        <FormControl>
                            <FormLabel>Problem Name</FormLabel>
                            <Input placeholder="Two Sum" 
                            name="name"
                            onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Difficulty</FormLabel>
                            <Input placeholder="Easy"
                            name="difficulty"
                            onChange={handleChange}
                             />
                        </FormControl>
                    </Flex>
                    
                    <Flex alignItems={"center"} mt={4} gap={4}>
                        <FormControl>
                            <FormLabel>Problem URL</FormLabel>
                            <Input placeholder="https://leetcode.com/problems/two-sum/" 
                            name="url"
                            onChange={handleChange}
                            />
                        </FormControl>
                    </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Notes</FormLabel>
                            <Textarea 
                            resize={"none"}
                            overflowY={"hidden"}
                            placeholder="Use a hashmap"
                            name="notes" 
                            onChange={handleChange}
                            />
                        </FormControl>

                        <RadioGroup mt={4}>
                            <Flex gap={4}>
                                <Radio value="Solved"
                                onChange={(e) => setInputs({...inputs, status: e.target.value})}
                                >Solved ✔️</Radio>
                                <Radio value="In Progress"
                                onChange={(e) => setInputs({...inputs, status: e.target.value})}
                                >In Progress 🔨</Radio>
                                <Radio value="Unsolved"
                                onChange={(e) => setInputs({...inputs, status: e.target.value})}
                                >Unsolved ❌</Radio>
                            </Flex>
                        </RadioGroup>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit"
                        isLoading={isLoading}
                    >
                        Add
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </form>
 			</Modal>
    </>
    )
}

export default CreateProblemModal