import React from 'react';

const FighterContainer = (props) => (
	<div style={styles.fightContainerStyle}>
		{props.children}
	</div>
);

const styles = {
	fightContainerStyle: {
		display:'flex',
		justifyContent:'space-around',
		flexWrap:'wrap',
		width:'400px',
		position:'relative'
	}
};

export default FighterContainer;
