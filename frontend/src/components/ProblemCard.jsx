import { Avatar, Box, CardBody, CardHeader, Flex, Heading, Text, Card, IconButton } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import EditModal from './EditModal'

const ProblemCard = ({problem}) => {
    return (
        <Card>

    <CardHeader>
        <Flex gap={4}>
            <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src="https::/avatar" />
<Box>
    <Heading size="sm">{problem.name}</Heading>
    <Text>{problem.difficulty}</Text>
</Box>
            
        </Flex>
        <Flex>
           <EditModal />
            <IconButton
                variant={"ghost"}
                colorScheme={"red"}
                size={"sm"}
                aria-label='Delete Problem'
                icon={<BiTrash size={20} />}
            />
        </Flex>
            </Flex>
        </CardHeader>

        <CardBody>
            <Text>{problem.notes}</Text>
        </CardBody>

        </Card>
    )
}

export default ProblemCard