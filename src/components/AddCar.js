import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddCar = (props) => {

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        fuel: '',
        price: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth type="text" placeholder="Brand" name="brand" value={car.brand} onChange={handleChange}/><br/>
                    <TextField fullWidth ype="text" placeholder="Model" name="model" value={car.model} onChange={handleChange}/><br/>
                    <TextField fullWidth ype="text" placeholder="Color" name="color" value={car.color} onChange={handleChange}/><br/>
                    <TextField fullWidth ype="text" placeholder="Year" name="year" value={car.year} onChange={handleChange}/><br/>
                    <TextField fullWidth ype="text" placeholder="Price" name="price" value={car.price} onChange={handleChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCar;
