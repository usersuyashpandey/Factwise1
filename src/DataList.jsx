import React, { useState, useEffect } from 'react';
import { Accordion, Box, Avatar, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, TextField, IconButton, InputLabel, ListItem, ListItemText, Button } from '@mui/material';
import { Delete, Edit, ExpandMore, Save, CheckCircle, Cancel, ConstructionOutlined } from '@mui/icons-material';
import celebList from './assets/celebrities.json'
import moment from 'moment/moment';

const DataList = () => {
    const [data, setData] = useState(celebList)
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    console.log(editData.id,'isEditing')
    const [editId, setEditId] = useState(null);

    const handleEdit = (index) => {
        setIsEditing(true);
        setEditData(data[index-1]);
      };

      const handleSave = (index) => {
        const updatedData = [...data];
        updatedData[index-1] = editData;
        setData(updatedData);
        setIsEditing(false);
      };

    const handleCancelSave=()=>{
        setIsEditing(false);
    }

    const handleChange = (e,id) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        setData(data);
    }, []);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (itemId) => {
        const updatedData = data.filter(item => item.id !== itemId);
        setData(updatedData);
        handleClose();
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleExpanded = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const filteredData = data.filter(item => {
        return item.first.toLowerCase().includes(search?.toLowerCase()) || item?.last?.toLowerCase().includes(search?.toLowerCase());
    });

    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return 'N/A';
        const birthdate = moment(dateOfBirth, "YYYY-MM-DD").toDate();
        if (isNaN(birthdate.getTime())) return 'Invalid DOB';
        const ageDifMs = Date.now() - birthdate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    };

    return (
        <div>
            <TextField label="Search" value={search} onChange={handleSearch} sx={{ marginBottom: '1rem' }} />
            {filteredData?.map((item) => (
                <Accordion key={item.id} expanded={expanded === `panel${item.id}`} onChange={handleExpanded(`panel${item.id}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Box sx={{ flexGrow: 0 }}>
                            <Avatar alt="Remy Sharp" src={item.picture} />
                        </Box>
                        {isEditing ? (
                            <>
                                <TextField label="First Name" name="first" value={editData.id?editData.first:''} onChange={()=>handleChange(item.id)} sx={{ marginBottom: '1rem' }} />
                                <TextField label="Last Name" name="last" value={editData.last} onChange={handleChange} sx={{ marginBottom: '1rem' }} />
                            </>
                        ) :
                            <Typography sx={{ margin: 1.5 }}>{item.first}{' '}{item.last}</Typography>
                        }

                    </AccordionSummary>
                    <AccordionDetails >
                        <Box
                            sx={{
                                display: 'grid',
                                gap: 1,
                                gridTemplateColumns: 'repeat(3, 1fr)',
                            }}
                        >
                            {isEditing && isEditing?.id ? (
                                <Box ><TextField label="Age" name="dob" value={editData.dob} onChange={handleChange} sx={{ marginBottom: '1rem' }} /></Box>
                            ) :
                                <Box >
                                    <Typography sx={{ margin: 1.5 }}>
                                        Age
                                    </Typography>
                                    <Typography sx={{ margin: 1.5, textTransform: 'capitalize' }} >
                                        {
                                            calculateAge(item?.dob)
                                        }
                                    </Typography>
                                </Box>
                            }
                            {isEditing ? (
                                <FormControl>
                                    <InputLabel id="gender">Gender</InputLabel>
                                    <Select 
                                        value={editData.gender} 
                                        onChange={handleChange} 
                                        name="gender" 
                                        label='Gender'
                                        sx={{ marginBottom: '1rem',width:'25ch' }}>
                                        <MenuItem value='male'>Male</MenuItem>
                                        <MenuItem value='female'>Female</MenuItem>
                                        <MenuItem value='other'>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            ) :

                                <Box >
                                    <Typography sx={{ margin: 1.5 }}>
                                        Gender
                                    </Typography>
                                    <Typography sx={{ margin: 1.5, textTransform: 'capitalize' }}>
                                        {item.gender}
                                    </Typography>
                                </Box>
                            }
                            {isEditing ? (
                                <FormControl>
                                <InputLabel id="country">Country</InputLabel>
                                    <Select 
                                        value={editData.country} 
                                        onChange={handleChange} 
                                        name="country" 
                                        sx={{ marginBottom: '1rem', width:'25ch' }}
                                        label='Country'
                                    >
                                        <MenuItem value='india'>India</MenuItem>
                                        <MenuItem value='usa'>USA</MenuItem>
                                    </Select>
                                </FormControl>
                            ) :
                                <Box >
                                    <Typography sx={{ margin: 1.5 }}>
                                        Country
                                    </Typography>
                                    <Typography sx={{ margin: 1.5, textTransform: 'capitalize' }}>
                                        {item.country}
                                    </Typography>
                                </Box>
                            }
                        </Box>
                        {isEditing ? (
                            <Box>
                                <TextField 
                                    label="Description" 
                                    name="description" 
                                    value={editData.description} 
                                    onChange={handleChange} 
                                    sx={{ marginBottom: '1rem',width:'100%' }} 
                                    multiline
                                    rows={4}
                                />
                            </Box>
                        ) :
                            <Typography>
                                {item.description}
                            </Typography>
                        }
                        {!isEditing &&
                            <IconButton onClick={() => handleDelete(item.id)} sx={{ float: 'right' }}>
                            <Delete />
                        </IconButton>
                        }
                        {isEditing ? (
                            <>
                            <IconButton onClick={() => handleSave(item.id)} sx={{ float: 'right' }}>
                                <CheckCircle />
                            </IconButton>
                            <IconButton onClick={handleCancelSave} sx={{ float: 'right' }}>
                                <Cancel />
                            </IconButton>
                            </>
                        ) :
                            <IconButton onClick={() => handleEdit(item.id)} sx={{ float: 'right' }}>
                                <Edit />
                            </IconButton>
                        }
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default DataList;
