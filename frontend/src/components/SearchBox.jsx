import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  const buttonStyles = {
    margin: 0.5,
    padding: "8px 16px",
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: "8px",
    color: "#fff",
    backgroundColor: "#007bff",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Input
      sx={{ margin: 0.5 }}
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        startDecorator={<FaSearch />} 
      ></Input>
      <Button type='submit' sx={buttonStyles}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;