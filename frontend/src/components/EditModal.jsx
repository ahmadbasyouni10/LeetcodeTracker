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
    Radio,
    RadioGroup,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";


 function EditModal({ problem }) {
 	const { isOpen, onOpen, onClose } = useDisclosure();

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
                        Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
 			</Modal>
 		</>
 	);
 }

 export default EditModal;