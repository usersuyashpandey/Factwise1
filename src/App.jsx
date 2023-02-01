import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import dataList from './assets/celebrities.json'
import { Box,Avatar,Accordion,AccordionSummary,AccordionDetails,Typography,InputBase} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, alpha } from '@mui/material/styles';

function App() {

  const celeblistData= structuredClone(dataList)
  localStorage.setItem('celebList',JSON.stringify(celeblistData))
  const [data, setData] = useState(celeblistData)
  const [name, setName] = useState('');
  const [foundUsers, setFoundUsers] = useState(JSON.parse(localStorage.getItem('celebList')))

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword ) {
      const results = foundUsers?.filter((user) => {
        return user?.first?.toLowerCase().startsWith(keyword.toLowerCase())
      });
      setFoundUsers(results);
      console.log(foundUsers,'foundUsers')
    } else {
      setFoundUsers(data)
      console.log(foundUsers,'foundUsers111111111')
    }

    setName(keyword);
    console.log(keyword,'name')
  };

  const handleDelete=(id)=>{
    let data = JSON.parse(localStorage.getItem('celebList'))
    data?.splice(id,1); 
    setFoundUsers(localStorage.setItem('celebList', JSON.stringify(data)))
    console.log(data)
    window.location.reload
  }


  return (
    <Box >
      <div>
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />
       {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
      </Search> */}
      {foundUsers && foundUsers?.length > 0 ? (
          foundUsers?.map((item) => (
            <Accordion key={item.id} sx={{maxWidth:'100%'}}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                  <Box sx={{ flexGrow: 0 }}>
                  <Avatar alt="Remy Sharp" src={item.picture}/>
                  </Box>
                <Typography sx={{margin:1.5}}>{item.first}{' '}{item.last}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(3, 1fr)',
                  }}
                >
                  <Box>
                      <Typography sx={{margin:1.5}}>
                        Age
                      </Typography>
                      <Typography sx={{margin:1.5, textTransform:'capitalize'}}>
                        {
                          item?.dob
                        }
                      </Typography>
                  </Box>
                  <Box>
                      <Typography sx={{margin:1.5}}>
                        Gender
                      </Typography>
                      <Typography sx={{margin:1.5, textTransform:'capitalize'}}>
                      {item.gender}
                      </Typography>
                  </Box>
                  <Box>
                      <Typography sx={{margin:1.5}}>
                        Country
                      </Typography>
                      <Typography sx={{margin:1.5, textTransform:'capitalize'}}>
                      {item.country}
                      </Typography>
                  </Box>
                </Box>
                <Typography>
                  {item.description}
                </Typography>
                <DeleteIcon onClick={()=>handleDelete(item.id)}/>
              </AccordionDetails>
            </Accordion>
          ))
          ) : (
            <h1>No results found!</h1>
          )}

    </div>
    </Box>
  )
}

export default App
