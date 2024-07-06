import { Button, Modal, Radio, ModalFooter, ModalBody, Textarea, Flex, FormLabel, Input, ModalHeader, ModalCloseButton, FormControl, ModalContent, ModalOverlay, useDisclosure, RadioGroup} from "@chakra-ui/react"
import { BiAddToQueue } from "react-icons/bi"

const CreateProblemModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
    <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20} />
        </Button>

        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>My new LC problem 😍</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={4}>
                        <FormControl>
                            <FormLabel>Problem Name</FormLabel>
                            <Input placeholder="Two Sum" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Difficulty</FormLabel>
                            <Input placeholder="Easy" />
                        </FormControl>
                    </Flex>
                    
                    <Flex alignItems={"center"} mt={4} gap={4}>
                        <FormControl>
                            <FormLabel>Problem URL</FormLabel>
                            <Input placeholder="Easy" />
                        </FormControl>
                    </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Notes</FormLabel>
                            <Textarea 
                            resize={"none"}
                            overflowY={"hidden"}
                            placeholder="Use a hashmap" />
                        </FormControl>

                        <RadioGroup mt={4}>
                            <Flex gap={4}>
                                <Radio value="Yes">Solved ✔️</Radio>
                                <Radio value="No">Unsolved ❌</Radio>
                            </Flex>
                        </RadioGroup>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Add
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    </>
    )
}

export default CreateProblemModal