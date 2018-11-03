import React from 'react';
import { MorphIcon }from 'react-svg-buttons';


const Arrow = ({color, type, text, attack, onMEnter, onMLeave,chosenFighter, textColor}) => {
	const styles = {
		iconContainer: {
			borderRadius:'60%',
			border:`1px solid ${color}`,
			display:'flex',
			justifyContent:'center',
			width:'176px',
			height:'176px',
			cursor: 'pointer'
		}
	}
	console.log(textColor);
	return (
		<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
			<h1 style={{fontFamily:'Permanent Marker', color:textColor}}>{text}</h1>
			<div style={styles.iconContainer}>
				<MorphIcon
					onMouseEnter={() => onMEnter()}
					onMouseLeave={() => onMLeave()}
					thickness={5}
					size={176}
					color={`${color}`}
					type={type}
					onClick={() => attack()} />
			</div>
		</div>
	);
}

export default Arrow;
