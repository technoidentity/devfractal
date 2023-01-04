import {
  Flex,
  Center,
  useColorModeValue,
  Avatar,
  Heading,
  Stack,
  Badge,
  Button,
  Text,
  Box,
} from '@chakra-ui/react'
import { Course, User } from '@prisma/client'
import { Link, Outlet } from '@remix-run/react'
import FeatureVideo from './FeatureVideo'

interface DashboardProps {
  courses: Course[]
}

export const Dashboard = ({ courses }: DashboardProps) => {
  return (
    <>
      <FeatureVideo />
      <Flex gap="5" wrap="wrap" justifyContent={'center'}>
        {courses.map(course => (
          <Center py={6} key={course.id}>
            <Box
              maxW={'300px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}
            >
              <Avatar
                size={'xl'}
                src={
                  'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                }
                // alt={'Avatar Alt'}
                mb={4}
                pos={'relative'}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: 'green.300',
                  border: '2px solid white',
                  rounded: 'full',
                  pos: 'absolute',
                  bottom: 0,
                  right: 3,
                }}
              />
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {course.title}
              </Heading>
              <Text
                textAlign={'center'}
                color={useColorModeValue('gray.700', 'gray.400')}
                px={3}
              >
                {course.description}
              </Text>

              <Stack
                align={'center'}
                justify={'center'}
                direction={'row'}
                mt={6}
              >
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue('gray.50', 'gray.800')}
                  fontWeight={'400'}
                >
                  #react
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue('gray.50', 'gray.800')}
                  fontWeight={'400'}
                >
                  #typescript
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue('gray.50', 'gray.800')}
                  fontWeight={'400'}
                >
                  #javascript
                </Badge>
              </Stack>

              <Link to={`/course/${course.id}/video`}>
                {' '}
                <Button
                  flex={1}
                  mt="10px"
                  fontSize={'sm'}
                  bg={'blue.400'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'blue.500',
                  }}
                  _focus={{
                    bg: 'blue.500',
                  }}
                >
                  View
                </Button>
              </Link>
            </Box>
          </Center>
        ))}
      </Flex>
      <div>
        <Outlet />
      </div>
    </>
  )
}
