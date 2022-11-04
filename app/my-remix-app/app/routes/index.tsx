import { Box, Center, Container, Heading } from "@chakra-ui/react";
import { Link } from "@remix-run/react";



export default function IndexRoute() {
  return (
    <Container>
      <Box>
        <Heading>
          Learn <span>Web development!</span>
        </Heading>
        <Center>
       
           Learn courses    <Link to="courses" style={{color:"blue",textDecoration:"underline"}}>here</Link>
           
        </Center>
      </Box>
    </Container>
  );
}
