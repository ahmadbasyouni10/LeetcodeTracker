import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
    useToast,
    Radio,
    RadioGroup,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import e from "cors";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";


 function EditModal({ problem, setProblems}) {
 	const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const [inputs, setInputs] = useState({
        name: problem.name,
        difficulty: problem.difficulty,
        url: problem.url,
        notes: problem.notes,
        status: problem.status
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs((prevInputs) => ({...prevInputs, [name]: value}))
    }

    const handleEditProblem = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/problems/' + problem.id, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json()
            if(!res.ok) {
                throw new Error(data.error)
            }
            setProblems((prevProblems) => prevProblems.map((p) => p.id === problem.id ? data : p))
            toast({ 
                title: "Problem updated",
                description: "Your problem has been updated successfully",
                status: "success",
                duration: 2000,
                position: "top-center",
                isClosable: true
        })
            onClose()
        }
        catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 2000,
                position: "top-center",
                isClosable: true
            })
        }
        finally {
            setIsLoading(false)
        }
    }

 	return (
 		<>
 			<IconButton
 				onClick={onOpen}
 				variant='ghost'
 				colorScheme='blue'
 				aria-label='See menu'
 				size={"sm"}
 				icon={<BiEditAlt size={20} />}
 			/>

<Modal isOpen={isOpen} onClose={onClose}>
 				<ModalOverlay />
                <form onSubmit={handleEditProblem}>
 				<ModalContent>
                <ModalHeader>My new LC problem 😍</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={4}>
                        <FormControl>
                            <FormLabel>Problem Name</FormLabel>
                            <Input placeholder="Two Sum" 
                            name="name"
                            value = {inputs.name}
                            onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Difficulty</FormLabel>
                            <Input placeholder="Easy"
                            name="difficulty"
                            value = {inputs.difficulty}
                            onChange={handleChange}
                             />
                        </FormControl>
                    </Flex>
                    
                    <Flex alignItems={"center"} mt={4} gap={4}>
                        <FormControl>
                            <FormLabel>Problem URL</FormLabel>
                            <Input placeholder="https://leetcode.com/problems/two-sum/" 
                            name="url"
                            value = {inputs.url}
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
                            value = {inputs.notes}
                            onChange={handleChange}
                            />
                        </FormControl>

                        <RadioGroup mt={4} value={inputs.status}>
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
                        Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </form>
 			</Modal>
 		</>
 	);
 }

 export default EditModal;