import React from 'react';

const Footer = (props) => (
		<div style={styles.footerContainer}>
			<p style={{margin:0,padding:0}}>{props.text}</p>
			<div style={{display:'flex', width: '35%', justifyContent: 'space-around', alignItems:'flex-start'}}>
				{props.children}
			</div>
		</div>
);

const styles = {
	footerContainer: {
		background:'#3a3839',
		display:'flex',
		flexDirection: 'column',
		alignItems:'center',
		color:'white',
	}
}

export default Footer;
