import React from 'react';

const Avatar = ({img, opacity, width, height}) => {
	const styles = {
		avatar: {
	    backgroundImage: `url('${img}')`,
	    width,
	    height,
			opacity,
	    backgroundSize: 'cover',
	    backgroundPosition: 'top center',
	    borderRadius: '50%'
		}
	}
	return (
		<div style={styles.avatar}></div>
	)
};

export default Avatar;
