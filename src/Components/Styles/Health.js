import React from 'react';

const Health = ({hp, color}) => {
	const styles = {
		hp: {
			display:'flex',
			justifyContent:'center',
			alignItems:'center',
			color,
			textAlign:'center',
			width:"30px",
			height: "30px",
			borderRadius:'50%',
			border:`2px solid ${color}`
		}
	}
	return (
		<div style={styles.hp}>{hp}</div>
		);
	}
export default Health;
