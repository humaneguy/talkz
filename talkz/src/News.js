import axios from 'axios';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {ChakraProvider, chakra,Image,Flex,useColorModeValue, Link, Box, Text} from '@chakra-ui/react';
import { render } from 'react-dom';
import {Router, Link as ReachLink} from '@reach/router';
import Home from './Home';

const queryClient = new QueryClient();

function fetchMovies({ pageParam=1 }) {
    return axios(`https://gnews.io/api/v4/search?q=example&token=d8ca205b7d08cd02d0fc267a018105f7`).then(
      (result) => result.data,
    );
  }

  function Cards(props){
    return (
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        p={10}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          mx="auto"
          px={8}
          py={4}
          rounded="lg"
          shadow="lg"
          bg={useColorModeValue("white", "gray.800")}
          maxW="2xl"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {new Date(props.article.publishedAt).toLocaleDateString()}
            </chakra.span>
            <Link
              as={ReachLink}
              px={3}
              py={1}
              bg="gray.600"
              color="gray.100"
              fontSize="sm"
              fontWeight="700"
              rounded="md"
              _hover={{ bg: "gray.500" }}
              to="#"
              state={{ article: props.article }}
            >
              Design
            </Link>
          </Flex>
  
          <Box mt={2}>
            <Link
              isExternal
              fontSize="2xl"
              color={useColorModeValue("gray.700", "white")}
              fontWeight="700"
              _hover={{
                color: useColorModeValue("gray.600", "gray.200"),
                textDecor: "underline",
              }}
              href={props.article.url}
              state={{ article: props.article, fromFeed:true }}
            >
              {props.article.title}
            </Link> 
            <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
              {props.article.description}
            </chakra.p>
          </Box>
  
          <Flex justifyContent="space-between" alignItems="center" mt={4}>
            <Link
              isExternal
              color={useColorModeValue("brand.600", "brand.400")}
              _hover={{ textDecor: "underline" }}
              href={props.article.url}
            >
              Read more
            </Link>
  
            <Flex alignItems="center">
              <Link
                color={useColorModeValue("gray.700", "gray.200")}
                fontWeight="700"
                cursor="pointer"
              >
                {props.article.source.name}
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Flex>  
    );
  
    render( 
      <Router>
        <Home path="/show-news" />
      </Router>
      );
  }
function News() {
    const {isLoading, isError, data, error} = useQuery('movies', fetchMovies);
  
    if (error) return 'An error has occured: ' + error.message;
  
    return isLoading ? (
      <div>Fetching News...</div>
    ) : (
      <div>
        {data.articles.map((article) => (
          <div className="card">
            <div className="card-content">
              <Cards article={article} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  export default News;