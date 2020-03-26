import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const EditCar = (props) => {

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
        setCar({
            brand: props.car.brand,
            model: props.car.model,
            color: props.car.color,
            year: props.car.year,
            fuel: props.car.fuel,
            price: props.car.price
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.updateCar(car, props.link);
        handleClose();
    }

    return (
        <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth placeholder="Brand" name="brand" value={car.brand} onChange={handleChange}/><br/>
                    <TextField fullWidth placeholder="Model" name="model" value={car.model} onChange={handleChange}/><br/>
                    <TextField fullWidth placeholder="Color" name="color" value={car.color} onChange={handleChange}/><br/>
                    <TextField fullWidth placeholder="Year" name="year" value={car.year} onChange={handleChange}/><br/>
                    <TextField fullWidth placeholder="Price" name="price" value={car.price} onChange={handleChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditCar;
