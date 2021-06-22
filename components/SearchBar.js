import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = () => {
  return (
    <Container>
      <SearchIcon />
      <SearchInput placeholder="Search in chats.." />
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const SearchInput = styled.input`
  border: none;
  flex: 1;
  outline-width: 0;
`;
