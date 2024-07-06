import { Grid } from "@chakra-ui/react"
import ProblemCard from "./ProblemCard"
import { PROBLEMS } from "../dummy/dummy.js"

const ProblemGrid = () => {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gap={4}
        >
            {PROBLEMS.map((problem)=> (
                <ProblemCard key={problem.id} problem={problem} />

            ))}
        </Grid>
        
    )
}

export default ProblemGrid