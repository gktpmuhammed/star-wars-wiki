import { gql, useQuery } from '@apollo/client';

export interface CharacterData {
  person: {
    id: string;
    name: string;
    height: string;
    mass: string;
    homeworld: {
      name: string;
    };
    species: {
      name: string;
    };
    gender: string;
    eyeColor: string;
    filmConnection: {
      films: {
        title: string;
      }[];
    };
  };
}

export interface AllPeopleResponse {
  allPeople: {
    pageInfo: {
      endCursor: any; hasNextPage: boolean
    };
    people: CharacterData[];
  };
  allFilms: { films: { title: string }[] };
}

export const GET_ALL_CHARACTER_DETAILS = gql`
  query GetAllCharacterDetails($cursor: String) {
    allPeople(first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      people {
        id
        name
        homeworld {
          name
        }
        species {
          name
        }
        gender
        height
        mass
        eyeColor
        filmConnection {
            films {
              title
            }
          }
      }
    }
    allFilms {
        films {
          title
        }
      }

  }
`;


export const GET_CHARACTER_DETAILS = gql`
  query Query($id: ID!) {
    person(id: $id) {
        id
      name
      height
      mass
      homeworld {
        name
      }
      species {
        name
      }
      gender
      eyeColor
      filmConnection {
        films {
          id
          title
        }
      }
    }
  }
`;

export const useCharacterData = (id: string) => {
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id }
  });

  return { loading, error, data };
};

export const useAllPeople = () => {
  const { loading, error, data, fetchMore } = useQuery<AllPeopleResponse, { cursor?: string }>(
    GET_ALL_CHARACTER_DETAILS
  );

  return { loading, error, data, fetchMore };
};


