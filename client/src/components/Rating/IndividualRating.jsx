import React from 'react'
import Rating from '@material-ui/lab/Rating'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';


const IndividualRating = ({rating}) => {

    return (
        <div>
            <Rating 
                name="read-only" 
                value={rating} 
                precision={0.1} 
                readOnly 
                icon={<SportsEsportsIcon fontSize="inherit"/>}
                style={{color:"#1d7bff"}}
            />
        </div>
    )
}

export default IndividualRating