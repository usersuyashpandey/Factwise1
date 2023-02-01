import dataList from './assets/celebrities.json';
import { useState,useEffect } from 'react';
import { Box,Avatar,Accordion,AccordionSummary,AccordionDetails,Typography,Button,Dialog, DialogActions,IconButton, DialogTitle} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, alpha } from '@mui/material/styles';


const List = () => {
    const [data, setData] = useState(dataList);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // Fetch data from local storage
        const data = JSON.parse(localStorage.getItem('celebList'));
        setData(data);
    }, []);
    
   
  
    useEffect(() => {
      localStorage.setItem('celebList', JSON.stringify(data));
    }, [data]);
  
    const handleDelete = (itemId) => {
        const updatedData = data.filter(item => item.id !== itemId)
        setData(updatedData)
        handleClose();
    }
  
    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm)
    }
  
    const filteredData = data.filter(item => {
        if (item.first.toLowerCase().includes(searchTerm.toLowerCase()) || item.last.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }
        return false;
    });
    
  
    return (
      <Box>
        <input type="text" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} placeholder="Search..."/>
        <ul>
           {filteredData.map(item => (
            <>
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
                <IconButton onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
              </AccordionDetails>
                 </Accordion>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        Are you sure you want to delete this item?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => handleDelete(item.id)} color="primary">
                            Delete
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
              ))}
            </ul>
      </Box>
     );
};      
export default List