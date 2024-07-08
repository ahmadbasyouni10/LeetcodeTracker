import { Box, Tooltip, useToast, CardBody, CardHeader, Flex, Heading, Text, Card, IconButton } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import EditModal from './EditModal'
import StatusIndicator from './StatusIndicator'
import { useEffect, useState } from 'react'



const ProblemCard = ({problem, setProblems}) => {
    const toast = useToast()
    const handleDeleteProblem = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/problems/' + problem.id, {
            method: 'DELETE'
        })

        const data = await res.json()
        if(!res.ok) {
            throw new Error(data.error)
        }
        setProblems((prevProblems) => prevProblems.filter((p) => p.id !== problem.id))
        toast({
            title: "Problem gone :(",
            description: "Your problem has been deleted successfully",
            status: "success",
            duration: 2000,
            position: "top-center",
            isClosable: true
        })}
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

    
    }

    const [status, setStatus] = useState('unsolved')


    useEffect(() => {
        setStatus(problem.status || 'unsolved')
        }, [problem.status])

    return (
        <Card>

    <CardHeader>
        <Flex gap={4}>
            <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                <Tooltip label={status.charAt(0).toUpperCase() + status.slice(1)} hasArrow>
                <div>
                    <StatusIndicator status={status} />
                </div>
                </Tooltip>
            

<Box>
    <Heading size="sm">{problem.name}</Heading>
    <Text>{problem.difficulty}</Text>
</Box>
            
        </Flex>
        <Flex>
           <EditModal problem={problem} setProblems={setProblems} />
            <IconButton
                variant={"ghost"}
                colorScheme={"red"}
                size={"sm"}
                aria-label='Delete Problem'
                icon={<BiTrash size={20} />}
                onClick={handleDeleteProblem}
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