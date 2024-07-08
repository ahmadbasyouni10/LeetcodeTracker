import { Grid, Spinner, Flex, Text } from "@chakra-ui/react"
import ProblemCard from "./ProblemCard"
import { useState, useEffect } from "react"

const ProblemGrid = ({problems, setProblems}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getProblems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/problems')
                const data = await response.json()

                if(!response.ok) {
                    throw new Error(data.error)
                }
                setProblems(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getProblems(), []})

    return (
        <>
        {isLoading && (
            <Flex justifyContent={"center"} mb={"4"}>
            <Spinner size={"xl"} />
            </Flex>
        )}
        {!isLoading && problems.length === 0 && (
            <Flex justifyContent={"center"}>
                <Text fontSize={"xl"}>
                <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
                    Poor you! 🥺
                </Text>
                No problems solved.
                </Text>
            </Flex>
        )}
        <Grid 
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gap={4}
        >
            {problems.map((problem)=> (
                <ProblemCard key={problem.id} problem={problem} setProblems={setProblems} />

            ))}
        </Grid>
        </>
        
    )
}

export default ProblemGrid