import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        console.log("entering");
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        console.log("leaving");
        setDraggedTo(false);
    }

    function onClick(event){
        event.preventDefault();
        setEditActive(true);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let index = event.target.id.substring("list-".length);
            let text = event.target.value;
            store.addUpdateItemTransaction(index-1, text);
            toggleEdit();
        }
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        console.log("handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")");

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    let { index } = props;

    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    
    
<Box sx={{ p: 1 }}>
    <IconButton onClick={(event) => {
            handleToggleEdit(event)
        }} aria-label='edit'>
        <EditIcon style={{fontSize:'48pt'}}  />
    </IconButton>
</Box>
    <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
</ListItem>

    if (editActive) {
        listItem =
            <TextField
                margin="normal"
                required
                fullWidth
                id={'item-' + (index+1)}
                name="name"
                className={itemClass}
                key = {props.key}
                onKeyPress={handleKeyPress}
                onChange={handleKeyPress}
                defaultValue={itemClass}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    return (
            listItem
    )
}

export default Top5Item;